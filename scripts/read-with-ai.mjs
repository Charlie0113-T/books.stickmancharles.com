import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { resolveAIOptions } from '../docs/.vitepress/lib/read-with-ai/options.mjs'

/** Only public manuscript data is emitted. No DOM extraction or browser data. */
export function createChapterAssets(root) {
  const metadata = JSON.parse(readFileSync(join(root, 'books/ai-metadata.json'), 'utf8'))
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) throw new Error('Invalid AI metadata map')
  for (const options of Object.values(metadata)) resolveAIOptions(options)
  const output = join(root, 'docs/public/ai-reading')
  rmSync(output, { recursive: true, force: true })
  mkdirSync(output, { recursive: true })
  const seen = new Set()
  return {
    write(vol, chapter, title, content) {
      const slug = `guide/${vol.id}/ch${String(chapter).padStart(2, '0')}`
      seen.add(slug)
      const data = JSON.stringify({
        book: `AI 时代的编程指南 · ${vol.short}`, bookId: vol.id,
        chapter, title, slug, canonicalUrl: `https://books.stickmancharles.com/${slug}`,
        content, ai: resolveAIOptions(metadata[slug]),
      })
      const hash = createHash('sha256').update(data).digest('hex').slice(0, 12)
      const filename = `${vol.id}-ch${String(chapter).padStart(2, '0')}.${hash}.json`
      writeFileSync(join(output, filename), data + '\n')
      return `/ai-reading/${filename}`
    },
    validate() {
      for (const slug of Object.keys(metadata)) {
        if (!seen.has(slug)) throw new Error(`AI metadata references a missing chapter: ${slug}`)
      }
    },
  }
}
