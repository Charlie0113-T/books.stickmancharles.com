# books.stickmancharles.com

Stickman Charles 的书架——《AI 时代的编程指南》的官方站点。五册阶梯 + 速查 + 真实项目。

- **单一真相源**：书稿在 `books/`，站点章节由 `scripts/assemble.mjs` 生成。改书 → `npm run assemble` → 站点更新。永远不手改 `docs/guide/` 下的生成文件。
- 本地：`npm install && npm run docs:dev`
- 构建：`npm run docs:build`（输出 `docs/.vitepress/dist`，构建会校验全部内链）
- 部署：GitHub → Cloudflare Workers（static assets）→ 自定义域名 `books.stickmancharles.com`
- 许可：正文与网站源码 CC BY-NC-ND 4.0（`LICENSE-CONTENT.md`），书中代码段 MIT（`LICENSE`），说明见站点 `/license`

由 Charles Tao 与 Claude 协作完成。献给 Roy。
