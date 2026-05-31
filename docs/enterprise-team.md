# Enterprise Team Guide

This guide configures Synth Forge for engineering teams. It prioritizes Intellectual Property (IP) protection, shared context, and conflict-free Git collaboration.

## AI Gateway Configuration
Teams must prevent developers from sending proprietary code to public LLM endpoints via personal API keys. 
Configure the Orchestrator to route all traffic through an internal AI Gateway (e.g., Cloudflare AI Gateway, LiteLLM).

Distribute a shared `.env` file to your team:
```env
# .env
AI_GATEWAY_URL=https://gateway.internal.company.com/v1
TEAM_API_KEY=corp_shared_key_xxx
```
The Orchestrator detects `AI_GATEWAY_URL` and forcefully overrides all underlying agent CLI tools (Pi, OpenCode) to use this secure endpoint. Direct API keys are ignored.

## Team MCP Servers
Teams often rely on shared infrastructure. Configure MCP servers to use Server-Sent Events (SSE) to communicate with remote hosted tools, or use `.env` interpolation for authenticated local execution.

Example `.agents/mcp-custom.json` using interpolated secrets:
```json
{
  "github-enterprise": {
    "transport": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "${TEAM_GITHUB_TOKEN}"
    }
  }
}
```

## Collaborative Memory Management
Multiple agents running concurrently on different branches will cause Git merge conflicts if they modify a single context file.
Ensure the `agent-pipeline.yml` specifies a sufficiently high compression threshold.

```yaml
memory:
  max_events_before_compress: 50
```
This forces the `memory-update` agent to use event-sourcing (appending unique timestamped files to `.agents/memory-events/`). Developers can merge PRs seamlessly, and the system dynamically builds the context on the fly.

## Centralized Telemetry
The Orchestrator writes metrics to `.agents/telemetry.jsonl`.
Configure your CI/CD pipeline or local log-shipper (e.g., Datadog Agent, Promtail) to ingest this file. This provides engineering leadership with centralized dashboards tracking org-wide AI velocity and token expenditure.