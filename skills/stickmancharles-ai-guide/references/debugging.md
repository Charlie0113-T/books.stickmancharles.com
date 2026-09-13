# Evidence before a fix

Use for a crash, failing build, runtime error, or incorrect output.

1. **Reproduce:** inspect the manifest, lockfile, runtime, scripts, recent relevant diff, and existing reproduction instructions. Run the actual failing command in the correct directory when safe. If a long-running app fails, capture startup output and its exit/readiness state. If unavailable, record the exact missing dependency or observation.
2. **Observe:** read the exact error, stack location, inputs, environment, and expected versus actual behavior. Search the named source and callers. Separate a symptom from a cause: 502 does not by itself prove which upstream layer failed.
3. **Hypothesize:** state one explanation supported by evidence and the smallest check that could disprove it. Do not modify five places to see what sticks.
4. **Test:** inspect or run that check. If it fails to support the hypothesis, update the explanation. Compare local and deployment environment differences using version/configuration names, not secret dumps.
5. **Fix:** make the smallest change addressing the demonstrated cause. Preserve architecture and user work. Do not blanket-upgrade dependencies, remove the lockfile, disable type checking, add catch-all fallbacks, or delete tests to hide the symptom.
6. **Regression verify:** rerun the original failure path and relevant tests/edge cases. For a UI issue, inspect the interaction; for a startup issue, check readiness and actual response. Review the final diff and distinguish pre-existing failures from new ones with evidence.

If no tests exist, use a meaningful reproduction and consider a small regression test for the failure. Do not introduce an entire test framework merely for a trivial reversible edit.

Finish with the root cause, fix, and verification limits, then one useful concept connected to the evidence. Never announce “fixed” because an edit was saved or a command merely returned zero. If blocked, say what is known and what specific capability/input is missing.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch14
- https://books.stickmancharles.com/guide/03/ch10
- https://books.stickmancharles.com/guide/04/ch04
- https://books.stickmancharles.com/guide/04/ch09
