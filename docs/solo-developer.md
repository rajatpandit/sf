# Solo Developer Guide

This guide configures Synth Forge for individual developers who want maximum speed and zero infrastructure overhead.

## API Configuration
Solo developers can securely use direct API keys without provisioning a corporate gateway. 
Store your keys in a local `.env` file at the root of your project. Ensure this file is added to `.gitignore`.

```env
# .env
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-proj-xxx
```
The Orchestrator automatically detects these keys and routes traffic directly to the LLM providers.

## Local MCP Servers
Configure Model Context Protocol (MCP) servers to run as local sub-processes using standard input/output (`stdio`). This avoids network port conflicts and requires no background services.

Add local tools to your `.agents/mcp-custom.json`:
```json
{
  "sqlite-mcp": {
    "transport": "stdio",
    "command": "uvx",
    "args": ["mcp-server-sqlite", "--db-path", "./local.db"]
  }
}
```

## Local Telemetry
Synth Forge automatically writes performance metrics (token burn, phase duration) to `.agents/telemetry.jsonl`. 
You do not need an external observability platform like Datadog. You can monitor your AI spend directly in the terminal using `jq`.

Example command to calculate total tokens used:
```bash
cat .agents/telemetry.jsonl | jq '{total_tokens: [.estimated_tokens] | add}'
```

## Simplified Execution
Run the system using the default pipeline.
```bash
sf
```
The Orchestrator will seamlessly generate branches, commit code, and merge updates without risking conflicts with other developers.