#!/usr/bin/env node
// make-pdf.mjs — 从 books/ 生成每册 PDF（发行物，不是构建产物）。
//
// 架构决定：PDF 只在本地生成、提交进仓库，CI 永不构建 PDF。
// 用法：npm run pdf            （生成全部五册）
//       npm run pdf -- 01      （只生成第一册，用于先验证字体嵌入）
//
// 渲染链：books/*.md → beats() 容器转换 → VitePress 的 markdown 渲染器
// → 打印样式 HTML → 本机 Chrome 无头打印（系统中文字体自动子集化嵌入）。
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { createMarkdownRenderer } from 'vitepress'
import { VOLS, beats, fixBold } from './assemble.mjs'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const OUT = join(ROOT, 'docs', 'public', 'pdf')

// 版本号：与总纲一致，各册 v1.0。发新版时改这里，文件名随之变化，旧版留档。
const VERSIONS = { '01': 'v1.0', '02': 'v1.0', '03': 'v1.0', '04': 'v1.0', '05': 'v1.0' }

const CHROMES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
]

const CSS = `
  @page { size: A4; margin: 22mm 20mm; }
  html { font-size: 11.5pt; }
  body {
    font-family: 'Songti SC', 'Noto Serif CJK SC', serif;
    color: #111; line-height: 1.85; margin: 0;
  }
  .cover { page-break-after: always; padding-top: 34%; text-align: center; }
  .cover .series { font-size: 10pt; letter-spacing: 0.4em; color: #666; margin-bottom: 2em; }
  .cover h1 { font-family: 'PingFang SC', sans-serif; font-size: 26pt; letter-spacing: 0.1em; margin: 0 0 0.4em; page-break-before: auto; padding-top: 0; }
  .cover .stars { font-size: 12pt; letter-spacing: 0.3em; color: #333; margin-bottom: 4em; }
  .cover .byline { font-size: 10.5pt; color: #444; line-height: 2.1; }
  .cover .lic { font-size: 8.5pt; color: #888; margin-top: 5em; line-height: 1.9; }
  h1 { font-family: 'PingFang SC', sans-serif; font-size: 17pt; page-break-before: always; margin-top: 0; padding-top: 1.5em; }
  h2 { font-family: 'PingFang SC', sans-serif; font-size: 13pt; margin-top: 2em; }
  h3 { font-family: 'PingFang SC', sans-serif; font-size: 11.5pt; }
  p { margin: 0.7em 0; text-align: justify; }
  code { font-family: Menlo, monospace; font-size: 0.86em; background: #f2f2f0; padding: 0.1em 0.35em; border-radius: 2px; }
  pre { background: #f6f6f4; border: 0.5pt solid #ddd; padding: 1em; overflow-x: hidden; page-break-inside: avoid; }
  pre code { background: none; padding: 0; white-space: pre-wrap; word-break: break-all; }
  pre span { color: #111 !important; background: transparent !important; }
  table { border-collapse: collapse; width: 100%; font-size: 0.9em; }
  th, td { border: 0.5pt solid #bbb; padding: 0.4em 0.7em; text-align: left; }
  blockquote { border-left: 2pt solid #999; margin: 1em 0; padding: 0.1em 1.2em; color: #444; }
  .custom-block { border: 0.5pt solid #999; border-left: 2pt solid #111; padding: 0.8em 1.2em; margin: 1.2em 0; page-break-inside: avoid; background: #fafaf8; }
  .custom-block-title { font-family: Menlo, monospace; font-size: 8pt; letter-spacing: 0.25em; color: #666; margin-bottom: 0.4em; }
  .custom-block.warning { border-left-style: dashed; }
  a { color: #111; text-decoration: none; }
  hr { border: none; border-top: 0.5pt solid #ccc; margin: 2em 0; }
  img { max-width: 100%; }
`

function chrome() {
  const found = CHROMES.find(existsSync)
  if (!found) {
    console.error('未找到 Chrome/Chromium/Brave，无法打印 PDF。装一个，或改 CHROMES 列表。')
    process.exit(1)
  }
  return found
}

function checkFontEmbedded(pdfPath) {
  // Chrome 打印会把用到的字体子集化嵌入为 FontFile2；没有它就说明中文没嵌进去。
  const buf = readFileSync(pdfPath)
  return buf.includes('FontFile2') || buf.includes('FontFile3')
}

async function main() {
  const only = process.argv[2] || null
  const vols = VOLS.filter(v => !only || v.id === only)
  if (!vols.length) { console.error(`没有第 ${only} 册`); process.exit(1) }

  mkdirSync(OUT, { recursive: true })
  const md = await createMarkdownRenderer(join(ROOT, 'docs'))
  const bin = chrome()

  for (const vol of vols) {
    const src = readFileSync(join(ROOT, 'books', vol.file), 'utf8')
    const body = md.render(fixBold(beats(src)))
    const version = VERSIONS[vol.id]
    const name = vol.file.replace(/\.md$/, `-${version}.pdf`)
    const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>AI 时代的编程指南 ${vol.short}</title><style>${CSS}</style></head>
<body>
<div class="cover">
  <div class="series">AI 时代的编程指南</div>
  <h1>${vol.short.slice(3)}</h1>
  <div class="stars">${vol.stars}</div>
  <div class="byline">Charles Tao 著，与 Claude 协作完成<br>books.stickmancharles.com · ${version}</div>
  <div class="lic">正文 CC BY-NC-ND 4.0 · 代码 MIT<br>署名：Charles Tao，《AI 时代的编程指南》，books.stickmancharles.com</div>
</div>
${body}
</body></html>`

    const tmpHtml = join(tmpdir(), `book-${vol.id}.html`)
    writeFileSync(tmpHtml, html, 'utf8')
    const outPdf = join(OUT, name)
    execFileSync(bin, [
      '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
      `--print-to-pdf=${outPdf}`, `file://${tmpHtml}`,
    ], { stdio: 'pipe' })
    rmSync(tmpHtml)

    const kb = Math.round(statSync(outPdf).size / 1024)
    const embedded = checkFontEmbedded(outPdf)
    console.log(`${name}  ${kb} KB  字体嵌入: ${embedded ? 'OK' : '失败'}`)
    if (!embedded) { console.error('中文字体未嵌入，中止。'); process.exit(1) }
  }
  console.log(`\n输出目录：docs/public/pdf/。记得把 books-data.js 里对应册的 pdf 字段指向新文件。`)
}

main()
