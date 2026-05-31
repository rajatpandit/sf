# Architecture Design: Synth Forge CLI

## 1. System Overview
The Synth Forge CLI is a Node.js application. It acts as a wrapper and state machine around the `pi` coding agent. It does not generate text itself; it routes context and manages the filesystem/Git lifecycle.

## 2. Technology Stack
*   **Runtime:** Node.js (v18+)
*   **CLI Framework:** `commander` (for robust `-h` generation and sub-command routing)
*   **Environment:** `dotenv` (for loading `.env` secrets safely)
*   **Process Management:** Node native `child_process.spawn` (to run `pi` and stream stdio to the terminal)
*   **JSON Parsing:** Node native `fs.readFileSync` and `JSON.parse`

## 3. Directory Structure
```text
/
├── install.sh                 # Global installation script
├── package.json
├── bin/
│   ├── sf                     # Symlink/Bash wrapper pointing to sf.js
│   └── sf.js                  # CLI entrypoint (Commander.js setup)
├── lib/
│   ├── cli/                   # Handlers: init.js, run.js, claim.js
│   ├── core/
│   │   ├── state.js           # Reads/Writes .agent-state.json deterministically
│   │   ├── git.js             # Git branch generation and commits
│   │   └── mcp-merger.js      # Deep merges global and local MCP JSONs
│   └── adapters/
│       └── pi-runner.js       # Spawns Pi, injects Gateway ENV, streams output
└── system-template/           # The ~./agent-system/ master files
```

## 4. Execution Flow (The Runner)
1. User types `sf`.
2. `lib/core/state.js` reads `.agent-state.json`.
3. If `status === 'paused'`, it exits and prompts the user to use `sf --resume`.
4. The Orchestrator references the playbook (e.g., `full-stack-epic.yml`).
5. **If Planning Phase:** The engine spawns `pi` to read the PRD and write `tasks.json`.
6. **If Execution Phase:** The Orchestrator creates the Git Sandbox. It reads the `context_slice` from `tasks.json`.
7. `lib/adapters/pi-runner.js` interpolates MCP variables and constructs the exact CLI array: 
   `pi --system-prompt ~/.agent-system/roles/<phase>.md --input "<context_slice>"`
8. Node `spawn` executes the command and waits for the exit code to transition the state (Adversarial TDD enforcement).