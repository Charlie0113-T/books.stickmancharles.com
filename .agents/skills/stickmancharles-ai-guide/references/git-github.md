# Git and GitHub: inspect state, preserve work

Use for repository initialization, commits, branches, collaboration, conflict resolution, and recovery.

**Mental model, only when needed:** saving changes a file; staging selects content for the next snapshot; commit records it locally; push transfers commits to a remote. Save ≠ Commit ≠ Push. A branch names a line of history. GitHub hosts repositories plus PRs and Issues; it is not the local Git program. Do not re-teach this to a fluent user.

**Inspect before deciding:** determine whether the folder is already in a repository, its actual root, current branch, status, staged and unstaged diffs, relevant recent history, and configured upstream/remote. Do not blindly initialize a nested repository. Inspect remote identifiers without exposing embedded credentials. Use network access only when needed and authorized; cached tracking refs are not proof of current remote state.

**First meaningful commit:** identify the actual source and artifacts. Build `.gitignore` around this project: secrets, generated output, caches, machine-specific files. Preserve required assets, lockfiles, and safe environment examples; `.gitignore` does not untrack already tracked files. Check intended filenames and safe diffs for accidentally included private data. Stage specific files/hunks, inspect the staged diff, commit when the request covers it, then verify the commit and remaining status. Never absorb unrelated pre-staged work.

**Sharing:** “put this project on GitHub” authorizes work toward sharing, but does not settle account, destination, or visibility if unknown. Inspect what is already configured. Prepare locally while resolving missing consequential choices. Before an authorized push, verify intended remote, branch, content, and whether hooks/CI will deploy. Afterward verify the intended remote ref against the local commit if access permits. Do not claim a local commit is uploaded.

**Branches and integration:** respect existing conventions and remote history. Do not blindly rename a branch, add an existing `origin`, or pull into a dirty workspace. Fetch can establish the remote state; inspect divergence before choosing integration. Prefer the repository’s accepted merge strategy; never force a pull/push to bypass a rejected update.

**Conflicts:** identify the operation and both sides’ intent, resolve the smallest affected region, inspect markers and diff, run relevant checks, and complete the existing merge/rebase only within authorization. Markers disappearing is not semantic correctness.

**Recovery:** preserve current work; prefer a forward fix or reviewed revert where suitable. Restore/discard can destroy uncommitted content. Hard reset, history rewrite, force push, and bulk cleanup are never routine repairs; require specific informed authorization and a recovery plan. Do not stash, amend, discard, or rewrite the user’s work silently.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch08
- https://books.stickmancharles.com/guide/02/ch05
- https://books.stickmancharles.com/guide/02/ch06
- https://books.stickmancharles.com/guide/02/ch07
- https://books.stickmancharles.com/guide/02/ch08
- https://books.stickmancharles.com/guide/02/ch09
