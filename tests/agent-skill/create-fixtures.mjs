// Isolated, synthetic workspaces for human/agent forward testing. No network services.
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = mkdtempSync(join(tmpdir(), 'ai-guide-eval-'))
function write(dir, file, text) {
  mkdirSync(join(dir, file, '..'), { recursive: true })
  writeFileSync(join(dir, file), text)
}
function git(dir, ...args) {
  return execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' })
}
function init(dir) {
  git(dir, 'init', '-b', 'main')
  git(dir, 'config', 'user.name', 'Skill Fixture')
  git(dir, 'config', 'user.email', 'fixture@example.invalid')
  git(dir, 'add', '.')
  git(dir, 'commit', '-m', 'Fixture baseline')
}
const debug = join(root, 'weather-widget')
write(debug, 'package.json', JSON.stringify({ name: 'weather-widget', private: true, type: 'module', scripts: { dev: 'node src/server.js', test: 'node --test' }, engines: { node: '>=20' } }, null, 2) + '\n')
write(debug, 'README.md', '# Weather widget\n\nLocal Node.js app, no external packages or APIs. Run `npm run dev`; expect a JSON temperature at the printed localhost address. Run `npm test`. Stop the process you start after verification.\n')
write(debug, 'src/server.js', "import { createServer } from 'node:http'\nimport { celsiusToFahrenheit } from './temperature'\nconst server = createServer((_req, res) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ temperature: celsiusToFahrenheit(20) })) })\nserver.listen(0, '127.0.0.1', () => console.log(`http://127.0.0.1:${server.address().port}`))\n")
write(debug, 'src/temperature.js', 'export function celsiusToFahrenheit(value) { return value * 9 / 5 + 32 }\n')
write(debug, 'temperature.test.js', "import test from 'node:test'\nimport assert from 'node:assert/strict'\nimport { celsiusToFahrenheit } from './src/temperature.js'\ntest('freezing point', () => assert.equal(celsiusToFahrenheit(0), 32))\n")
init(debug)
write(debug, 'notes.md', 'User work in progress: add rain icons later.\n')
const review = join(root, 'report-service')
write(review, 'README.md', '# Report service\n\nA private report is visible only to its owner. Missing reports return null. Run `npm test`. Review the current `feature/report-lookup` branch against `main`.\n')
write(review, 'package.json', JSON.stringify({ name: 'report-service', private: true, type: 'module', scripts: { test: 'node --test' } }, null, 2) + '\n')
write(review, 'reports.js', 'export function findReport(reports, id, userId) {\n  return reports.find(report => report.id === id && report.ownerId === userId) ?? null\n}\n')
write(review, 'reports.test.js', "import test from 'node:test'\nimport assert from 'node:assert/strict'\nimport { findReport } from './reports.js'\ntest('owner opens report', () => { const report = {id: 'r1', ownerId: 'alice'}; assert.equal(findReport([report], 'r1', 'alice'), report) })\ntest('missing report', () => assert.equal(findReport([], 'missing', 'alice'), null))\n")
init(review)
git(review, 'switch', '-c', 'feature/report-lookup')
write(review, 'reports.js', 'export function findReport(reports, id, userId) {\n  return reports.find(report => report.id === id) ?? null\n}\n')
git(review, 'add', 'reports.js')
git(review, 'commit', '-m', 'Simplify report lookup')
const game = join(root, 'Boring_Sword_Fight')
write(game, 'README.md', '# Boring Sword Fight\n\nRoblox project. Scripts below were exported from Studio manually. The place XML is the original place. No synchronization tool configured.\n')
write(game, 'src/ServerScriptService/Round.server.luau', 'local roundLength = 60\nprint("Round length", roundLength)\n')
write(game, 'Boring_Sword_Fight.rbxlx', '<roblox version="4"><Item class="Workspace" referent="RBX0"><Properties><string name="Name">Workspace</string></Properties></Item></roblox>\n')
write(game, '.env', 'EXAMPLE_PRIVATE_SETTING=synthetic-fixture-only\n')
write(game, '.env.example', 'EXAMPLE_PRIVATE_SETTING=\n')
write(game, '.DS_Store', 'synthetic local metadata\n')
console.log(JSON.stringify({ root, debug, review, game }, null, 2))
