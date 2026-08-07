# figures — 章节配图

线稿 SVG，一章一张，只上网站，不进书稿也不进 PDF。

## 为什么放在这里，而不是 books/

`books/` 是 PDF 的唯一来源（`scripts/make-pdf.mjs` 直接读它）。图放在 `books/` 外面，PDF 就不受影响，书稿也保持干净——它仍然是一份能单独读完的纯文本。

装配时 `scripts/assemble.mjs` 会找 `figures/<册>/<页>.svg`，找到就把它**内联**到章标题之后。没有对应文件的章节照旧，不报错。

```
figures/01/ch01.svg  →  docs/guide/01/ch01.md 的 h1 之后
```

## 为什么内联，而不是 <img src="...svg">

站点有黑白两套主题，靠 `<html class="dark">` 切换。图里的线用 `currentColor` 画，内联进 HTML 才继承得到页面文字色，深浅两边各自成立，切主题时图跟着切。外链的 SVG 是另一个文档，读不到这边的 `currentColor`，深色下会糊成一团黑。

## 画图规范

- **画布**：`viewBox="0 0 720 H"`，宽度固定 720，高度按内容定。左右安全边距 40，右下角留一行水印。
- **只写几何，不写样式**。颜色、线宽、字号全在 `docs/.vitepress/theme/custom.css` 的「章节配图」一节，改一处，全书的图一起变。
- **不留空行**。markdown-it 的 HTML 块遇空行即结束，SVG 中间断开会被当正文渲染。每个 `<text>` 写成一行。
- **不用 `<defs>` / `marker` / `id`**。内联后 id 是全页共享的，容易撞车；箭头就用两笔短线画。
- **署名**：每张图右下角一行水印 `stickmancharles.com · CC BY-NC-ND 4.0`，用 `.mk` 类。
- **无障碍**：根节点写 `role="img"` 和 `aria-label`（一句话说清图在讲什么）。
- **图注**：写在根节点的 `data-caption` 上，装配时自动变成 `<figcaption>`。一张图一个文件，不另立清单。

可用的类：

| 类 | 用途 |
| --- | --- |
| `s` | 描线（`fill:none`），叠 `s2` / `s3` 降灰度，叠 `d` 变虚线 |
| `hl` | 加粗，圈重点 |
| `fl` | 实心填充（圆点、箭头、小图标） |
| `t` / `tk` / `ts` | 正文标签 / 关键词 / 小注 |
| `tm` | 等宽（命令、字段名、编号） |
| `mk` | 右下角水印 |

## 改完之后

```bash
npm run assemble    # 重新装配，图进站点
npm run docs:dev    # 本地看
```

窄屏（≤720px）时图不缩，整块横向滚动，保证 11px 的小注还读得清。
