# 这个书站是怎么搭的

最诚实的教程是解剖自己。这一页记录 books.stickmancharles.com 的完整做法——它同时也是[第二册第 12 章](/guide/02/ch12)那十步的放大版。

## 三条原则

**装配，不是生产。**这个站上线时的全部内容——四册书、总纲、术语表——在建站之前就已经写完。建站只是把存货装配起来。反过来说：别为了建站而临时生产三十个新页面，空页是文档站的死法。

**单一真相源。**书稿只住在 `books/` 目录里。站点的章节页、侧边栏、术语表，全部由 `scripts/assemble.mjs` 自动生成：拆章、把"关键领悟 / 试一试 / 认脸卡 / 出事时想起我"转换成卡片、汇总各册术语。**改书 → 重跑脚本 → 站点更新**，永远不手改生成文件。同一份知识存两处必然漂移——这条纪律我们付过学费（documint 事件，见[第一册第 12 章](/guide/01/ch12)）。

**风格从主站继承。**主题层是一份 CSS（`docs/.vitepress/theme/custom.css`），变量直接移植自主站的 Personal OS 设计系统：黑白双主题、玻璃质感、1px 细边、2px 圆角、噪点层。书站和主站看起来像一家人，因为它们真的共享一套变量。

## 技术选择

**VitePress**：Markdown 直出静态站，我们的书稿几乎原样能用；自带本地搜索（`Ctrl/Cmd+K`）、深浅主题、上一页/下一页。整个站没有数据库、没有后端——纯静态文件，走 CDN，快且免费。

## 本地跑起来

```bash
npm install          # 第一次
npm run assemble     # 改过 books/ 之后重跑
npm run docs:dev     # 本地预览
npm run docs:build   # 构建（顺带检查所有内链是否有效）
```

## 上线三步

1. 推上 GitHub（[第二册第 6 章](/guide/02/ch06)的三行咒语）。
2. Cloudflare 控制台新建一个 Worker（static assets），连接这个 GitHub 仓库，Deploy command 填 `npm run deploy`（资产目录写在仓库的 `wrangler.jsonc` 里）。

::: warning 出事时想起我
第一次部署报错：`The directory specified by the "assets.directory" field does not exist`。原因是 Workers Builds 的 **Build command 是可选字段，留空就直接跳到部署**——而构建产物 `dist/` 是 gitignore 的，仓库里根本没有，于是 wrangler 找了个空气。修法不是"记得在控制台填对"，而是把构建并进部署命令本身：`"deploy": "npm run docs:build && npx wrangler deploy"`。**能写进仓库的配置，就别放在控制台的记忆里。**
:::
3. 在 Worker 上绑定自定义域名 `books.stickmancharles.com`——域名本来就托管在 Cloudflare，一条记录都不用手加（[第四册第 1 章](/guide/04/ch01)）。

书教的最后一步，正好是把书自己发布出去。顺带一句真话：这个站第一版部署在 Vercel（[从零上线第一个网站](/projects/first-website)里教的就是那条路，依然好用），后来搬到 Cloudflare，是为了让域名、DNS、部署住在同一家——搬家本身也是[第四册](/guide/04/)讲的事。

## 还想做的

术语表的全站悬停释义（原型里已验证过交互）、MDX 化的交互块。都写在[路线图](/roadmap)里，做完再进导航。
