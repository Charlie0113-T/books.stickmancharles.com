#!/usr/bin/env node
// Maintainer check only: never generates teaching text or silently refreshes hashes.
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SKILL_PATH = 'skills/stickmancharles-ai-guide'
export const sha256 = content => createHash('sha256').update(content).digest('hex')
const SITE = 'https://books.stickmancharles.com/'

export function checkAgentSkill(root) {
  const errors = []
  const skill = join(root, SKILL_PATH)
  const read = path => readFileSync(path, 'utf8')
  try {
    const main = read(join(skill, 'SKILL.md'))
    // Full YAML/spec validation is separate; enforce our deliberately small profile here.
    if (!/^---\nname: stickmancharles-ai-guide\n/m.test(main)) errors.push('Skill name/frontmatter does not match its directory.')
    if (main.split('\n').length >= 500) errors.push('SKILL.md must stay below 500 lines.')
    if (main.split(/\s+/).length > 2500) errors.push('SKILL.md exceeds the project’s 2500-word budget.')
    const manifest = JSON.parse(read(join(skill, 'sources.lock.json')))
    if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.sources)) throw new Error('Invalid source manifest format.')
    const references = readdirSync(join(skill, 'references')).filter(name => name.endsWith('.md')).sort()
    if (!references.length) errors.push('No task references found.')
    for (const name of references) {
      if (!main.includes(`(references/${name})`)) errors.push(`Reference is not directly discoverable from SKILL.md: ${name}`)
      const body = read(join(skill, 'references', name))
      const canonical = [...body.matchAll(/https:\/\/books\.stickmancharles\.com\/[^\s)]+/g)].map(match => match[0])
      if (!canonical.length) errors.push(`Reference lacks a canonical source: ${name}`)
      for (const url of canonical) {
        const route = decodeURIComponent(url.slice(SITE.length).split('#')[0])
        if (route.includes('..') || !existsSync(join(root, 'docs', `${route}.md`)) && !existsSync(join(root, 'docs', route, 'index.md'))) {
          errors.push(`Missing canonical source route in ${name}: ${url}`)
        }
        const volume = route.match(/^guide\/(\d{2})\//)?.[1]
        if (volume && !manifest.sources.some(source => source.volume === volume && source.references.includes(name))) {
          errors.push(`Source mapping missing for ${name}: volume ${volume}`)
        }
      }
    }
    for (const name of ['SKILL.md', 'README.md', 'sources.md', ...references.map(name => `references/${name}`)]) {
      const body = read(join(skill, name))
      for (const match of body.matchAll(/\]\(([^)]+)\)/g)) {
        const target = match[1].split('#')[0]
        if (!target || /^(?:https?:|mailto:)/.test(target)) continue
        const local = resolve(dirname(join(skill, name)), target)
        if (!local.startsWith(`${skill}/`) || !existsSync(local)) errors.push(`Broken/non-portable package link in ${name}: ${target}`)
      }
    }
    const lockedBooks = manifest.sources.filter(source => source.volume).map(source => source.path).sort()
    const actualBooks = readdirSync(join(root, 'books')).filter(name => name.endsWith('.md') && name !== 'AI时代的编程指南-00-总纲.md').map(name => `books/${name}`).sort()
    if (JSON.stringify(lockedBooks) !== JSON.stringify(actualBooks)) errors.push('Book inventory changed; review learning-map.md and source mappings.')
    for (const source of manifest.sources) {
      if (source.path.includes('..') || source.path.startsWith('/')) throw new Error('Source paths must be repository-relative.')
      const path = join(root, source.path)
      if (!existsSync(path)) { errors.push(`Source is missing: ${source.path}`); continue }
      if (sha256(readFileSync(path)) !== source.sha256) errors.push(`Source changed: ${source.path}. Review affected references before updating its hash: ${source.references.join(', ')}`)
      for (const reference of source.references) {
        if (!references.includes(reference)) errors.push(`Unknown reference in source mapping: ${reference}`)
      }
    }
    if (!existsSync(join(skill, 'LICENSE.md'))) errors.push('Portable license file is missing.')
  } catch (error) {
    errors.push(`Cannot validate skill: ${error.message}`)
  }
  return errors
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const errors = checkAgentSkill(root)
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else {
    console.log('Agent Skill: references, canonical routes, package links, size, source inventory and hashes pass.')
  }
}
