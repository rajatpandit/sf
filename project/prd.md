# Product Requirements Document (PRD): Synth Forge CLI

## 1. Vision
Build the `sf` Node.js Orchestrator CLI. This is the engine that parses `tasks.json`, reads `.agent-state.json`, interpolates `.env` secrets, and safely manages the execution of `pi` coding sessions within isolated Git branches.

## 2. Target Audience
Solo developers and enterprise engineering teams adopting the Synth Forge methodology.

## 3. Core Requirements

<requirement id="REQ-01">
**Installation & Bootstrapping:** Provide an `install.sh` script to install Node dependencies, establish the `~/.agent-system/` global registry, and set up the `sf` binary. The CLI must support `sf system-init` (global setup) and `sf project-init` (local `./.agents/` setup).
</requirement>

<requirement id="REQ-02">
**CLI Interface & Help:** Use `commander` to provide detailed `-h` outputs for commands: `sf` (run DAG), `sf claim <TASK_ID>`, `sf complete <TASK_ID>`, `sf reject <TASK_ID> --reason "<msg>"`, and `sf --resume`.
</requirement>

<requirement id="REQ-03">
**DAG State Machine & Persistence:** The core engine (`lib/core/dag-runner.js`) must read `.agent-pipeline.yml` to determine the playbook sequence. It tracks progress in `.agent-state.json`. It evaluates the exit code of child processes to transition states or trigger the `max_retries` auto-suspend flow.
</requirement>

<requirement id="REQ-04">
**Git Sandbox Lifecycle:** The orchestrator must enforce Git isolation. Before execution, it runs `git checkout -b agent/<TASK-ID>`. Upon successful review, it stages the branch, commits (`feat: ... [TASK-ID]`), and cleans the working tree.
</requirement>

<requirement id="REQ-05">
**AI Gateway & Secure MCP:** The engine must read `.env`. It dynamically replaces `OPENAI_BASE_URL` if `AI_GATEWAY_URL` is detected. It must also deep-merge `~/.agent-system/mcp-defaults.json` and `./.agents/mcp-custom.json` with `.env` interpolation before spawning `pi`.
</requirement>

<requirement id="REQ-06">
**Context Slicing (Planning Phase):** The orchestrator must be able to read `tasks.json` and pass only the `context_slice` string to the implementation agent's prompt, preventing it from reading the entire PRD.
</requirement>

<requirement id="REQ-07">
**Adversarial TDD Gate:** The orchestrator must enforce the TDD contract. The `test-engineer` agent must yield an exit code of 1 (failing tests). The `implementation` agent must yield an exit code of 0 (passing tests). If these contracts are violated, the orchestrator triggers the retry loop.
</requirement>