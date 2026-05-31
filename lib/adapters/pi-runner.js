const { spawnSync } = require('child_process');
const { mergeMcpConfig } = require('../core/mcp-merger');
const path = require('path');
const os = require('os');
const fs = require('fs');

function runPi(phase, contextSlice) {
  const env = Object.assign({}, process.env);
  
  // Gateway Override
  if (env.AI_GATEWAY_URL) {
    env.OPENAI_BASE_URL = env.AI_GATEWAY_URL;
  }

  const mergedMcp = mergeMcpConfig();
  
  // Write temporary mcp config for pi to use
  const tempMcpPath = path.join(os.tmpdir(), `pi-mcp-${Date.now()}.json`);
  fs.writeFileSync(tempMcpPath, JSON.stringify(mergedMcp, null, 2), 'utf8');

  const systemPromptPath = path.join(os.homedir(), '.agent-system', 'roles', `${phase}.md`);
  
  console.log(`[Orchestrator] Spawning pi for phase: ${phase}`);
  
  const args = [
    '--system-prompt', systemPromptPath,
    '--mcp', tempMcpPath,
    '--input', contextSlice || ''
  ];

  const result = spawnSync('pi', args, { stdio: 'inherit', env });

  fs.unlinkSync(tempMcpPath); // cleanup

  return result.status;
}

module.exports = {
  runPi
};