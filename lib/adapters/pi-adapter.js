const { spawn } = require('child_process');
const { Spinner } = require('./spinner');

async function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  console.log(`[Orchestrator] Spawning Pi adapter for phase: ${phase} using model ${model}`);
  
  const args = [
    '--system-prompt', systemPromptPath,
    '--model', model,
    '--tools', 'write,read,edit,bash',
    '-p', contextSlice || 'Proceed.'
  ];

  const spinner = new Spinner(`Agent [${phase}] is executing...`);
  spinner.start();

  return new Promise((resolve) => {
    // We do not inherit stdio here, otherwise Pi's output would clash with our spinner.
    // We pipe it so we can optionally log it if it fails, or just hide it for clean UX.
    const child = spawn('pi', args, { stdio: 'pipe', env });
    
    let errorOutput = "";

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    child.on('close', (code) => {
      spinner.stop();
      if (code !== 0) {
        console.error(`\x1b[31m[Orchestrator] Agent exited with code ${code}\x1b[0m`);
        if (errorOutput) console.error(`\x1b[33m[Agent Logs]:\x1b[0m\n${errorOutput}`);
      } else {
        console.log(`\x1b[32m✔\x1b[0m Phase ${phase} completed successfully.`);
      }
      resolve(code);
    });

    child.on('error', (err) => {
      spinner.stop();
      console.error(`\x1b[31m[Orchestrator] Failed to start Pi CLI: ${err.message}\x1b[0m`);
      resolve(1);
    });
  });
}

module.exports = { run };
