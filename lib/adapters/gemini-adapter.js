const { spawnSync } = require('child_process');
const fs = require('fs');

function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  console.log(`[Orchestrator] Spawning Gemini CLI adapter for phase: ${phase}`);
  
  const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8');
  const combinedPrompt = `${systemPrompt}\n\nTask:\n${contextSlice || ''}`;

  const args = [
    'generate',
    '--model', model.replace('google/', ''), // Gemini CLI usually drops the provider prefix
    '--text', combinedPrompt
  ];

  const result = spawnSync('gemini', args, { stdio: 'inherit', env });
  return result.status;
}

module.exports = { run };