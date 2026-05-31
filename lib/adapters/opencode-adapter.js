const { spawnSync } = require('child_process');

function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  console.log(`[Orchestrator] Spawning OpenCode adapter for phase: ${phase}`);
  
  // Note: This is a stub mapping. OpenCode CLI syntax differs.
  const args = [
    '--model', model,
    '--instructions', systemPromptPath,
    '--prompt', contextSlice || ''
  ];

  const result = spawnSync('opencode', args, { stdio: 'inherit', env });
  return result.status;
}

module.exports = { run };