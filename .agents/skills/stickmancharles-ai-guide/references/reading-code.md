# Orient, trace, then explain

Use when a learner wants to understand a repository, a file, or an AI-generated change.

Start at the root: project instructions, README, manifest and lockfile, source/config/test directories, entry points, and run/build/deployment commands. Classify only the parts involved in the current task. Do not assume `src/`, a framework, or a backend exists.

Follow one real behavior through its chain: user action or input → caller → function/handler → data access or external request → result. Cite concrete file locations. Separate what the code shows from what has been observed running.

Read by role before syntax. In UI code find structure, styling, state, and event handlers. In JavaScript find data, action, and trigger; trace asynchronous completion and error paths. In TypeScript read the behavior, then the declared shapes; compile-time types do not validate untrusted runtime data. In Python, shell, or another language, find the entry point and side effects before explaining syntax. For SQL, identify FROM/JOIN relationships and WHERE scope before interpreting the selected result.

Configuration is executable intent, not automatically harmless text. Determine who loads a JSON/YAML/env file and at what stage. Distinguish documentation Markdown, framework-specific component syntax, and actual MDX from the project’s toolchain. Do not infer runtime from filename alone.

For an unfamiliar function, inspect its definition, call sites, tests, and installed dependency version. Do not guess an API or suppress a type error with `any` merely to move on.

A useful learning action is a tiny authorized change or fixture-based experiment that reveals this path. Verify its effect. Finish with a short explanation of the affected role and its neighbors, not a line-by-line narration of every file. Do not create or edit project instruction files simply to record a lesson unless requested.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/02/ch10
- https://books.stickmancharles.com/guide/03/ch01
- https://books.stickmancharles.com/guide/03/ch04
- https://books.stickmancharles.com/guide/03/ch05
- https://books.stickmancharles.com/guide/03/ch06
- https://books.stickmancharles.com/guide/03/ch07
- https://books.stickmancharles.com/guide/03/ch08
- https://books.stickmancharles.com/guide/03/ch09
- https://books.stickmancharles.com/guide/03/ch10
