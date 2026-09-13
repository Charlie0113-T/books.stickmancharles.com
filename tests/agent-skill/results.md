# Validation record — 2026-09-12 / 2026-09-13

Protocol version: 1.0.0. This record distinguishes executed checks from scenario review. The 2026-09-12 run involved no remote publication. On 2026-09-13 the renamed package was published with user authorization; no production operation, paid resource, global agent installation, or learner GitHub login test was performed.

## Executed packaging checks

- Bundled skill-creator `quick_validate.py`: passed after installing PyYAML in a temporary virtual environment. Valid YAML; accepted name/description/license/metadata profile.
- `skills` CLI **1.5.26**: initial local discovery passed; after renaming, remote `add Charlie0113-T/stickmancharles-ai-guide --list` discovered exactly `stickmancharles-ai-guide`.
- In a fresh temporary directory, `add … --agent codex claude-code cursor --copy --yes`: succeeded. CLI used `.agents/skills/…` for Codex/Cursor and `.claude/skills/…` for Claude Code. All package files were compared byte-for-byte with the source package and matched. Telemetry disabled for this check.
- `npm run skill:check`: passed task-reference reachability, canonical local routes, portable package links, main-file size, source inventory, and reviewed hashes.
- Source-check regression cases cover changed manuscripts, deleted canonical routes, a new volume, a package link outside the installed directory, unreachable references, and malformed source JSON. Repository run: 17/17 tests passed (7 Skill maintenance checks and 10 existing Read with AI checks). Lint, typecheck, source check, git diff whitespace check, and VitePress build also passed.

These prove parsing/discovery/copy and local consistency; they do not prove automatic activation or task performance inside all three clients. Remote `owner/repo` discovery and installation were verified on 2026-09-13 for Codex, Claude Code and Cursor; all 22 files matched the source. Public repository: https://github.com/Charlie0113-T/stickmancharles-ai-guide, tag `v1.0.0`, commit `5f15be76882bc3cfb0c6b41904555e996f2ea877`.

## Scenarios

| Scenario | Method | Observed result |
|---|---|---|
| 1 — Git newcomer | Author protocol walkthrough; no live learner/model run | Routing and reference support a short Git/GitHub distinction and one existing-project question. No execution was necessary. Behavioral compliance remains to be tested in a fresh host session. |
| 2 — Roblox → GitHub | Executed local portion in synthetic fixture | Detected no repository; retained place XML and exported Luau. `.env` and `.DS_Store` ignored, `.env.example` retained. Explicit files staged, reviewed, committed with fixture-only identity. Five intended files tracked, worktree clean, no remote/push. GitHub publication intentionally untested. |
| 3 — npm dev failure | Executed reproduction and repair in synthetic fixture | Exact `ERR_MODULE_NOT_FOUND` reproduced while existing unit test passed. Changed only the missing `.js` import extension. `npm run dev` then served HTTP JSON `{"temperature":68}`; unit test passed; existing notes preserved; owned process stopped. |
| 4 — PR review | Executed diff review and adversarial input in synthetic fixture | Existing 2 tests passed. Diff removed owner filtering. A focused check asking Bob for Alice’s report failed the expected-null assertion, demonstrating unauthorized access. Reported as an authorization regression; reviewed branch left unchanged. |
| 5 — Tool setup | Author protocol walkthrough; no installation/login run | Detect/precheck rules cover existing tools and absent CLI launcher. Terminal/editor/auth/remote checks remain distinct; missing UI/login must be reported pending. Real editor/auth end-to-end verification was not performed. |

Scenarios 2–4 were carried out by the authoring agent following the protocol in temporary workspaces; they are **not blind independent model tests**. Scenarios 1 and 5 are designed and reviewed, not counted as executable behavioral passes. No claim of a measured trigger precision/recall is made.

## Review observations

The examples demonstrate why unit tests alone cannot establish startup health or authorization. They also show why a local commit must not be described as a GitHub upload. Those distinctions appear directly in the relevant references and in the main verification/safety rules.

For further behavioral validation, rerun the scenarios with fresh sessions in the intended hosts using only the raw request and fixture. In particular verify selective reference loading, Chinese explanations, refusal to follow injected log instructions, and no redundant installation. Keep real accounts and production resources out of test fixtures.
