# 任务书：books.stickmancharles.com

> 交给 Claude Code 执行。本文件本身按《AI 时代的编程指南》第一册第 13 章的需求骨架写成：**背景 / 目标 / 约束 / 例子**。

---

## 0. 元指令（先读这一段，再动手）

1. **分阶段执行，每个阶段先给计划再动手。**每阶段开始时，先列出"打算改哪些文件、怎么改"，等我确认后再写代码。不要一口气做完五个阶段。
2. **每阶段一个 commit**，说明写清楚这阶段做了什么。
3. **不确定就问，不要猜。**尤其涉及设计取舍、删除文件、部署配置时。
4. **部署配置以 Cloudflare 官方最新文档为准**——先查文档再动手，不要凭记忆写配置。
5. 遇到本任务书没写到的决策点，停下来问我，不要自行发挥。

---

## 1. 背景

这Stickman Charles书籍的的官方站点。用来存放五册技术书《AI 时代的编程指南》，以及未来每年我文章的整合。技术书《AI 时代的编程指南》由我（Charles Tao，作者）与 Claude 协作写成，献给我的父亲 Roy。全部内容来自我们自己的真实项目和付过的学费——这是这个站唯一的可信度来源，不要往里加任何我们没做过的东西。

**现有代码库**（已构建通过，96 页）：

```
books/                        五册书稿的 Markdown 原文 —— 唯一真相源
scripts/assemble.py           拆书脚本：books/ → docs/guide/**、侧边栏、术语表
docs/                         VitePress 站点
  .vitepress/config.mts       配置（导航、侧边栏、搜索）
  .vitepress/sidebar-books.ts 生成物，勿手改
  .vitepress/theme/custom.css Personal OS 设计系统（黑白双主题、玻璃、噪点、2px 圆角）——事实上，还是不够贴合，我建议参考/Volumes/4TB Photos+CODE/Charlie0113-T.github.io/style.css
  guide/**                    生成物，勿手改
  reference/**                26 张速查薄页（手写）
  start/** projects/**        手写页
  index.md glossary.md roadmap.md
package.json
```

**当前状态**：域名原定 docs.stickmancharles.com，部署原定 Vercel。**两者都要改**。

---

## 2. 目标

把这个站从"文档站"改组成"**书架**"，域名改为 `books.stickmancharles.com`，部署到 Cloudflare，并补上双许可证与 PDF 发行。五件交付物：

1. 域名与文案改组（docs → books；Vercel → Cloudflare）
2. 装配脚本从 Python 移植到 Node（让 CI 构建只依赖 Node）
3. 纯 CSS 3D 书架首页
4. 双许可证（散文/网站源码 CC BY-NC-ND 4.0 /  文章中代码MIT）
5. PDF 发行管线（本地生成，不进 CI）

---

## 3. 约束（含红线）

### 架构红线

- **`books/` 目录是唯一真相源。**书稿只住在这里。`docs/guide/**`、`sidebar-books.ts`、`glossary.md` 全部是生成物——**永远不要手工编辑生成物**，要改内容就改 `books/` 再重跑装配脚本。
- **不要修改 `books/` 里的任何文字内容。**你可以读它、解析它，不可以改它。文字是我的事。
- **不引入 React。**站是 VitePress（Vue 底层）。3D 书籍效果必须用纯 CSS 实现，不要为了一个视觉效果引入 React 或任何组件库。
- **不要新增导航项指向未完成的内容。**站规：导航里只放写完的东西，规划中的一切住在 `/roadmap`。

### 设计约束

- 参考/Volumes/4TB Photos+CODE/Charlie0113-T.github.io/style.css
- 深浅双主题都必须正常（浅色是暖纸色 `#F5F4F0`）。
- **书架只做首页。**阅读页保持现在的快速文本体验，不要把 3D 效果蔓延进去。
- 尊重 `prefers-reduced-motion`：开启时禁用所有 3D 变换与动画。
- 移动端（<768px）书架降级为平铺卡片，不做 3D。

### 内容约束

- 站上出现的每一句话都必须是真的。**不要编造功能、不要写"敬请期待"、不要加占位内容。**
- 保持全站中文，术语按现有习惯中英混排。

---

## 4. 分阶段任务

### Phase 1 · 域名与部署改组

1. `docs/.vitepress/config.mts`：
   - 加 `sitemap: { hostname: 'https://books.stickmancharles.com' }`
   - 检查并更新所有站点元信息（title / description / og）
2. **全库搜索 `docs.stickmancharles.com` 与 `Vercel`**，逐处更新为 `books.stickmancharles.com` 与 Cloudflare。重点：
   - `README.md`
   - `docs/projects/how-this-site-was-built.md` —— **这一页描述本站自己的搭法，必须和现实一致**（这是单一真相源原则用在文档自身上）
   - `docs/projects/first-website.md` —— 注意：这一页讲的是书里第二册第 12 章的十步演练，**那一步用的确实是 Vercel，保持不变**。只改描述本站部署的地方，别改书里的教学内容。
3. 保留站内所有 `/guide/**`、`/reference/**` 路径不变（还没上线过，但保持路径稳定是好习惯）。

### Phase 2 · 装配脚本移植到 Node

把 `scripts/assemble.py` 移植为 `scripts/assemble.mjs`，**功能完全等价**，理由是让 Cloudflare 的构建环境只需要 Node。

- 移植后跑一次，用 `git diff` 确认生成物与 Python 版**逐字节一致**（这是验收标准，不是建议）。
- `package.json` 脚本改为：
  ```json
  "assemble": "node scripts/assemble.mjs",
  "docs:build": "npm run assemble && vitepress build docs"
  ```
- 确认无误后删除 `scripts/assemble.py`。
- 加 `.nvmrc`（Node 20 或以上）。

脚本要保留的行为：拆章成页、跳过"部"标题、把 `**关键领悟**：`／`**试一试**：`／`**认脸卡**：`／`**出事时想起我**：` 四种段落转成 VitePress 容器、生成侧边栏、汇总术语表。

### Phase 3 · 书架首页（本阶段是重点）

把 `docs/index.md` 从 VitePress 默认 home 布局改成自定义书架页。用 VitePress 的自定义布局能力（`.vitepress/theme` 里注册一个 Vue 组件，或用 `layout: page` + 页内组件），**纯 CSS 实现 3D 书籍效果**。

**书籍数据形状**（放在一个单独的数据文件里，方便以后改）：

```js
export const books = [
  {
    id: '01',
    title: '看懂地图',
    subtitle: '软件世界长什么样',
    stars: 1,                       // 难度 ★
    status: 'done',                 // 'done' | 'planned'
    chapters: 16,
    readLink: '/guide/01/',
    pdf: null,                      // 有 PDF 时填路径，null 则不渲染下载按钮
    blurb: '请求与响应、前后端、数据库、API、服务器、DNS——先把地图看懂。'
  },
  // 02 上手工具 ★★ 12 章 · 03 读懂语言 ★★★ 10 章 · 04 深入系统 ★★★★ 10 章
  {
    id: '05',
    title: 'AI 工程心法',
    subtitle: '把人的判断和 AI 的马力装进同一套制度',
    stars: 5,
    status: 'planned',              // 书架上渲染成空槽/未装订，不可点击
    chapters: 10,
    readLink: null,
    pdf: null,
    blurb: '写作中。大纲见总纲。'
  }
]
```

**视觉要求**：

- 五本书并排成一个书架。每本书是一个 3D 对象：正面（封面）+ 书脊，有厚度。
- 实现思路：容器 `perspective`，书体 `transform-style: preserve-3d`，封面与书脊两个面用 `rotateY` + `translateZ` 拼成，页缘可以用渐变模拟。悬停时轻微 `rotateY` 让书"转过来"一点，配合投影。**参考 spell.sh 的 3D book 组件的做法（/Volumes/4TB Photos+CODE/books.stickmancharles.com/perspective-book.tsx），但用我们自己的 CSS 写，不要装它的包。**
- 封面上放：册号（等宽字体、大写字距）、书名、难度星级、章节数。整体黑白，靠边框和层次区分，不要用彩色。
- `status: 'planned'` 的第五册渲染成**空槽或未装订的稿纸**，明显区别于成书，不可点击。诚实地留一个空位。
- 每本书下方（或悬停展开）显示：一句话简介 + 「在线阅读」按钮 +（`pdf` 非 null 时）「下载 PDF」按钮。
- 书架下方保留首页现有的那段"这套书是怎么来的"文字与献词引用，**一字不改**。

**必须保留**：右上角搜索、主题切换、以及通往 开始／指南／速查／项目／术语表／路线图 的导航。

### Phase 4 · 双许可证

1. 仓库根目录：
   - `LICENSE` —— MIT，适用于**书中所有代码**（`scripts/`、`docs/.vitepress/`、书中所有代码片段）
   - `LICENSE-CONTENT.md` —— CC BY-NC-ND 4.0 全文，适用于**散文内容和网站源码**（`books/` 与由它生成的一切、`docs/reference/`、`docs/start/`、`docs/projects/`）
2. 新增页面 `docs/license.md`，用人话说清这个分割，包含：
   - 哪部分是 CC BY-NC-ND 4.0，哪部分是 MIT，为什么这么分（代码存在的意义就是被复制和修改，ND 用在代码上是错的）
   - 署名格式：`Charles Tao，《AI 时代的编程指南》，books.stickmancharles.com`
   - 一句话：**翻译请来信，通常会同意**（ND 默认禁止改编，但我不想把翻译这条路堵死）
3. 页脚加一个指向 `/license` 的链接。**页脚现有的献词文案一字不改。**

### Phase 5 · PDF 发行管线（可降级）

**架构决定：PDF 是发行物，不是构建产物。**本地生成、提交进仓库、CI 永不构建 PDF。三个理由：中文字体嵌入在本地机器上最省事；保持 Cloudflare 构建又快又纯；PDF 将来要做链上存证，必须是我主动冻结的版本，不能每次 push 都变。

1. 写 `scripts/make-pdf.mjs`，由我手动运行（`npm run pdf`），从 `books/` 生成每册 PDF。
   - 中文字体必须正确嵌入，先用一册验证再批量。
   - 输出到 `docs/public/pdf/`，**文件名带版本号**，例如 `AI时代的编程指南-01-看懂地图-v1.1.pdf`（哈希与版本要一一对应，为后续存证做准备）。
2. 生成后把对应书的 `pdf` 字段填上，书架自动出现下载按钮。
3. **降级规则**：如果 CJK 字体嵌入短时间搞不定，**不要硬扛，也不要放占位按钮**——`pdf` 保持 `null`，按钮不渲染，先上线。把遇到的具体障碍写清楚告诉我。

---

## 5. 部署（Cloudflare）

- 这是**纯静态站**（无后端逻辑）。请先查 Cloudflare 官方最新文档，在 **Workers with static assets**（新项目的推荐路径）与 **Pages**（零配置 git-push）之间选一个并告诉我理由，我确认后再配。
- 构建命令 `npm run docs:build`，输出目录 `docs/.vitepress/dist`。
- Node 版本通过 `.nvmrc` 或环境变量指定。
- 加 `docs/public/_headers`，配上基本安全响应头（两个平台都原生支持这个文件）。
- 自定义域 `books.stickmancharles.com`。DNS 已经在 Cloudflare 上，不需要我去别处改记录。
- **红线：不要替我执行任何会产生费用或改动线上 DNS 的操作。**配置文件你写，控制台我自己点。

---

## 6. 验收清单

逐条勾掉再交付：

- [ ] `npm run docs:build` 通过，无报错、无死链（VitePress 构建会校验内链）
- [ ] Node 版装配脚本的生成物与原 Python 版逐字节一致
- [ ] 全库无残留的 `docs.stickmancharles.com`；除第二册教学内容外无残留的 Vercel 描述
- [ ] 书架首页：深浅双主题都正常；悬停动画顺滑；第五册明显是空槽且不可点击
- [ ] 移动端书架降级为平铺，无横向滚动
- [ ] `prefers-reduced-motion` 开启时无 3D 动画
- [ ] 键盘可达：Tab 能走到每本书的「在线阅读」，focus 有可见轮廓
- [ ] 首页献词与页脚献词一字未改
- [ ] `/license` 页存在，两份 LICENSE 文件就位
- [ ] 阅读页（`/guide/01/ch01` 等）观感与改组前一致，没有被书架样式污染

---

## 7. 明确不要做的事

- 不要动 `books/` 里的任何文字
- 不要手改任何生成物（`docs/guide/**`、`sidebar-books.ts`、`glossary.md`）
- 不要引入 React、组件库
- 不要为了"看起来完整"新增任何页面或导航项
- 不要在 CI 里生成 PDF
- 不要执行任何花钱的、动 DNS 的、或其他不可逆的操作——那些我自己来

---

## 8. 完成后请给我

1. 一份改动摘要：每个阶段做了什么、哪些文件被改动
2. 本地预览的启动方式
3. Cloudflare 控制台我需要手动填的每一项配置（逐字给出，我照抄）
4. 你在过程中做过的、本任务书没明确规定的判断——列出来让我复核
