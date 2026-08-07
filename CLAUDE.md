# books.stickmancharles.com

Stickman Charles 的书架——存放我写的每一本书。现在架上：《AI 时代的编程指南》，五册阶梯 + 速查 + 真实项目。

- **设计规格**：主站仓库（Charlie0113-T.github.io）的 `DESIGN.md`——Personal OS 设计系统。本站把它的 token 映射进 `docs/.vitepress/theme/custom.css`。

- **单一真相源**：书稿在 `books/`，站点章节由 `scripts/assemble.mjs` 生成。改书 → `npm run assemble` → 站点更新。永远不手改 `docs/guide/` 下的生成文件。
- **章节配图**：线稿 SVG 在 `figures/<册>/<页>.svg`，装配时内联到章标题之后。只上网站，不进 `books/`，所以 PDF 不受影响。样式在 `custom.css` 的「章节配图」一节，规范见 `figures/README.md`。
- 本地：`npm install && npm run docs:dev`
- 构建：`npm run docs:build`（输出 `docs/.vitepress/dist`，构建会校验全部内链）
- 部署：GitHub → Cloudflare Workers（static assets）→ 自定义域名 `books.stickmancharles.com`。控制台 Deploy command 填 `npm run deploy`（该命令自带构建，Build command 可留空）
- 许可：正文与网站源码 CC BY-NC-ND 4.0（`LICENSE-CONTENT.md`），书中代码段 MIT（`LICENSE`），说明见站点 `/license`

由 Charles Tao 与 Claude 协作完成。献给 Roy。
