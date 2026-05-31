# Features

This document tracks the capabilities of the AI Software Engineering System across versions. 

## Version 0.0.1 (Current)

### Human-in-the-Loop Orchestration
The Orchestrator yields control to human engineers at critical architectural junctures.
Instead of running a completely autonomous loop, the system pauses after generating the PRD and Architecture, waiting for manual approval before initiating execution.

### Adversarial TDD Handoff
Testing and implementation are strictly segregated to prevent tautological testing.
A specialized `test-engineer` agent writes failing tests based on the context slice. The `implementation` agent is denied write-access to the test files and must write source code until the tests pass.

### Task-Scoped Context Slicing
Execution agents receive only the exact constraints required for their assigned ticket.
The `planning` agent slices the master PRD and Architecture documents into isolated blocks, preventing context bloat and keeping the implementation agents focused.

### Git-Sandboxed Execution
All agent modifications occur within isolated, task-specific Git branches.
The Orchestrator automatically checks out an `agent/TASK-[ID]` branch before passing control to the agent, staging the commit, and opening a Draft PR upon completion.

### Event-Sourced AI Memory
System context is stored as an append-only log to prevent Git merge conflicts in team environments.
The `memory-update` agent writes isolated, timestamped events. The `memory-agent` reads and automatically compresses these events on subsequent runs.

### Dynamic Role Recruitment
The system generates specialized agent prompts on the fly for niche tasks.
If the `planning` agent determines a task requires a specific domain expert (e.g., WebGL), it uses the `role-recruiter` skill to write a temporary persona into the local `.agents/custom-roles/` directory.

### Secure Hybrid MCPs
Model Context Protocol servers are configured via environment variable interpolation.
API keys and secrets for external tools (GitHub, Databases) remain in a local `.env` file and are never committed to version control, making the system safe for team usage.

---

## Version 0.0.2 (Planned Roadmap)

### Headless CI/CD Mode
The Orchestrator will run natively in continuous integration pipelines without a terminal.
It will listen for issue creation or pull request comments, acting autonomously until hitting retry limits, then reporting status via the GitHub/GitLab MCP.

### Parallel Branch Execution
The Orchestrator will eliminate sequential bottlenecks by spawning concurrent agent sessions.
Multiple agents will execute independent tasks simultaneously in separate Git branches, relying on the Adversarial TDD phase to resolve eventual merge conflicts.