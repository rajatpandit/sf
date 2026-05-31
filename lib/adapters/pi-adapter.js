const { spawnSync } = require('child_process');

function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  console.log(`[Orchestrator] Spawning Pi adapter for phase: ${phase} using model ${model}`);
  
  const args = [
    '--system-prompt', systemPromptPath,
    '--model', model,
    '--tools', 'write,read,edit,bash',
    '-p', contextSlice || 'Proceed.'
  ];

  const result = spawnSync('pi', args, { stdio: 'inherit', env });
  return result.status;
}

module.exports = { run };
