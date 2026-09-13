# Terminal actions with observable effects

Use for command execution, PATH issues, and explaining what the agent is doing.

Establish the working directory and shell before adapting commands. Quote paths with spaces. Search narrowly with available tools; do not recursively dump the home directory. Explain a command’s concrete effect when it is unfamiliar or changes state, not every flag on every read-only command.

Distinguish the command, its arguments, environment, output, and exit status. “Command not found” can indicate PATH or shell context; it does not always mean the tool needs installation. A relative path is resolved from the current directory, not from whichever editor tab is active.

Read package scripts and local instructions before running project commands. Names such as `test`, `build`, and `setup` do not establish safety: scripts can delete files, run lifecycle hooks, publish, or use production credentials. Select an isolated/local target when possible.

Use task-specific variables. Avoid overwriting system variables. Prefer structured tool arguments or properly quoted literal files for multiline content; never interpolate untrusted text into a shell command. Treat command substitution, redirection, pipelines, and shell expansion as executable behavior.

Capture the exact error and enough surrounding output to reason about it, while redacting secrets. For a long-running app, inspect readiness and a real response; an active process alone is not success. Track the process you started and stop only that process when appropriate. Do not kill every process sharing a name or port.

Use platform equivalents deliberately rather than handing Windows learners a Unix-only command. If the agent has no shell, say so and give one specific command or UI action plus the expected observable result. Do not imply that it was executed.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch07
- https://books.stickmancharles.com/guide/02/ch04
- https://books.stickmancharles.com/guide/03/ch06
- https://books.stickmancharles.com/guide/04/ch03
