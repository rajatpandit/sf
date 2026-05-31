const { spawn } = require('child_process');
const { Spinner } = require('./spinner');

async function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model, isDebug = false) {
  console.log(`[Orchestrator] Spawning Pi adapter for phase: ${phase} using model ${model}`);
  
  const args = [
    '--system-prompt', systemPromptPath,
    '--model', model,
    '--tools', 'write,read,edit,bash',
    '-p', contextSlice || 'Proceed.'
  ];

  let spinner = null;
  if (!isDebug) {
    spinner = new Spinner(`Agent [${phase}] is executing...`);
    spinner.start();
  }

  return new Promise((resolve) => {
    // If debug is on, inherit stdio to stream everything directly to the terminal.
    // If debug is off, pipe it so we can log errors but keep the terminal clean for the spinner.
    const stdioConfig = isDebug ? ['inherit', 'inherit', 'inherit'] : 'pipe';
    const child = spawn('pi', args, { stdio: stdioConfig, env });
    
    let errorOutput = "";

    if (!isDebug && child.stderr) {
      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
    }

    child.on('close', (code) => {
      if (!isDebug) spinner.stop();
      if (code !== 0) {
        console.error(`\x1b[31m[Orchestrator] Agent exited with code ${code}\x1b[0m`);
        if (!isDebug && errorOutput) console.error(`\x1b[33m[Agent Logs]:\x1b[0m\n${errorOutput}`);
      } else {
        console.log(`\x1b[32m✔\x1b[0m Phase ${phase} completed successfully.`);
      }
      resolve(code);
    });

    child.on('error', (err) => {
      if (!isDebug) spinner.stop();
      console.error(`\x1b[31m[Orchestrator] Failed to start Pi CLI: ${err.message}\x1b[0m`);
      resolve(1);
    });
  });
}

module.exports = { run };
