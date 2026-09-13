# VS Code around a real need

Use when the learner uses VS Code or needs help connecting the editor to their project. Do not introduce the editor during every task.

Confirm the correct workspace first. A file open in a tab does not establish the project root, and the integrated terminal can be in another directory. In remote/WSL/container development, determine where Git, extensions, and the runtime actually execute.

| Need | Relevant surface | Check the effect |
|---|---|---|
| Locate a file | Explorer or quick open | File belongs to this project |
| Find a symbol or message | Search | Inspect the caller and matching source |
| Understand pending edits | Source Control | Compare working and staged diffs |
| Run the project | Integrated Terminal | Correct directory, command, actual output |
| Understand an error | Problems or debugger | Exact diagnostic and source location |
| Add a missing capability | Extensions | Correct publisher and required feature |
| Work with an agent | AI side panel | Same workspace and reviewed resulting changes |

Use available editor/UI tools to inspect and act. Do not claim to have clicked, opened, installed, or verified a panel without evidence. Terminal operations can complete the underlying Git task, but cannot prove the editor UI sees it.

For a first Git operation, the graphical interface can be a helpful teaching surface. Explain how its action maps to the same repository state the agent inspects. Do not force the learner to use CLI syntax or learn every panel at once. If they prefer to click Commit, let them; otherwise the agent can perform an authorized commit.

Recommend or install only extensions needed for an observed gap. Preserve existing settings and workspace conventions. If labels or shortcuts vary by platform/version, inspect the current UI or official documentation instead of inventing them.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/02/ch01
- https://books.stickmancharles.com/guide/02/ch02
- https://books.stickmancharles.com/guide/02/ch05
