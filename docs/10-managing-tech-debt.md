# Managing Technical Debt

The standard `full-stack-epic` playbook is designed for Greenfield feature development. However, Staff Engineers spend a large portion of their time migrating systems, upgrading dependencies, and paying down technical debt. 

The system provides dedicated playbooks for Brownfield development.

## The `refactor` Playbook
Use this when extracting a monolith, swapping CSS frameworks, or untangling spaghetti code.

**How to trigger:**
```bash
sf --playbook refactor --vision "Move all inline styles to Tailwind CSS."
```

**The DAG Flow:**
1.  **Skips Product Management:** There are no new user stories.
2.  **`migration-architect`:** A specialized role reads the codebase and writes a `migration-plan.md` (e.g., "Step 1: Install Tailwind, Step 2: Convert Header, Step 3: Convert Footer").
3.  **`planning`:** Breaks the migration plan into atomic tasks in `tasks.json`.
4.  **Execution Loop:** Executes the changes via isolated Git branches.

## The `version-upgrade` Playbook (V2 Roadmap)
Designed for major framework bumps (e.g., React 17 -> 19).
*   Relies heavily on AST (Abstract Syntax Tree) parsing skills rather than just text generation.
*   The `test-engineer` phase is skipped. The Orchestrator relies strictly on the project's *existing* test suite passing.

::: tip 💡 Migration Insight
AST-based transformations guarantee that business logic is unaffected during syntax upgrades, eliminating the primary risk of LLM-based refactoring.
:::

## The `tech-port` Playbook (V2 Roadmap)
Designed for rewriting modules into new languages (e.g., Python to Rust).
*   Requires two `implementation` agents running concurrently: one reading the legacy code, one writing the new code.
*   The Adversarial TDD loop runs the legacy tests against the new compiled binary (via a compatibility harness).