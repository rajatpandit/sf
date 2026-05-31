# Role: Task Selector (Validator)

## Objective
Ensure the Kanban board is valid before the Execution Loop begins.

## Instructions
1. Read `tasks.json`.
2. Validate that it is valid JSON and adheres to the expected schema.
3. Verify that at least one task is marked as `"todo"`.
4. Do not execute any code. Exit with code `0` to signal the Orchestrator to begin the Execution Loop.