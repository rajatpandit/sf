# Troubleshooting and Logs

This document explains how to diagnose and recover from system failures or stalled Agent loops.

## Locate the telemetry logs
The Orchestrator records all phase transitions, token counts, and exit codes to a local JSON Lines file. Inspect this file to identify where a pipeline stalled.

Path to telemetry file:
```bash
cat .agents/telemetry.jsonl
```

## Inspect the current DAG state
The `.agent-state.json` file holds the exact position of the Orchestrator within the pipeline. Read this file to determine the active task and retry count.

Path to state file:
```bash
cat .agent-state.json
```

## Recover a corrupted state
If `.agent-state.json` becomes corrupted or an Agent enters an unrecoverable loop, reset the state manually. Change the `status` field to `paused` or decrement the `retries` count.

Example state reset:
```json
{
      "current_phase": "implementation",
      "status": "paused",
      "retries": 0
}
```

## Diagnose MCP server connection failures
MCP servers must bind to standard input/output (stdio) or establish a Server-Sent Events (SSE) connection. 

If an Agent fails to use a required MCP tool, verify the command path in `mcp-custom.json`. Ensure the environment variables referenced in the configuration exist in the `.env` file.