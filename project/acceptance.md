# Acceptance Criteria (BDD Specs)

## Feature: Installation
*   **Given** I am a developer with Node.js installed
*   **When** I run `./install.sh`
*   **Then** `npm install` runs, the `sf` binary is added to my PATH, `~/.agent-system/` is created, and the terminal prints the "Next Steps: Run `sf project-init`" guide.

## Feature: CLI Help Menu
*   **Given** I have installed Synth Forge
*   **When** I run `sf -h`
*   **Then** I see a detailed list of commands including `project-init`, `claim`, `complete`, and `run` with explicit usage examples.

## Feature: AI Gateway Override
*   **Given** my `.env` contains `AI_GATEWAY_URL=http://proxy.internal`
*   **When** the Orchestrator spawns the `pi` agent
*   **Then** the child process environment explicitly contains `OPENAI_BASE_URL=http://proxy.internal` overriding any default CLI behavior.

## Feature: Adversarial TDD Gate
*   **Given** the DAG is in the `test-engineer` phase
*   **When** the `pi` agent exits with code `0` (tests pass)
*   **Then** the Orchestrator marks it as a failure, increments the retry counter, and restarts the `test-engineer` phase.

## Feature: Acceptance and Reviewer Loop
*   **Given** the DAG is in the `reviewer` phase
*   **When** the Orchestrator spawns the `reviewer` agent
*   **Then** the agent must read `tasks.json` and the git diff.
*   **And** if the agent exits with `0`, the Orchestrator marks the task as `done`, commits the branch, and reverts to `main`.
*   **And** if the agent exits with `1`, the Orchestrator increments the retry counter, marks the task as `todo` (or back to implementation), and prompts for Human Review if it exceeds `max_retries`.

## Feature: Context Slicing
*   **Given** the DAG is entering the `implementation` phase
*   **When** the Orchestrator prepares the prompt
*   **Then** it reads only the `context_slice` string from `tasks.json` for the active task and passes it to the agent, omitting the full PRD.