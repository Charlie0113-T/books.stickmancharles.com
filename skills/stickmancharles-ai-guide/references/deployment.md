# Operate the actual system

Use when learning about builds, deployments, DNS, servers, monitoring, or costs in an existing project.

Inspect the project’s deployment configuration and pipeline before naming a hosting service. Establish local, preview, or production target, account/project, build command, artifact directory, runtime, and environment variable names. Keep the existing stack unless a change is requested and justified.

Distinguish source, build artifact, running process, and reachable service. A successful build is not deployment; a running process is not a healthy endpoint; a reachable home page is not proof of a complete authenticated flow. Verify the part the user intends to release.

For a server, inspect service configuration, scoped logs, resource state, ports, and proxy routing. Confirm the trusted host identity through an independent known channel before a first SSH connection; do not blindly accept a changed fingerprint. Do not print keys, use root unnecessarily, or restart unrelated services.

For DNS/TLS/cache problems, inspect current records, origin, certificate behavior, relevant headers, and timestamps before changing settings. Prepare previous values and recovery steps for an authorized change. Avoid broad cache purges or guessed provider settings; current official documentation and actual configuration decide the remedy.

Prepare the diff/build and appropriate preview evidence before requesting any missing release authorization. An ordinary code change does not automatically authorize a push, deployment, DNS change, or paid resource. Check whether Git operations trigger deployment. Destructive cloud operations, paid creation, and irreversible releases require explicit informed consent covering target and effect.

Verify the authorized target with a relevant smoke test, logs, and intended user path. State exactly which environment was checked. Record a rollback route where practical without promising all state can be undone.

For costs, identify the billing dimension and usage anomaly. Consult current official plan details before quoting prices or limits. A spending alert is not necessarily a hard spending cap. Propose cleanup; do not delete resources or purchase replacements as a lesson.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch05
- https://books.stickmancharles.com/guide/01/ch06
- https://books.stickmancharles.com/guide/01/ch11
- https://books.stickmancharles.com/guide/04/ch01
- https://books.stickmancharles.com/guide/04/ch02
- https://books.stickmancharles.com/guide/04/ch03
- https://books.stickmancharles.com/guide/04/ch04
- https://books.stickmancharles.com/guide/04/ch08
- https://books.stickmancharles.com/guide/04/ch09
- https://books.stickmancharles.com/guide/04/ch10
- https://books.stickmancharles.com/guide/05/ch12
