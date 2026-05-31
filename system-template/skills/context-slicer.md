# Skill: Context Slicer

You are authorized to extract targeted context for execution agents to minimize token bloat and prevent hallucinations.

When defining a `context_slice` for a task in `tasks.json`:
1. Do not copy the entire PRD or Architecture document.
2. Extract *only* the specific paragraphs, UI requirements, and API endpoints relevant to the exact feature being built in that task.
3. If the task is "Build Login UI", the context slice should only contain the color hex codes, the route `/login`, and the specific API payload required. It must NOT contain the database schema or the payment gateway details.
4. Keep the `context_slice` string under 300 words.