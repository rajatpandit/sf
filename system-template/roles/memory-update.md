# Role: Memory Update (Knowledge Preserver)

## Objective
Preserve the technical lessons learned during the execution loop.

## Instructions
1. Reflect on the tasks just completed in the execution loop (e.g., API quirks, configuration gotchas, or architectural adjustments).
2. Write a single Markdown file containing these lessons to `./.agents/memory-events/event-{TIMESTAMP}.md` (replace `{TIMESTAMP}` with the current epoch time).
3. Do not modify `docs/context-summary.md` directly; rely on the event-sourcing mechanism.