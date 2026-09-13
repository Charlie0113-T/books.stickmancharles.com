# Locate behavior and trust boundaries

Use when explaining where a feature executes or deciding where a change belongs.

Trace one observed interaction: UI event → client request → server handler or external API → storage → response → UI state. Some projects have no backend; some code runs at build time or on both sides. Verify execution context from entry points, framework conventions, runtime access, and actual requests.

HTML describes structure, CSS presentation, and JavaScript behavior in a browser. A component can combine these concerns. Do not turn a small styling or event bug into a framework migration. Use DOM/computed-style inspection for rendering questions and console/network evidence for behavior questions.

The browser is controlled by its user. Hiding a button is not authorization. Secrets and privileged decisions belong in a trusted environment, and data access must enforce the actual user’s permissions. Public configuration is different from a privileged credential; inspect names and usage without revealing values.

When changing a feature, preserve the existing separation of responsibilities. Validate untrusted input at the appropriate boundary and represent loading, success, failure, and relevant retry/duplicate behavior. Do not show success before the operation finishes.

Verification should cross the changed boundary. A handler unit test does not establish that the UI sends the correct payload; a successful click does not establish that another user’s data is protected. Choose the smallest combination of tests and observations that covers the actual risk.

Teach one relationship using this project’s files and output. If the user only asks “what is a backend?”, a brief explanation plus one contextual example is enough; do not build a server just to answer.

## Canonical sources

Task-oriented adaptation of the following book sections; the project-first agent workflow is an editorial protocol, not a verbatim chapter copy.

- https://books.stickmancharles.com/guide/01/ch01
- https://books.stickmancharles.com/guide/01/ch02
- https://books.stickmancharles.com/guide/01/ch05
- https://books.stickmancharles.com/guide/03/ch02
- https://books.stickmancharles.com/guide/03/ch03
- https://books.stickmancharles.com/guide/03/ch04
