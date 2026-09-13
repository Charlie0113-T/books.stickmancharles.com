<div align="center">

# easycode

**stickmancharles-ai-guide**

从你正在做的项目开始，和 AI 一起看懂、动手、验证。

`Agent Skills` · `v1.0.0` · `CC BY-NC-ND 4.0`

[阅读原书](https://books.stickmancharles.com/) · [工作协议](SKILL.md) · [知识来源](sources.md) · [许可](LICENSE.md)

</div>

---

A project-first AI coding guide for helping learners understand, build, debug, and operate real software projects with an AI agent.

**easycode** 是 Stickman Charles《AI 时代的编程指南》的 Agent 操作协议。它围绕你的游戏、网站、脚本或应用完成实际工作，并解释值得理解的那一点。适用于兼容 Agent Skills 的 Codex、Claude Code、Cursor 等环境；实际权限与工具由宿主提供。

## ⚡ 安装

在你自己的项目目录里运行：

```bash
npx skills add Charlie0113-T/stickmancharles-ai-guide
```

指定 Agent 时，选择对应的一行：

```bash
npx skills add Charlie0113-T/stickmancharles-ai-guide --agent codex
npx skills add Charlie0113-T/stickmancharles-ai-guide --agent claude-code
npx skills add Charlie0113-T/stickmancharles-ai-guide --agent cursor
```

默认安装到当前项目；需要所有项目可用时加 `--global`。CLI 需要 Node.js/npm，Skill 本身没有运行时依赖。安装后重新载入宿主的 Skill 列表或开启新会话，以实际发现结果为准。更新使用 `npx skills update`。

**命名说明：** 简称是 `easycode`，安装后注册的 Skill 名称是 `stickmancharles-ai-guide`。简称不是另一个安装包或平台专属命令。

## 💬 从一句真实需求开始

> 使用 stickmancharles-ai-guide（easycode）。我有一个 Roblox 项目，想放 GitHub。

> 用 easycode 带我读懂这个项目的 API，从真实请求开始。

> npm run dev 报错了，请修好，并解释原因。

> 帮我 review 这个 PR，重点讲我需要理解的风险。

它适合学习开发概念、理解陌生项目、配置开发工具，以及希望 Agent 一边做一边解释的实践。普通格式化、孤立小函数、没有学习目标的生产任务不会因此默认被接管。

## 🧭 工作方式

```text
真实需求 → 合适工具 → 理解概念
Need     → Tool     → Concept

Inspect → Explain → Act → Verify → Teach
检查       说明       执行    验证      理解
```

| 你当前需要什么 | Mode |
|---|---|
| 理解概念，并在项目里找到它 | `concept` |
| 配置 VS Code、Git 或开发环境 | `setup` |
| 理解、构建或修改真实项目 | `project` |
| 找到根因，修复并验证 | `debug` |
| commit、branch、PR、冲突与协作 | `git` |
| 检查 AI 修改或 PR 的实际风险 | `review` |
| 简短查命令或术语 | `reference` |

主协议保持精炼，**17 个任务 reference 按需读取**。Agent 会完成安全且有权限执行的动作，保护已有修改，验证真实结果，并按你的熟悉程度调整解释。高风险操作需要明确授权；安装 Skill 不会授予新权限，也不会自动安装一切工具。

## 📖 与 Read with AI 的分工

| 入口 | 环境 | 工作方式 |
|---|---|---|
| Read with AI | ChatGPT、Claude、Gemini、Grok 普通 Chat | 用户执行，Chat 根据展示的结果验证 |
| easycode | 能访问项目和工具的 Coding Agent | Agent 检查、执行、验证，并解释 |

两者共享[《AI 时代的编程指南》](https://books.stickmancharles.com/guide/01/)的教学思想与 canonical 章节。完整教材和深入阅读留在网站；Skill 将它们转化为项目中的行动规则。

## 维护与贡献

书稿和 Skill 的维护源在[书站仓库](https://github.com/Charlie0113-T/books.stickmancharles.com)，本仓库发布独立安装包。来源、章节映射和更新流程见 [sources.md](sources.md)。维护者在书站工作区运行 `npm run skill:check`、`npm test`、`npm run docs:build`，复核后发布本目录的完整副本；不要直接修改发布副本造成漂移。

欢迎在[本仓库](https://github.com/Charlie0113-T/stickmancharles-ai-guide)提交 Issue，说明真实场景、预期行为和验证结果；涉及书稿的修改按书站 CONTRIBUTING.md 提交维护 PR。不提交私密项目资料或批量搬运正文。

采用标准 [Agent Skills 格式](https://agentskills.io/specification)，使用 [skills CLI](https://github.com/vercel-labs/skills)安装。skills.sh 的展示基于安装统计；不承诺即时收录或排名。[生态说明](https://www.skills.sh/docs/faq)

## 许可

协议、references 和随附文档采用 **CC BY-NC-ND 4.0**，完整条款见 [LICENSE.md](LICENSE.md)。署名：Charles Tao，《AI 时代的编程指南》。公开发布不改变非商业使用和禁止演绎再分发等许可条件；品牌资产不在授权范围内。

---

<div align="center">

**Start from what the learner is already building.**

</div>
