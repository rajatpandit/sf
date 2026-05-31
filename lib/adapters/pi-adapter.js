const { spawnSync } = require('child_process');

function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  console.log(`[Orchestrator] Spawning Pi adapter for phase: ${phase} using model ${model}`);
  
  const args = [
    '--system-prompt', systemPromptPath,
    '--model', model,
    '-p', contextSlice || '' // Fix: -p instead of --input
  ];

  // Note: Native MCP flag removed to prevent crash. 
  // Future implementation will inject MCP via an ephemeral --extension.

  const result = spawnSync('pi', args, { stdio: 'inherit', env });
  return result.status;
}

module.exports = { run };