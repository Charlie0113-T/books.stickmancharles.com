# Trace and preserve an API contract

Use for understanding or changing communication between software components.

An API is an interface another program can call. For an HTTP endpoint, locate the caller and handler/specification. Identify method, route, request parameters/body, authentication, response shape/status, and the environment. Preserve the project’s actual style (REST, RPC, GraphQL, or other); do not impose `/v1` or a new response envelope during an unrelated fix.

Inspect a safe representative request with synthetic data. Do not log authorization headers, put secret keys into URLs, or send production requests just to learn. Even a read can expose private data or incur usage charges; side effects depend on the endpoint, not only its HTTP method.

For failures, compare what was sent with what the handler expects, then follow the exact status and server/client error. A 401, 403, 404, or 500 narrows investigation; it does not prove the root cause. Check request validation, identity and permission checks, downstream failures, and the caller’s error handling.

Before changing a contract, find consumers and tests. Keep existing valid calls working unless a breaking change is explicitly part of the goal. Use the existing auth/error conventions. Consult documentation for the installed client/server version rather than inventing SDK calls.

Verify the intended success case, relevant malformed input, unauthorized/forbidden access, and failure behavior. If retries can repeat writes or external actions, inspect idempotency rather than adding an automatic retry blindly. Confirm that the UI/client handles actual responses correctly.

Teach with the current request: what the caller promised, what the server checked, and what the response proves. Link the chapter only for deeper reading.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch04
- https://books.stickmancharles.com/guide/01/ch09
- https://books.stickmancharles.com/guide/04/ch07
