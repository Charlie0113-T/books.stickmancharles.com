# Sources and maintenance

Maintainer-only document. Agents do not need to load it during learner tasks.

The maintenance source is `skills/stickmancharles-ai-guide/` in the books.stickmancharles.com repository. The public distribution is https://github.com/Charlie0113-T/stickmancharles-ai-guide, whose root contains the complete skill package. Publish reviewed copies from the maintenance source; do not independently edit the distribution. `easycode` is the short name, not a second skill ID.

The canonical publication is https://books.stickmancharles.com/. Manuscripts in the source repository’s `books/` directory are authoritative; `docs/guide/` is assembled output. Local audit: 2026-09-12. One guide series, five published volumes, 62 numbered chapters, 26 quick references and three project pages. The archived `00-总纲` is an outline, not a sixth volume. Its historical version table and the “four books at launch” project history are not current inventory.

The protocol is an author-requested editorial adaptation: start with real projects, act through agent tools, verify evidence, teach at the current level. Its workflow and risk taxonomy are not attributed as verbatim statements in individual chapters.

## Source → task mapping

| Source volume | Chapters adapted | Agent references |
|---|---|---|
| 01 看懂地图, v1.2, 16 chapters | System roles; terminal/Git; secrets/dependencies; AI collaboration; verification; learning and redlines | philosophy, learning-map, project-first, terminal, git-github, frontend-backend, api, database, debugging, testing, deployment, ai-coding, safety, glossary |
| 02 上手工具, v1.1, 12 chapters | Editor, terminal, Git/GitHub/PR/recovery, repository orientation, project rules and first project | learning-map, project-first, setup, vscode, terminal, git-github, reading-code, ai-coding, safety, glossary |
| 03 读懂语言, v1.1, 10 chapters | Read roles before syntax; HTML/CSS/JS/TS; configuration, SQL and real-code reading | project-first, terminal, reading-code, frontend-backend, database, debugging, glossary |
| 04 深入系统, v1.1, 10 chapters | DNS, SSH/services, data models/RLS, API contracts, performance, logs and costs | terminal, api, database, debugging, deployment, safety, glossary |
| 05 跟 AI 搭档, v1.1, 14 chapters | AI uncertainty/context; requirements/rules; tests/CI; injection; selection; irreversible work and shipping | philosophy, learning-map, testing, deployment, ai-coding, safety, glossary |

Every task reference links the exact canonical chapter routes it draws on. `sources.lock.json` records the reviewed manuscript bytes and affected reference filenames. It also watches the Read with AI packet builder/metadata and the repository content license for changes that may affect integration or distribution. It contains no manuscript body.

## What remains on the website

Full explanations, chapter sequence, exercises, syntax examples, illustrations, PDFs, dedications, personal stories, specific product walkthroughs, and deeper model/RAG theory remain canonical website content. The 26 quick-reference pages already route back to chapters; duplicating those thin cards would add another copy. The glossary here keeps only task-critical distinctions. No personal local paths, keys, infrastructure identifiers, or brand SVGs belong in the core protocol.

Where a book exercise creates a playground/hello-web, the skill instead inspects the learner’s real project. Where a book asks the reader to run commands or paste errors, the agent does so itself when safe. “Pull first,” “restore a file,” and the first-push command trio become state-dependent Git decisions, not unconditional automation. Vendor-specific advice is contextual knowledge, not a command template to execute blindly. Source text stays unchanged.

## Update procedure

1. Edit the manuscript in `books/` and run `npm run assemble` in the source repository. For new books, update the existing assembler/catalog normally.
2. Run `npm run skill:check`. A changed hash, new volume, missing route, missing reference, or broken package link fails with an actionable message. This detects drift, not semantic correctness.
3. Review the changed source and the listed affected references. Update only the protocol knowledge that changes agent decisions. Preserve canonical links; never generate references by copying chapters.
4. After editorial review, update the relevant `sha256` entries in `sources.lock.json` with SHA-256 of the exact source bytes, and its `reviewedAt` date. Add new source/mapping entries when appropriate. Do not refresh hashes merely to silence the check. No auto-sync/generator is provided.
5. Rerun structural/source checks, specification validation, and the relevant scenarios in the source repository’s `tests/agent-skill/`. Run the site build for canonical route validation. Bump `metadata.version` when shipping changed behavior; record material changes in the release description.
6. Publish a reviewed copy of this package directory to the distribution repository under normal repository authorization. Validate remote discovery/install from a clean project before advertising availability. CLI update/discovery is not proof of behavioral correctness on every host.

If a new book adds a distinct need, add one focused task reference and one direct link from SKILL.md. If it adds knowledge for an existing task, extend that reference. Split this into another Skill only if its trigger becomes a separate user need; do not widen the current description to every coding task.

## Read with AI handoff

Keep website chapter assets and chat packets generated from the manuscripts. Do not embed SKILL.md or all references into each packet. The website’s current Agent Skill placeholder can later link to this package’s public README/install instructions after remote installation is verified. At that point set the existing `AGENT_SKILL` publication metadata in `docs/.vitepress/lib/read-with-ai/providers.ts` to the verified URL.

A future handoff can carry only chapter URL, user goal, selected mode, and a redacted observation. The agent must re-inspect the actual workspace and permissions; a chat transcript cannot establish current Git state or authorize a production action. Keep ordinary-chat “user executes” instructions distinct from the installed agent protocol. Never auto-run an installation command from a webpage.
