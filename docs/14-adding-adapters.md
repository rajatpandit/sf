# Adding Tool Adapters

Synth Forge is designed to be tool-agnostic. While it defaults to `pi`, it uses an **Adapter Abstraction Layer** allowing it to drive any AI CLI (e.g., `opencode`, `gemini`, `aider`).

## How the Adapter Factory Works
When the Orchestrator runs, it checks `.agent-pipeline.yml` for the `agent_tool` setting.
```yaml
global_settings:
  agent_tool: "gemini" 
```
The factory (`lib/adapters/index.js`) maps this string to a specific JavaScript adapter file.

## Writing a New Adapter
If you want to add support for a new CLI tool, you must submit a PR with a new adapter file in `lib/adapters/<tool>-adapter.js`.

### The Interface Contract
Every adapter must export a single `run` function matching this exact signature:

```javascript
// lib/adapters/mytool-adapter.js
const { spawnSync } = require('child_process');

function run(phase, systemPromptPath, contextSlice, env, mcpConfig, model) {
  // 1. Format the arguments for your specific CLI
  const args = [
    '--model', model,
    '--prompt-file', systemPromptPath,
    '--input', contextSlice || ''
  ];

  // 2. Spawn the process synchronously (inheriting stdio so the user sees the terminal output)
  const result = spawnSync('mytool', args, { stdio: 'inherit', env });

  // 3. You MUST return the exit code so the Orchestrator can enforce Adversarial TDD
  return result.status; 
}

module.exports = { run };
```

### Registering the Adapter
Once your adapter is written, register it in the factory map inside `lib/adapters/index.js`:

```javascript
const myToolAdapter = require('./mytool-adapter');

function getAdapter(toolName) {
  switch (toolName.toLowerCase()) {
    case 'mytool':
      return myToolAdapter;
    // ... existing adapters
  }
}
```

## Security Warning (MCPs & Environments)
Your adapter receives the `env` object already pre-interpolated and protected by the Orchestrator's Gateway Override logic. **You must pass this `env` object to your `spawnSync` call.** If you spawn the process using the default system environment, you risk leaking IP to public LLM endpoints.

## Current Official Adapters
The following adapters are officially supported and maintained in the `lib/adapters/` directory:
*   [pi-adapter.js](https://github.com/rajatpandit/sf/blob/main/lib/adapters/pi-adapter.js)
*   [opencode-adapter.js](https://github.com/rajatpandit/sf/blob/main/lib/adapters/opencode-adapter.js)
*   [gemini-adapter.js](https://github.com/rajatpandit/sf/blob/main/lib/adapters/gemini-adapter.js)

## Submitting a Pull Request
When submitting a PR to add a new tool adapter, ensure your PR description includes:
1. **Tool Verification:** A link to the tool's public repository or documentation.
2. **Environment Handling:** Confirmation that the `env` object is explicitly passed to the `spawnSync` child process.
3. **Exit Code Handling:** Confirmation that the tool accurately returns an exit code of `1` on failure and `0` on success to support the Adversarial TDD phase.