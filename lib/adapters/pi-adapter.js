const { spawnSync } = require('child_process');
const path = require('path');

function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  console.log(`[Orchestrator] Spawning Pi adapter for phase: ${phase} using model ${model}`);
  
  const autoExitPath = path.join(__dirname, 'auto-exit.ts');

  const args = [
    '--system-prompt', systemPromptPath,
    '--model', model,
    '--extension', autoExitPath,
    contextSlice || 'Proceed.'
  ];

  const result = spawnSync('pi', args, { stdio: 'inherit', env });
  return result.status;
}

module.exports = { run };
