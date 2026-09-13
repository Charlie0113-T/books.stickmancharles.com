#!/usr/bin/env node
// assemble.mjs — 从 books/ 拆书装配站点。
//
// 单一真相源原则：书稿只住在 books/，站点章节页由本脚本生成。
// 改书 → 重跑本脚本 → 站点更新。永远不要直接编辑 docs/guide/ 下的生成文件。
//
// 从 scripts/assemble.py 逐行等价移植（迁移到 Node 是为了让 CI 构建环境只依赖 Node）。
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createChapterAssets } from './read-with-ai.mjs'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const BOOKS = join(ROOT, 'books')
const GUIDE = join(ROOT, 'docs', 'guide')
const FIGURES = join(ROOT, 'figures')

export const VOLS = [
  {
    id: '01', file: 'AI时代的编程指南-01-看懂地图.md', short: '01 看懂地图', stars: '★',
    parts: [['地图 · 软件世界长什么样', 1, 6], ['工具 · 每天在用的东西', 7, 11], ['心法 · 和 AI 一起变强', 12, 16]],
    extras: [['# 写在最后', 'letter', '写在最后 · 给爸爸'],
             ['# 附录 A', 'appendix-a', '附录 A · 术语表'],
             ['# 附录 B', 'appendix-b', '附录 B · 解剖我们自己的项目'],
             ['# 附录 C', 'appendix-c', '附录 C · 红线卡']],
  },
  {
    id: '02', file: 'AI时代的编程指南-02-上手工具.md', short: '02 上手工具', stars: '★★',
    parts: [['上手工具', 1, 12]],
    extras: [['# 附：本册新词', 'terms', '附：本册新词']],
  },
  {
    id: '03', file: 'AI时代的编程指南-03-读懂语言.md', short: '03 读懂语言', stars: '★★★',
    parts: [['读懂语言', 1, 10]],
    extras: [['# 附：本册新词', 'terms', '附：本册新词']],
  },
  {
    id: '04', file: 'AI时代的编程指南-04-深入系统.md', short: '04 深入系统', stars: '★★★★',
    parts: [['深入系统', 1, 10]],
    extras: [['# 附：本册新词', 'terms', '附：本册新词']],
  },
  {
    id: '05', file: 'AI时代的编程指南-05-跟AI搭档.md', short: '05 跟 AI 搭档', stars: '★★★★★',
    parts: [['认识你的搭档', 1, 4], ['和搭档共事的制度', 5, 14]],
    extras: [['# 写在最后', 'letter', '写在最后 · 给每一位读者'],
             ['# 附：本册新词', 'terms', '附：本册新词']],
  },
]

const BEAT_RE = /^\*\*(关键领悟|试一试|出事时想起我|认脸卡)\*\*(（[^）]*）)?[：:]\s*(.*)$/
const BEAT_KIND = { 关键领悟: 'info', 试一试: 'tip', 出事时想起我: 'warning', 认脸卡: 'info' }
const CH_RE = /^# 第\s*(\d+)\s*章\s*(.+)$/
const PART_RE = /^# 第[一二三四五]部分/

// 把 **关键领悟**：/ **试一试**：等单段标记转换成 VitePress 容器。
export function beats(text) {
  const out = []
  for (const line of text.split('\n')) {
    const m = line.trim().match(BEAT_RE)
    if (m) {
      const [, name, paren, body] = [m[0], m[1], m[2] || '', m[3]]
      const kind = BEAT_KIND[name]
      const title = `${name}${paren}`
      out.push(`::: ${kind} ${title}`, body, ':::')
    } else {
      out.push(line)
    }
  }
  return out.join('\n')
}

// CommonMark 的定界符规则：右侧 ** 前面是标点、后面又紧跟汉字时无法闭合，
// 于是"**第一步，把需求说清。**用"这类写法会把星号原样漏在页面上（书里有 68 处）。
// 这里在生成阶段把单行、不含嵌套星号的 **…** 直接转成 <strong>，绕开该规则——
// 只动渲染，不动书稿。围栏代码块与行内代码原样跳过。
export function fixBold(text) {
  // 先把围栏代码块和行内代码挖成占位符（粗体里也可能嵌着行内代码，
  // 所以必须先挖空再整体匹配，不能按代码切段——那样会把一对 ** 劈开）
  const vault = []
  const stash = s => `\u0000${vault.push(s) - 1}\u0000`
  let t = text
    .replace(/```[\s\S]*?```/g, stash)
    .replace(/`[^`\n]*`/g, stash)
  t = t.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
  return t.replace(/\u0000(\d+)\u0000/g, (_, i) => vault[Number(i)])
}

// 章节配图：只上站，不进书稿也不进 PDF——books/ 是 PDF 的唯一来源，图放在它外面，
// PDF 自然不受影响。figures/<册>/<页>.svg 存在就内联到章标题之后。
//
// 为什么内联而不是 <img src="...svg">：站点黑白两套主题靠 .dark 切换，图里的线用
// currentColor 画，内联进 HTML 才能继承页面文字色，深浅两边各自成立，切主题也跟着走。
// 外链的 SVG 是另一个文档，读不到这边的 currentColor，深色下会变成一团黑。
//
// 图注文案存在 SVG 根节点的 data-caption 上，一张图一个文件，不另立清单。
function figure(volId, fname, md) {
  const path = join(FIGURES, volId, `${fname}.svg`)
  if (!existsSync(path)) return md
  const svg = readFileSync(path, 'utf8').trim()
  const cap = (svg.match(/data-caption="([^"]*)"/) || [])[1] || ''
  // 整块不能出现空行：markdown-it 的 HTML 块遇空行即结束，断开后半截 SVG 会被当正文渲染
  const block = ['<figure class="book-figure">',
                 svg.replace(/\n\s*/g, ' '),
                 cap && `<figcaption>${cap}</figcaption>`,
                 '</figure>'].filter(Boolean).join('\n')
  const nl = md.indexOf('\n')            // 第一行是章标题 h1，图插在它后面
  return `${md.slice(0, nl + 1)}\n${block}\n${md.slice(nl + 1)}`
}

function tidy(text) {
  text = text.replace(/\n---\n\s*$/, '\n')   // 去掉块尾分隔线
  text = text.replace(/^\s*---\n/, '')       // 去掉块首分隔线
  return text.trim() + '\n'
}

// 阅读时长估算：中文按 400 字/分钟。只是个估算，页面上标注为"约"。
function readMinutes(text) {
  const n = text.replace(/\s/g, '').length
  return Math.max(1, Math.round(n / 400))
}

// 每页顶部写入 frontmatter：难度星级 + 阅读时长，供右侧目录下方的元信息区读取。
function frontmatter(vol, text, packetUrl) {
  return ['---', `stars: ${vol.stars.length}`, `readTime: ${readMinutes(text)}`,
    ...(packetUrl ? [`readWithAI: ${packetUrl}`] : []), '---', ''].join('\n')
}

// 侧边栏条目文案是 v-html 渲染的，这里拼出"等宽序号 + 标题"的两栏结构。
function navItem(num, title, star) {
  return `<span class="s-n">${num}</span><span class="s-t">${title}</span>` +
         (star ? `<span class="s-star">${star}</span>` : '')
}

function splitVolume(vol, assets) {
  const src = readFileSync(join(BOOKS, vol.file), 'utf8')
  const lines = src.split('\n')
  // 找出所有 h1 的位置
  const h1s = []
  lines.forEach((l, i) => { if (l.startsWith('# ')) h1s.push([i, l]) })
  // 分块：每个 h1 到下一个 h1
  const blocks = []
  h1s.forEach(([i, l], n) => {
    const end = n + 1 < h1s.length ? h1s[n + 1][0] : lines.length
    blocks.push([l, lines.slice(i, end).join('\n')])
  })

  const outdir = join(GUIDE, vol.id)
  mkdirSync(outdir, { recursive: true })
  const chapters = {}
  const extrasOut = []
  const indexParts = []

  for (let [head, body] of blocks) {
    if (PART_RE.test(head)) continue // 部标题不成页，结构进侧边栏分组
    const m = head.match(CH_RE)
    if (m) {
      const num = parseInt(m[1], 10)
      const title = m[2].trim()
      // 章标题用 " · " 分隔主副题（历史稿件用 "："），侧边栏只取主题
      const main = title.split(/ · |：/)[0]
      const fname = `ch${String(num).padStart(2, '0')}`
      body = body.replace(/^# 第[一二三四五]部分.*$/gm, '')
      const packetUrl = assets.write(vol, num, title, body)
      const page = figure(vol.id, fname, tidy(fixBold(beats(body))))
        .replace(/^(# .+)\n/, '$1\n\n<ReadWithAI />\n')
      writeFileSync(join(outdir, `${fname}.md`), frontmatter(vol, body, packetUrl) + page, 'utf8')
      chapters[num] = { file: fname, main }
      continue
    }
    let matched = false
    for (const [prefix, fname, text] of vol.extras) {
      if (head.startsWith(prefix)) {
        writeFileSync(join(outdir, `${fname}.md`), frontmatter(vol, body) + tidy(fixBold(beats(body))), 'utf8')
        extrasOut.push({ file: fname, text })
        matched = true
        break
      }
    }
    if (!matched) {
      // 扉页 / 小序 / 目录 / 序 → 汇入本册首页
      body = body.replace(/^# 第[一二三四五]部分.*$/gm, '')
      indexParts.push(body)
    }
  }

  const indexBody = indexParts.join('\n\n')
  writeFileSync(join(outdir, 'index.md'), frontmatter(vol, indexBody) + tidy(fixBold(indexBody)), 'utf8')

  // 侧边栏分组
  const items = [{ text: navItem('·', '扉页 · 序'), link: `/guide/${vol.id}/` }]
  const groups = []
  for (const [pname, lo, hi] of vol.parts) {
    const gi = []
    for (let n = lo; n <= hi; n++) {
      if (n in chapters) {
        gi.push({ text: navItem(String(n).padStart(2, '0'), chapters[n].main),
                  link: `/guide/${vol.id}/${chapters[n].file}` })
      }
    }
    groups.push({ text: pname, collapsed: false, items: gi })
  }
  const tail = extrasOut.map(e => ({ text: navItem('·', e.text), link: `/guide/${vol.id}/${e.file}` }))
  const sidebarGroup = { text: navItem(vol.id, vol.short.slice(3), vol.stars),
                        collapsed: vol.id !== '01', items: [...items, ...groups, ...tail] }
  return [sidebarGroup, extrasOut, outdir]
}

function main() {
  mkdirSync(GUIDE, { recursive: true })
  const assets = createChapterAssets(ROOT)
  // 00 总纲只留在 books/ 里存档，不上站（2026-08 起）
  const sidebar = []
  const glossarySecs = []
  for (const vol of VOLS) {
    const [group, extrasOut, outdir] = splitVolume(vol, assets)
    sidebar.push(group)
    // 收集术语表来源
    for (const e of extrasOut) {
      if (e.file === 'appendix-a' || e.file === 'terms') {
        let body = readFileSync(join(outdir, `${e.file}.md`), 'utf8')
        body = body.split('\n').slice(1).join('\n').trim() // 去掉页内 h1
        glossarySecs.push([vol.short, body])
      }
    }
  }
  assets.validate()
  const ts = 'export default ' + JSON.stringify(sidebar, null, 2)
  writeFileSync(join(ROOT, 'docs', '.vitepress', 'sidebar-books.ts'), ts, 'utf8')

  const glossary = ['# 术语表',
                    '',
                    '> 这份表是活的：由各册的术语附录自动汇总（`scripts/assemble.mjs`）。',
                    '> 想加新词，改对应书稿的附录，重跑脚本。',
                    '']
  for (const [short, body] of glossarySecs) {
    glossary.push(`## ${short}`, '', body, '')
  }
  writeFileSync(join(ROOT, 'docs', 'glossary.md'), glossary.join('\n'), 'utf8')

  console.log(`assembled: ${sidebar.length} sidebar groups, glossary sections: ${glossarySecs.length}`)
}

// 被 make-pdf.mjs 等脚本 import 时不执行；直接 node scripts/assemble.mjs 时执行。
if (process.argv[1] === fileURLToPath(import.meta.url)) main()
