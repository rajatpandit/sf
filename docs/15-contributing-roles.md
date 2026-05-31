# Contributing Custom Roles

Synth Forge dynamically recruits new roles into the local `./.agents/custom-roles/` directory when it encounters a domain it does not natively understand.

If a local custom role proves to be exceptionally useful across multiple projects (e.g., a `rust-blockchain-architect` or `seo-specialist`), it should be upstreamed into the global repository so the entire community can benefit.

## Community Contribution Folder
All officially supported community roles live in the global system template directory:
`system-template/roles/`

## How to Submit a Custom Role
When you are ready to upstream a local role from your project into the global repository, submit a Pull Request following these strict guidelines.

### 1. File Structure
*   The file must be named using `kebab-case.md` (e.g., `webgl-expert.md`).
*   The file must be placed in `system-template/roles/`.

### 2. Required Headers
Your role prompt MUST contain exactly two top-level headers:
1.  `## Objective` (A single sentence defining the goal)
2.  `## Instructions` (A numbered list of strict, executable commands)

### 3. Execution Constraints
Your instructions must explicitly enforce the Synth Forge boundaries:
*   **Context Slicing:** The agent must be instructed to read from the `--input` (the `context_slice`), not the entire PRD.
*   **Zero Placeholders:** The agent must be explicitly forbidden from emitting `// TODO` comments.
*   **Adversarial TDD:** If the role writes code, it must be forbidden from editing `.spec` files.

## PR Notes Requirements
When submitting your PR, include the following in your pull request description:
1. **Use Case:** Why is this role needed? Provide an example of a task that the default `implementation` agent failed at, but this custom role succeeded at.
2. **Constraint Verification:** Confirm that the role adheres to the "Context Slicing" and "Zero Placeholders" rules defined in the [Agent Guardrails](./agents.md).