# Documentation Constitution

This document defines the strict editorial standards for all documentation within the AI Software Engineering System. All contributors (human and AI) must adhere to these rules when writing or updating documentation.

## Voice and Tone
*   **No AI Voice:** Avoid algorithmic pleasantries, conversational filler, or anthropomorphic phrasing (e.g., "Let's dive in," "I will," "We are excited to," "As an AI").
*   **Active Voice:** Use the active voice to make the subject and action clear.
    *   *Bad:* "The tasks.json file is read by the orchestrator."
    *   *Good:* "The orchestrator reads the tasks.json file."
*   **Direct and Objective:** State facts. Omit adjectives that do not convey technical meaning (e.g., "powerful," "seamless," "robust," "beautiful").

## Structure and Formatting
*   **Bottom-Line Up Front (BLUF):** Start every document or section with a single sentence explaining its purpose.
*   **Headers as Sentences:** When appropriate, use headers that convey the core takeaway rather than just a noun (e.g., "Memory is append-only" instead of "Memory Management").
*   **Lists over Paragraphs:** If a paragraph contains more than two comma-separated items, convert it to a bulleted list.
*   **Code Blocks:** Always specify the language for syntax highlighting. Always provide a brief explanation immediately preceding the block.
*   **Callout Blocks:** Use VitePress custom containers (`::: info`, `::: tip`, `::: warning`, `::: danger`) to highlight critical warnings, architectural insights, or supplementary ideas so they visually stand out.

## Clarity and Density
*   **Assume Competence, Explain Context:** Do not explain basic software engineering concepts (e.g., what Git is, what JSON is). Do explain why a specific architectural choice was made in this system.
*   **Short Sentences:** Keep sentences under 25 words. If a sentence requires multiple conjunctions (and, but, or), split it into two sentences.
*   **Consistent Terminology:** 
    *   Use "Orchestrator" (capital O) to refer to the DAG state machine.
    *   Use "Agent" to refer to an isolated `pi` session.
    *   Use "Task" to refer to an item in `tasks.json`.

## Maintenance and Versioning
*   **No Numbered Headings:** Do not use numbers in markdown headings (e.g., use `# Vision` instead of `# 1. Vision`).
*   **Sub-section Navigation:** Ensure all sub-sections use standard Markdown header levels (`##`, `###`). The documentation generator is configured to automatically expose these in the sidebar and as top-right jump links via the `outline` configuration.
*   **File Naming:** Use `kebab-case.md`.
*   **Synchronization (Single Source of Truth):** The Wiki documentation is the exact specification for the system. Any changes to the architecture, workflows, or data contracts MUST be updated synchronously across both the Wiki and the codebase. Code and documentation must never drift. 

## Visual Storytelling (Diagrams & Callouts)
*   **Mermaid Diagrams:** Whenever a process involves more than two actors or a multi-step loop (e.g., DAG routing, CI/CD pipelines, Git lifecycle), provide a ````mermaid```` block to visually map the workflow. Ensure diagrams are structurally sound so they render perfectly across light and dark modes.
*   **Callout Blocks:** Use VitePress custom containers (`::: info`, `::: tip`, `::: warning`, `::: danger`) to highlight critical warnings, architectural insights, or supplementary ideas so they visually stand out from the main text block. Do not overuse them; reserve them for high-value context or strict warnings.

## Code Generation & TDD Standards
*   **Test-Driven Development (TDD):** All implementation code must be accompanied by automated tests. In the context of AI workflows, this follows the Adversarial TDD model (tests written first and verified to fail). For standard repository contributions, unit tests must cover all pure functions, core logic, and state mutations.
*   **Automated Reviewer Gates:** When bootstrapping or extending the Orchestrator, developers must write localized validation scripts (e.g., `reviewer-check.js`) to assert that the generated artifacts match the acceptance criteria before merging. Code and prompts must systematically prove their compliance.
*   **Zero Placeholders:** Code must be complete. No `// TODO: implement` comments are allowed in final outputs.