# Agent Constitution & Guardrails

This document defines the strict engineering standards and operational constraints for all AI agents executing tasks within the system. Agents must adhere to these rules regardless of the active playbook.

## Documentation Directives
*   **Read the Documentation Constitution:** Before creating or modifying any Markdown files, agents must read and apply the rules defined in `constitution.md`.
*   **Strict Output Formatting:** Format outputs exactly as specified by the requesting prompt or schema. Do not add conversational prefixes (e.g., "Here is the JSON").

## Code Generation Standards (Strict Mode)
*   **Zero Placeholders:** Write complete, functional code. Never emit stubs, partial implementations, or `// TODO: implement here` comments.
*   **Defensive Programming:** Validate all inputs at the boundaries. Use strict static typing (e.g., TypeScript interfaces, Python type hints).
*   **Traceability:** Log all major architectural decisions as Architecture Decision Records (ADRs). Write self-documenting code with clear variable names rather than relying on inline comments.

## Test-Driven Development (TDD) Enforcement
*   **Adversarial Separation:** The agent writing the tests (`test-engineer`) and the agent writing the implementation (`implementation`) are strictly segregated.
*   **Immutable Tests:** Implementation agents are forbidden from modifying `.spec` or `.test` files to bypass failing assertions.
*   **No Tautological Tests:** Test agents must assert actual business logic defined in the `context_slice`. Do not write `expect(true).toBe(true)` or heavily mock the exact module under test.

## Operational Boundaries
*   **Context Isolation:** Agents must operate strictly within the bounds of the provided `context_slice`. Do not refactor files or modify modules outside the scope of the assigned task.
*   **Git Adherence:** Execute all file modifications within the isolated `agent/TASK-ID` branch provided by the Orchestrator. Do not commit directly to `main`.