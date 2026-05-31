# Synth Forge 

An "AI Exoskeleton" designed to bring determinism, token efficiency, and Git-native workflows to AI-assisted software development. 

Rather than relying on runaway autonomous loops, this system uses a lightweight Orchestrator (DAG state machine) to manage isolated AI sessions. It seamlessly transitions between discovery, planning, and execution phases, while yielding control back to human engineers at critical architectural junctures.

It is designed to scale seamlessly from a solo developer's weekend project to an enterprise engineering organization.

## 📚 Master Documentation (Wiki)

The complete architectural specification and operational guide is maintained in our VitePress Wiki. 

### Quick Links to Key Concepts:
*   [Vision & Strategy (Security & IP Governance)](./docs/01-vision-strategy.md)
*   [System Architecture & DAG State Machine](./docs/02-architecture.md)
*   [Developer Ergonomics & Human-Agent Pairing](./docs/03-developer-ergonomics.md)
*   [Adversarial TDD & Git-Sandboxed Execution](./docs/04-execution-tdd.md)
*   [Extensibility & MCP Servers](./docs/05-extensibility-mcp.md)
*   [Roles, Playbooks & Dynamic Recruitment](./docs/06-roles-playbooks.md)
*   [Event-Sourced Memory Management](./docs/07-memory-management.md)

---

## 🚀 Getting Started

### 1. View the Wiki Locally
The documentation is built with [VitePress](https://vitepress.dev/). To view it with live reloading:

```bash
# Install dependencies
npm install

# Start the local documentation server
npm run docs:dev
```
*Open `http://localhost:5173` in your browser to view the Wiki.*

### 2. Build the Static Docs
To compile the documentation into static HTML (output to the `./build` directory):
```bash
npm run docs:build
```
Preview the compiled static build:
```bash
npm run docs:preview
```

---

## 🧠 Core Features

*   **Human-in-the-Loop (HITL):** Configurable yield points ensure the AI doesn't write code until the human approves the architecture.
*   **Adversarial TDD:** A specialized `test-engineer` agent writes a failing test. The `implementation` agent is strictly gated from editing the test file and must write source code until the test passes.
*   **Task-Scoped Context Slicing:** Execution agents only receive the specific paragraphs of the PRD/Architecture relevant to their ticket, drastically reducing token bloat and preventing "Lost in the Middle" hallucinations.
*   **Team-Safe Memory:** AI knowledge is stored as an append-only event log (`.agents/memory-events/`) to prevent Git merge conflicts in team environments.
*   **Hybrid MCPs:** Plug-and-play support for Model Context Protocol (MCP) servers (GitHub, Postgres, Exa) with secure `.env` interpolation.

## 🛠️ Project Status
*Currently in the Architectural Definition and Prototyping Phase. Active development is focused on the Orchestrator DAG script and JSON Schema contracts.*