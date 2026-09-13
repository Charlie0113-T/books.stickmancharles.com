# DETECT → PRECHECK → CHANGE → VERIFY → HANDOFF

Use for Git, VS Code, runtimes, authentication, or project environment setup. Setup succeeds only when the intended workflow works.

**Detect:** establish OS, shell, local/container/remote context and project root. Inspect declared runtime versions, manifests, lockfiles and existing tool installations. Use platform-appropriate lookup such as `command -v git` or `Get-Command git`, then version checks. A missing `code` command does not prove VS Code is absent. Inspect app availability through supported tools.

**Precheck:** identify the actual gap: missing tool, wrong version, PATH mismatch, wrong working directory, absent dependencies, or missing authentication. Inspect project instructions and package scripts before installation. Prefer the existing package/version manager and repository conventions. Do not install Node and Python both unless this project needs both. Resolve conflicting lockfiles from repository evidence rather than deleting one.

**Change:** explain each necessary install/configuration change. Use verified official instructions for this OS and version if needed. Prefer project-scoped configuration; avoid changing global Git identity, shell profiles, default runtime, or editor settings unnecessarily. Administrator changes require explicit authorization. Do not run a downloaded shell script blindly. Leave login credentials and permission consent to the user through the normal trusted authentication UI; never ask for tokens in chat.

**Verify:** recheck resolved executable and version, then a real project command. For Git/VS Code/GitHub, verify these separately: terminal Git; editor recognizing the actual repository; correct account/authentication; intended remote access. CLI authentication alone does not prove the editor is configured. Use supported UI inspection when available; otherwise mark that check pending and request one concrete user observation. Do not print credential output or perform a test push to prove login.

**Handoff:** state what now works, what remains pending, and the next useful action in this project. A first commit is appropriate when authorized; creating a remote, choosing its visibility, or publishing private files is a separate decision.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/02/ch01
- https://books.stickmancharles.com/guide/02/ch04
- https://books.stickmancharles.com/guide/02/ch06
- https://books.stickmancharles.com/guide/02/ch10
