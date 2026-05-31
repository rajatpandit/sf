const fs = require('fs');
const path = require('path');
const os = require('os');

function initProject() {
  const cwd = process.cwd();
  const agentsDir = path.join(cwd, '.agents');
  
  if (fs.existsSync(agentsDir)) {
    console.log('[SF] Project is already initialized.');
    return;
  }

  console.log('[SF] Initializing project scope...');

  // 1. Create Directories
  fs.mkdirSync(agentsDir);
  fs.mkdirSync(path.join(agentsDir, 'custom-roles'));
  fs.mkdirSync(path.join(agentsDir, 'memory-events'));

  // 2. Lockfile
  // In a real scenario, this reads from ~/.agent-system/current
  const currentVersion = 'v0.0.1'; 
  fs.writeFileSync(path.join(cwd, '.agent-version'), currentVersion, 'utf8');

  // 3. State file
  const initialState = {
    current_phase: 'memory-agent',
    active_task_id: null,
    status: 'running',
    retries: 0,
    history: []
  };
  fs.writeFileSync(path.join(cwd, '.agent-state.json'), JSON.stringify(initialState, null, 2), 'utf8');

  // 4. Default Pipeline
  const defaultPipeline = `version: "${currentVersion}"
playbook: "full-stack-epic"
constitution: "strict"

global_settings:
  agent_tool: "pi"
  require_approval:
    prd: true
    architect: true
  max_retries: 3
  memory:
    max_events_before_compress: 20

model_tiering:
  reasoning: "google/gemini-3.1-pro-preview"
  fast: "google/gemini-2.5-flash"
  local: "google/gemini-2.5-flash-lite"
`;
  fs.writeFileSync(path.join(cwd, '.agent-pipeline.yml'), defaultPipeline, 'utf8');

  // 5. Example MCP config
  const mcpExample = {
    "my-custom-mcp": {
      "transport": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"],
      "env": {
        "MY_SECRET": "${MY_SECRET}"
      }
    }
  };
  fs.writeFileSync(path.join(agentsDir, 'mcp-custom.example.json'), JSON.stringify(mcpExample, null, 2), 'utf8');

  console.log('[SF] Initialization complete!');
  console.log('[SF] - Created .agents/ directory');
  console.log('[SF] - Created .agent-pipeline.yml');
  console.log('[SF] - Locked to ' + currentVersion);
}

module.exports = { initProject };