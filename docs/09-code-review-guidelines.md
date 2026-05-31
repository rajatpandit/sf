# Code Review Guidelines (For AI PRs)

AI agents write code differently than humans. While the Adversarial TDD process guarantees the code passes business logic requirements, humans must still audit AI-generated Pull Requests for architectural integrity and security.

## The "Fox Guarding the Henhouse" Check
Because an AI wrote the tests and an AI wrote the implementation, your primary job as a human reviewer is to audit the **Tests**, not just the implementation.

*   **Check for Tautologies:** Did the AI write `expect(true).toBe(true)` just to bypass the exit code 1 requirement?
*   **Check Mocking Boundaries:** Did the AI mock the exact service it was supposed to be testing?
*   **Action:** If the tests are flawed, use the CLI command `sf reject TASK-ID --reason "Tests are mocking the database layer incorrectly."` This routes the state machine back to the `test-engineer`.

## Hallucinated Dependencies
AI agents will occasionally invent NPM packages or assume internal helper functions exist.
*   **Check `package.json`:** Ensure no unknown libraries were added.
*   **Check Imports:** Ensure it imported from your existing utility folders (e.g., `src/utils/date.ts`) instead of writing a brand new date formatter.

## Scope Creep & Context Bleed
Even with "Context Slicing," an agent might get overzealous.
*   If the task was to fix a button color, did the AI also refactor the global state manager?
*   **Action:** Immediately reject PRs that touch files outside the explicit bounds of the `context_slice`.

## Approving the PR
If the code is sound:
1. Merge the Draft PR.
2. The webhook (or your manual `sf next` command) will mark the task as `done` in `tasks.json`.
3. The Orchestrator will advance to the next ticket.