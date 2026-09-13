# Data, queries, and authorization

Use for persistence, schema changes, SQL, and database access bugs.

Start by identifying database type, schema/migrations, query call sites, and the intended environment. Inspect configuration names without printing secrets. Use local fixtures or approved development data. A SELECT can still expose private records, invoke functions, or create significant load; keep inspection bounded.

Explain only the relevant structure: a table holds records, keys identify/relate them, constraints protect valid states, and migrations record schema changes. Read a query by its tables/joins and filter scope, then its result. Derive model changes from actual relationships; do not normalize or add indexes by reflex. Measure a slow query before changing its plan.

Separate authentication (“who is calling?”) from authorization (“which rows/actions are allowed?”). In systems with RLS, inspect enabled policies, database roles, and whether the service credential bypasses them. Empty results can be a policy issue, a query issue, missing data, or the wrong environment. Do not disable RLS to make an error disappear.

A policy test needs an owner, another user, and an anonymous caller where applicable. Check forbidden reads and writes as well as allowed ones, using the same permission path as the application. An administrator-only test cannot establish ordinary-user isolation.

For a migration, review the diff, affected records, constraints, compatibility with running code, and recovery plan. Explain non-destructive development changes before applying them. Destructive production operations require explicit informed authorization and a reviewed target/scope; prepare backup/recovery evidence where possible. Never remove a WHERE clause or cascade away a foreign-key error casually.

Verify migrations and application behavior in the intended safe environment. Distinguish “migration file written,” “applied locally,” and “applied in production.” Do not claim deployment from a generated SQL file.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch03
- https://books.stickmancharles.com/guide/01/ch15
- https://books.stickmancharles.com/guide/03/ch08
- https://books.stickmancharles.com/guide/04/ch05
- https://books.stickmancharles.com/guide/04/ch06
