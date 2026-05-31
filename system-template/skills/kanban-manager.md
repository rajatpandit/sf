# Skill: Kanban Manager

You are authorized to manage the project's Kanban board. 

When invoked to break down requirements:
1. You must read `docs/prd.md` and `docs/architecture.md`.
2. You must create or update `tasks.json` in the project root.
3. Your output must strictly match the following JSON Schema:
```json
{
  "tasks": [
    {
      "id": "TASK-1",
      "title": "String",
      "status": "todo",
      "assigned_role": "frontend-dev | backend-dev | etc",
      "context_slice": "String"
    }
  ]
}
```
4. Do not output markdown code blocks containing the JSON. Use the `write` tool to write directly to `tasks.json`.