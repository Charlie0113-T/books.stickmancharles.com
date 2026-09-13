import test from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { checkAgentSkill, SKILL_PATH } from '../scripts/check-agent-skill.mjs'

const root = resolve(import.meta.dirname, '..')
function fixture(t: { after: (fn: () => void) => void }) {
  const dir = mkdtempSync(join(tmpdir(), 'skill-source-check-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  for (const path of [SKILL_PATH, 'books', 'docs/guide', 'docs/.vitepress/lib/read-with-ai/build-packet.ts', 'LICENSE-CONTENT.md']) {
    mkdirSync(dirname(join(dir, path)), { recursive: true })
    cpSync(join(root, path), join(dir, path), { recursive: true })
  }
  return dir
}

test('installable skill package stays reachable and source-reviewed', () => {
  assert.deepEqual(checkAgentSkill(root), [])
})

test('manuscript drift requires editorial review, rather than silently resyncing', t => {
  const dir = fixture(t)
  const path = join(dir, 'books/AI时代的编程指南-01-看懂地图.md')
  writeFileSync(path, readFileSync(path, 'utf8') + '\nUpdated teaching material.\n')
  assert.ok(checkAgentSkill(dir).some(error => error.includes('Source changed: books/') && error.includes('philosophy.md')))
})

test('a renamed canonical chapter cannot leave references pointing to missing pages', t => {
  const dir = fixture(t)
  rmSync(join(dir, 'docs/guide/02/ch05.md'))
  assert.ok(checkAgentSkill(dir).some(error => error.includes('Missing canonical source route') && error.includes('/02/ch05')))
})

test('new volumes demand an explicit task mapping', t => {
  const dir = fixture(t)
  writeFileSync(join(dir, 'books/AI时代的编程指南-06-新书.md'), '# A new book\n')
  assert.ok(checkAgentSkill(dir).some(error => error.includes('Book inventory changed')))
})

test('package links cannot depend on files outside the installed skill', t => {
  const dir = fixture(t)
  const path = join(dir, SKILL_PATH, 'README.md')
  writeFileSync(path, readFileSync(path, 'utf8') + '\n[repository-only file](../../README.md)\n')
  assert.ok(checkAgentSkill(dir).some(error => error.includes('non-portable package link')))
})

test('references must be discoverable directly without a nested reading chain', t => {
  const dir = fixture(t)
  const path = join(dir, SKILL_PATH, 'SKILL.md')
  // Remove every direct link to exercise reachability independently of link validity.
  writeFileSync(path, readFileSync(path, 'utf8').replaceAll('(references/testing.md)', '(references/not-present.md)'))
  const errors = checkAgentSkill(dir)
  assert.ok(errors.some(error => error.includes('not directly discoverable') && error.includes('testing.md')))
  assert.ok(errors.some(error => error.includes('not-present.md')))
})

test('a corrupted source manifest fails with an actionable error', t => {
  const dir = fixture(t)
  writeFileSync(join(dir, SKILL_PATH, 'sources.lock.json'), '{')
  assert.ok(checkAgentSkill(dir).some(error => error.includes('Cannot validate skill')))
})
