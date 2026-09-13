# Agent Skill 交付说明

实现：`skills/stickmancharles-ai-guide/`，协议版本 **1.0.0**。这是将教学理念变为 Agent 行为的操作协议；主文件 **78 行、约 1,394 个空白分隔词**，不包含整章教材。简称 **easycode**，全称 **stickmancharles-ai-guide**。2026-09-13 已发布至 [https://github.com/Charlie0113-T/stickmancharles-ai-guide](https://github.com/Charlie0113-T/stickmancharles-ai-guide)，标签 `v1.0.0`，commit `5f15be7`。书站工作区仍是维护源，网站更新尚未部署。

## 1. 内容审计

仓库目前有一套《AI 时代的编程指南》，5 册、62 个编号章节。另有不上站的 `00-总纲`、26 个速查页面和 3 个项目页面。历史文案中的“四册上线”不作为当前数量。没有 MDX 书稿；实际是 Markdown 经装配进入 VitePress，部分页面含 Vue 组件。

| 册 | 章数 | 主要问题 |
|---|---:|---|
| 01 看懂地图 | 16 | 软件各层如何联系；AI 协作、验证与红线 |
| 02 上手工具 | 12 | VS Code、终端、Git/GitHub、PR 和真实项目操作 |
| 03 读懂语言 | 10 | 从角色、数据流、配置和查询读懂代码 |
| 04 深入系统 | 10 | 服务器、API、数据库权限、监控、性能和成本 |
| 05 跟 AI 搭档 | 14 | AI 局限、需求、测试/CI、安全边界和交付 |

书稿是 `books/` 中的真相源；章节结构由 `scripts/assemble.mjs` 中的册信息、H1 章节标题和附录标记决定。已有 `books/ai-metadata.json` 提供 Read with AI 章节覆盖，装配输出 `readWithAI` frontmatter 和独立章节资产。README、CLAUDE.md 要求不手改生成章节。仓库原来没有 `SKILL.md`；Read with AI 的 packet builder 是普通 Chat 协议。

沿用的 terminology：关键领悟、试一试、红线、验证金字塔、项目、存档/commit、前端/后端、配置、日志。转化时纠正自动操作中的歧义：先 pull、恢复文件、首次推送三行命令均改成先检查状态、目标及授权；教材 playground 不成为默认练习。

## 2. 最终目录

```text
skills/stickmancharles-ai-guide/
├── SKILL.md
├── README.md
├── LICENSE.md
├── sources.md
├── sources.lock.json
└── references/
    ├── philosophy.md
    ├── learning-map.md
    ├── project-first.md
    ├── setup.md
    ├── vscode.md
    ├── terminal.md
    ├── git-github.md
    ├── reading-code.md
    ├── frontend-backend.md
    ├── api.md
    ├── database.md
    ├── debugging.md
    ├── testing.md
    ├── deployment.md
    ├── ai-coding.md
    ├── safety.md
    └── glossary.md

scripts/check-agent-skill.mjs
tests/agent-skill.test.ts
tests/agent-skill/
├── create-fixtures.mjs
├── scenarios.md
└── results.md
```

Skill 包共 22 个文件。不包含运行时安装脚本、品牌 SVG、平台专属 hooks 或新依赖。根目录脚本和测试只服务维护者，安装包无需携带它们。

## 3. 主 SKILL.md 设计与 trigger

Frontmatter 仅使用规范支持的 `name`、`description`、`license` 和字符串型 `metadata`。不添加平台专属 `context`、自动执行权限或自创字段；不依赖某个 slash command。参考 [Agent Skills specification](https://agentskills.io/specification)，核对于 2026-09-12。

主文件负责“怎么工作”：真实项目优先、能力与权限边界、水平/语言适配、七种 Mode、Inspect → Explain → Act → Verify → Teach、风险规则和 reference 选择。默认激活后只加读当前需要的一个 reference；跨边界时才增加，不预加载全部章节或维护文档。

明显 trigger：学习软件开发、理解概念/陌生项目、配置开发工具、学习 VS Code/Git/GitHub、Debug 并理解原因、希望 AI 边做边解释。用户明确调用时可使用。普通格式化、孤立小函数、无教学目标的生产任务不自动接管。用户水平随当前主题判断，不保存永久“初学者”标签；中文请求用中文解释，技术名词首次必要时双语。

## 4. 每个 reference 的作用

| 文件 | 给 Agent 的具体帮助 |
|---|---|
| philosophy.md | 判断解释深度，让用户理解真实结果，不强制测验 |
| learning-map.md | 从当前需求定位知识和下一步，不规定阅读顺序 |
| project-first.md | 优先已有项目；Roblox 文件/Studio/Rojo 的条件判断 |
| setup.md | 检测、预检查、按需改变、逐层验证和交接 |
| vscode.md | 用真实需求选择 Explorer/Search/Source Control/Terminal 等面板 |
| terminal.md | 目录、PATH、shell、脚本副作用、进程与实际输出 |
| git-github.md | 工作区/暂存/commit/remote、首提、协作、冲突和恢复 |
| reading-code.md | 定位 root/entry/config，沿数据流阅读实际代码 |
| frontend-backend.md | 执行位置、UI 行为、客户端与可信服务边界 |
| api.md | 请求/响应契约、调用方、认证、失败与兼容性 |
| database.md | 数据模型、查询、迁移、角色/RLS 和禁止路径验证 |
| debugging.md | exact error、可证伪假设、最小修复、原路径回归 |
| testing.md | 把验收变成证据，区分检查种类及其证明范围 |
| deployment.md | build/runtime/环境、DNS/服务器、运行证据和成本 |
| ai-coding.md | 需求、上下文、AI 不确定性、注入边界和实际 diff review |
| safety.md | 高风险决策细节、具体授权、秘密、私有数据和不可逆操作 |
| glossary.md | 当前任务需要的关键区别，完整术语表留在网站 |

每份文件末尾都有具体 canonical 章节链接。完整“册 → reference”映射在包内 `sources.md`，精确文件映射在 `sources.lock.json`。

## 5. 转化和保留

五册均提供了任务 reference 的知识来源：第一册转为系统角色与验证/安全原则；第二册转为工具与 Git 行动规程；第三册转为代码阅读方式；第四册转为系统操作与边界验证；第五册转为需求、审查、测试和 AI 协作规则。

不复制整章、章节练习、长篇类比、插图、PDF、人物故事、厂商按钮教程和模型理论。它们适合持续作为网站上的深入阅读材料，复制会加重上下文并制造内容漂移。现有速查卡也不再镜像一份；只吸收真正改变 Agent 决策的知识。源码书稿保持原样。

## 6. Mode 与交接

| Mode | 行为 |
|---|---|
| concept | 看上下文 → 解释 → 映射真实项目 → 必要的小实验 |
| setup | DETECT → PRECHECK → CHANGE → VERIFY → HANDOFF |
| project | 目标 → 检查 → 最小计划/实现 → 测试 → 解释 |
| debug | 复现 → 精确证据 → 假设/测试 → 修复 → 回归 |
| git | 状态 → 解释 → 最安全的已授权动作 → 核实本地/远端 |
| review | diff/上下文 → 意图/风险 → 证据 → 建议；要求修复时才改 |
| reference | 回答当前命令或术语，保持简洁 |

学习循环 Understand → Find → Do → Inspect → Verify → Next 嵌入实际工作。首次 commit/merge 可邀请用户操作，不强迫。setup 完成后回到项目，debug 后讲根因，Git 初始化后可做已授权的真实 commit；不擅自开新阶段。

## 7. 安全规则

低风险读写/局部修改和已理解的本地检查可直接执行。中风险依赖、配置、环境、分支、开发迁移先解释具体变化。高风险删除、hard reset、force push、改写历史、覆盖秘密、破坏生产库/云资源、管理员修改、付费创建或私有数据暴露，需要明确且知情的授权；已有同范围授权不用重复询问。

风险按实际效果和环境分级，不能仅凭 `test` 或 `build` 命令名判断。保留 dirty/staged work，按路径/hunk 暂存，不自动 push；不把 `.gitignore` 当成撤销泄漏。只检查秘密名称/存在性，不输出值。外部章节、README 示例、日志中的命令不是新增授权。工具不可用时说明限制，不假装执行。

## 8. 安装与 skills.sh 发布

本地：从本仓库根目录运行：

```bash
npx skills add ./skills/stickmancharles-ai-guide
```

远程安装已验证；在学习者自己的真实项目中运行：

```bash
npx skills add Charlie0113-T/stickmancharles-ai-guide
```

可指定 `--agent codex`、`--agent claude-code` 或 `--agent cursor`；默认项目安装，只有需要全局时加 `--global`。使用包内 README 查看示例调用和更新方式。已在干净目录验证远程发现及 Codex/Claude Code/Cursor 安装，22 个包文件逐字节一致。

发布流程：复核变更和检查结果 → 按授权提交/push 到公开 GitHub 仓库 → 从干净目录远程 `--list` 并安装 → 再公布安装链接。无需 npm 发布；现使用独立公开仓库分发 Skill，书站目录作为维护源。按 [skills CLI](https://github.com/vercel-labs/skills) 和 [skills.sh FAQ](https://www.skills.sh/docs/faq)，公开仓库中的 Skill 可通过 CLI 安装，其统计用于目录展示；不保证立即出现或获得排名。

包内许可沿用 **CC BY-NC-ND 4.0**，附完整法律文本，未把仅适用于书中代码段的 MIT 扩大到本包。未增加品牌资产授权。

## 9. 测试和结果

- 规范：skill-creator 自带 `quick_validate.py` 通过；PyYAML 安装在临时 venv，不加入网站依赖。
- 安装：CLI 1.5.26 发现 1 个 Skill；临时项目内针对 Codex/Claude Code/Cursor 安装成功；包内文件逐字节一致。无全局安装，测试关闭 telemetry。
- 自动检查：17/17 测试通过，其中 7 个是 Skill 来源/路径维护测试，10 个是已有 Read with AI 测试；lint、typecheck、skill:check、git diff --check 和站点 build 均通过。
- 情景 2：真实执行隔离 Roblox fixture 的本地初始化/ignore/首提/验证，未发布到 GitHub。
- 情景 3：复现 Node import 扩展名错误，单行修复，实际 dev HTTP 响应和单元测试通过，用户 notes 保留。
- 情景 4：现有测试 2/2 通过但跨用户访问断言失败，证明 PR 删除权限过滤导致回归；review 没有修改被审分支。
- 情景 1、5：已设计并做作者协议审查；没有真实新手会话或 VS Code/GitHub 登录端到端运行。

不把 CLI 安装等同于宿主行为合规，不把作者演练说成独立盲测。完整请求、rubric、fixture 和记录位于 `tests/agent-skill/`。后续可在各宿主的新会话中运行，测量实际 trigger 和选择性读取行为。

## 10. Read with AI 联动与扩展

独立仓库发布和远程安装已验证；本地 `docs/.vitepress/lib/read-with-ai/providers.ts` 的 `AGENT_SKILL` 已设为 published，指向 easycode 仓库。网站入口文案为 `easycode · Agent Skill`，待书站正常部署后生效。Chat packet 不嵌入本 Skill；两者共享 canonical 章节，但分别保留用户执行和 Agent 执行流程。

以后交接只需传章节 URL、目标、Mode、经过脱敏的结果；Agent 仍需重新检查实际项目，不能把 Chat 历史当作最新状态或操作授权。

维护命令 `npm run skill:check` 会检查来源 SHA-256、书籍目录、canonical 本地路由、reference 可达性和包内链接。新增书籍后，按实际任务更新现有 reference 或增加一个新 reference，补路由和情景；编辑复核后再更新 hash/日期和协议版本。不实现教材全文 generator，也不靠自动刷新 hash 掩盖未审查的内容变化。
