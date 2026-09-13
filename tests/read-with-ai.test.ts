import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { buildPacket } from '../docs/.vitepress/lib/read-with-ai/build-packet.ts'
import { AI_MODES, resolveAIOptions } from '../docs/.vitepress/lib/read-with-ai/types.ts'
import type { AIOptions, ReadingChapter } from '../docs/.vitepress/lib/read-with-ai/types.ts'
import { PROVIDERS } from '../docs/.vitepress/lib/read-with-ai/providers.ts'
import { openWithAI } from '../docs/.vitepress/lib/read-with-ai/open-with-ai.ts'
import { createChapterAssets } from '../scripts/read-with-ai.mjs'
import { VOLS } from '../scripts/assemble.mjs'

const sample: ReadingChapter = {
  book: 'AI 时代的编程指南 · Test', bookId: '01', chapter: 1,
  slug: 'guide/01/ch01', title: 'A real project',
  canonicalUrl: 'https://books.stickmancharles.com/guide/01/ch01',
  content: '# A real project\n\n中文 preserved.\n\n```ts\nconst message = "你好"\n```\n',
}

test('packet preserves complete bilingual source and project-first protocol', () => {
  const packet = buildPacket(sample)
  for (const text of [sample.content, sample.title, sample.canonicalUrl, sample.book,
    'Need → Tool → Concept', 'Understand → Find → Do → Show → Verify → Next',
    'Never pretend you performed it', 'Do not merely summarize', 'Do not assume I am a complete beginner']) {
    assert.ok(packet.includes(text), text)
  }
  assert.ok(!packet.includes('/Users/'))
  const long = { ...sample, content: sample.content.repeat(10000) }
  assert.ok(buildPacket(long).endsWith(long.content + '\n'))
})

test('all chapter modes work; conceptual mode never waives verification of real actions', () => {
  for (const mode of AI_MODES) assert.ok(buildPacket({ ...sample, ai: { mode } }).includes(`Chapter mode: ${mode}`))
  assert.deepEqual(resolveAIOptions(), { mode: 'concept', projectFirst: true, verify: false })
  assert.equal(resolveAIOptions({ mode: 'setup' }).verify, true)
  assert.ok(buildPacket({ ...sample, ai: { verify: false, projectFirst: false } }).includes('Any actual operation still requires evidence'))
  assert.throws(() => resolveAIOptions({ mode: 'bogus' } as unknown as AIOptions))
  assert.throws(() => resolveAIOptions({ verify: 'yes' } as unknown as AIOptions))
})

test('every generated packet belongs to exactly its source chapter, with full original Markdown', () => {
  const files = readdirSync('docs/public/ai-reading')
  const expected = VOLS.reduce((count: number, vol: { file: string }) => count +
    [...readFileSync(join('books', vol.file), 'utf8').matchAll(/^# 第\s*\d+\s*章\s/gm)].length, 0)
  assert.equal(files.length, expected)
  const seen = new Set()
  for (const file of files) {
    const chapter: ReadingChapter = JSON.parse(readFileSync(join('docs/public/ai-reading', file), 'utf8'))
    assert.ok(!seen.has(chapter.slug)); seen.add(chapter.slug)
    const vol = VOLS.find((vol: { id: string }) => vol.id === chapter.bookId)
    assert.ok(vol)
    const source = readFileSync(join('books', vol.file), 'utf8')
    const blocks = source.split(/(?=^# )/m)
    const block = blocks.find(block => new RegExp(`^# 第\\s*${chapter.chapter}\\s*章\\s`).test(block))
    // The existing assembler consumes the newline separating adjacent H1 blocks.
    assert.equal(chapter.content.trimEnd(), block!.trimEnd())
    assert.ok(source.includes(chapter.content))
    assert.equal(chapter.title, block!.split('\n')[0].replace(/^# 第\s*\d+\s*章\s*/, '').trim())
    assert.equal(chapter.canonicalUrl, `https://books.stickmancharles.com/${chapter.slug}`)
    const page = readFileSync(`docs/${chapter.slug}.md`, 'utf8')
    assert.ok(page.includes(`readWithAI: /ai-reading/${file}`))
    assert.equal(page.match(/<ReadWithAI \/>/g)?.length, 1)
    assert.ok(buildPacket(chapter).includes(chapter.content))
    assert.ok(!chapter.content.includes('<figure'))
  }
})

test('per-chapter metadata is validated and changes content-addressed assets', () => {
  const root = mkdtempSync(join(tmpdir(), 'books-ai-'))
  mkdirSync(join(root, 'books'))
  const metadata = join(root, 'books/ai-metadata.json')
  try {
    writeFileSync(metadata, '{}')
    let assets = createChapterAssets(root)
    const first = assets.write(VOLS[0], 1, sample.title, sample.content)
    assets.validate()
    writeFileSync(metadata, JSON.stringify({ 'guide/01/ch01': { mode: 'debug', verify: true } }))
    assets = createChapterAssets(root)
    const second = assets.write(VOLS[0], 1, sample.title, sample.content)
    assert.notEqual(first, second)
    assert.equal(JSON.parse(readFileSync(join(root, 'docs/public', second), 'utf8')).ai.mode, 'debug')
    assets.validate()
    writeFileSync(metadata, '{"guide/99/ch99":{}}')
    assert.throws(() => createChapterAssets(root).validate(), /missing chapter/)
    writeFileSync(metadata, '{"guide/01/ch01":{"mode":"typo"}}')
    assert.throws(() => createChapterAssets(root), /Unknown AI mode/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

for (const provider of PROVIDERS) {
  test(`${provider.name}: copy starts under activation; opens only after success`, async () => {
    const events: string[] = []
    let complete!: () => void
    const copying = new Promise<void>(resolve => { complete = resolve })
    const result = openWithAI({ provider: provider.id, packet: buildPacket(sample) }, {
      copy: text => { assert.ok(text.includes(sample.content)); events.push('copy'); return copying },
      reserveTab: () => { events.push('reserve'); return { navigate: url => { events.push(url) }, close: () => { events.push('close') } } },
    })
    assert.deepEqual(events, ['copy', 'reserve'])
    complete()
    assert.deepEqual(await result, { opened: true })
    assert.deepEqual(events, ['copy', 'reserve', provider.url])
    assert.equal(new URL(provider.url).search, '')
    for (const icon of [provider.icon, provider.darkIcon]) assert.ok(readFileSync(`docs/public${icon}`, 'utf8').startsWith('<svg'))
  })
}

test('copy-only never opens a provider, blocked popups preserve successful copy', async () => {
  assert.deepEqual(await openWithAI({ provider: 'clipboard', packet: 'packet' }, {
    copy: async () => {}, reserveTab: () => { throw new Error('Must not open') },
  }), { opened: false })
  assert.deepEqual(await openWithAI({ provider: 'claude', packet: 'packet' }, {
    copy: async () => {}, reserveTab: () => null,
  }), { opened: false })
})

test('clipboard denial closes the reserved tab and never navigates', async () => {
  let closed = false
  await assert.rejects(openWithAI({ provider: 'grok', packet: 'packet' }, {
    copy: async () => { throw new Error('Denied') },
    reserveTab: () => ({ close: () => { closed = true }, navigate: () => assert.fail('Must not navigate') }),
  }), /Denied/)
  assert.ok(closed)
})
