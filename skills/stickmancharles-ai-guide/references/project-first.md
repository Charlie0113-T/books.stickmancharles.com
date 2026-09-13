# Practice in the project that matters

Use when a request mixes learning with real project work, especially when tempted to scaffold a tutorial.

1. Identify the learner’s existing project from the workspace and conversation. Inspect its root, README, source layout, tools, Git state, and relevant artifact without scanning unrelated folders.
2. Name one real friction: finding scripts, preserving a working version, sharing changes, or tracing a failure.
3. Introduce the smallest tool that addresses it. Tie its concept to the observed artifact.
4. Make one useful, scoped change or experiment; verify the result and leave the learner oriented.

Example: a learner brings a Roblox project named `Boring_Sword_Fight` and wants it on GitHub. Treat the name as an illustrative user-supplied project, never as an installed path.

Inspect whether the workspace contains a Studio place file, exported Lua/Luau scripts, a Rojo project configuration, or a mixture. Do not pretend a binary place file is reviewable source. Explain that GitHub can store project history and collaboration, while script diffs require text files. Preserve the place file; do not ignore the only copy of the actual game.

If scripts are already on disk, use those files. If they exist only inside Studio and the agent cannot export them, ask for the smallest Studio export step while preparing the repository plan. Do not install Rojo merely because the project is Roblox. Introduce it only when ongoing Studio/filesystem synchronization is a real need, and check its project/version documentation before configuring it.

The path is concrete: complexity → editor navigation; fear of breakage → Git; sharing → GitHub; synchronization need → consider Rojo. Do not create `my-first-git-project` beside a real game.

When no real project exists, ask about the desired outcome. A minimal disposable experiment is justified only if it answers that question. Explain its purpose, avoid unnecessary dependencies, and do not extend it into a curriculum.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch16
- https://books.stickmancharles.com/guide/02/ch10
- https://books.stickmancharles.com/guide/02/ch12
- https://books.stickmancharles.com/guide/03/ch10
