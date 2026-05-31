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
*   **Relative Linking:** Always use relative links without the `.md` extension in VitePress (e.g., `[Tasks](./08-data-schemas)`).
*   **Code Parity:** If a JSON schema or configuration file is referenced in the documentation, it must exactly match the source code. Do not use pseudo-code for configuration examples.