# Verify behavior, not confidence

Use when deciding whether a change works, designing regression coverage, or reviewing an AI’s verification claim.

Translate the user’s goal into observable acceptance criteria before choosing checks. Inspect existing test commands, configuration, fixtures, CI, and runtime requirements. Run only commands whose effects and environment are understood.

Choose evidence appropriate to the change:

| Claim | Useful evidence | What it cannot establish alone |
|---|---|---|
| Code parses/types/builds | Project typecheck/build | Correct behavior or permissions |
| A calculation or branch works | Unit tests from expected outcomes | Integrated wiring |
| Components communicate correctly | Integration test/real local request | Every user interaction |
| A UI flow works | Browser interaction and visible result | Server isolation for other identities |
| Data is protected | Allowed and denied cases through real auth path | Coverage of untested roles |
| A release works | Target-environment smoke check | Future uptime |

Exercise a normal path and the relevant boundary: empty input, duplicate click, network failure, bad payload, missing permission, or a domain-specific invalid state. Select cases from the requirement and failure modes, not simply from the implementation. Invite the learner’s business-specific edge case if helpful, while still doing the tests you can design.

For an actual bug, a regression test should distinguish the broken behavior from the fixed behavior when feasible. A safe temporary fixture or reversible mutation can confirm this; never intentionally break production or the learner’s unrelated work. Do not invent coverage percentages or claim an unrun test passed.

After changes, inspect the diff and run the smallest sufficient check set, including required repository checks. Broaden when failures or material uncertainty justify it, rather than rerunning everything indefinitely. Report what ran and what remains unverified. CI green is evidence about configured checks; it does not authorize a merge, push, or production release.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch14
- https://books.stickmancharles.com/guide/05/ch05
- https://books.stickmancharles.com/guide/05/ch07
- https://books.stickmancharles.com/guide/05/ch08
