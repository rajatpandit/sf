# Data Schemas & Contracts

The Orchestrator relies on strict data structures to ensure determinism across AI agent handoffs. Below are the core schemas that power the DAG state machine.

## Kanban Board (`tasks.json`)
The `planning` agent outputs this file. The `task-selector` reads it. The Orchestrator uses it to assign work.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "e.g., TASK-1" },
          "title": { "type": "string" },
          "status": {
            "type": "string",
            "enum": ["todo", "in_progress", "in_review", "done"]
          },
          "assigned_role": { 
            "type": "string",
            "description": "Role ID (e.g., frontend-dev) or 'human'"
          },
          "context_slice": {
            "type": "string",
            "description": "Targeted excerpt from PRD/Arch required for this task."
          },
          "required_mcps": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Optional specific MCP servers needed for this task."
          }
        },
        "required": ["id", "title", "status", "assigned_role", "context_slice"]
      }
    }
  }
}
```

## The DAG State (`.agent-state.json`)
This file tracks the current phase of the Orchestrator loop.

```json
{
  "current_phase": "implementation",
  "active_task_id": "TASK-5",
  "status": "running", 
  "retries": 1,
  "history": [
    { "phase": "test-engineer", "exit_code": 1, "timestamp": 1715420000 },
    { "phase": "test-engineer", "exit_code": 0, "timestamp": 1715420500 }
  ]
}
```
*Note: The status can be `running`, `paused` (yield to human), or `failed` (exceeded max retries).*

## The Pipeline Config (`.agent-pipeline.yml`)
Stored in the project root, this defines the active playbook and global guardrails.

```yaml
version: "v0.1.0"
playbook: "full-stack-epic"
constitution: "strict" # options: strict, lean

global_settings:
  require_approval:
    prd: true
    architect: true
  max_retries: 3
  memory:
    max_events_before_compress: 20

model_tiering:
  reasoning: "claude-3-5-sonnet-20241022"
  fast: "gpt-4o-mini"
  local: "llama3"
```