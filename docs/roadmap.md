# Roadmap and V2 Vision

This document outlines the future vision and planned capabilities for Version 2 of the AI Software Engineering System.

## Integrated Kanban UI
A local web interface will sit on top of the `.tasks.json` state machine.
*   Developers will be able to drag and drop tickets, manually edit `context_slices`, and assign tasks to humans or specific AI roles visually rather than editing JSON files.
*   The UI will display real-time terminal streams of the Orchestrator's active agent loop.

## Headless CI/CD Execution
The Orchestrator will support a `--headless` flag for continuous integration environments. 
*   The system will automatically trigger on issue creation or pull request comments.
*   It will disable interactive prompts and gracefully exit or commit partial work upon hitting retry limits.

## Parallel Branch Execution
The system will abandon sequential task processing to drastically reduce delivery time.
*   The Orchestrator will spawn multiple AI sessions concurrently for independent tasks.
*   Each agent will operate in its own Git-sandboxed branch.
*   The orchestrator will manage merge conflicts using the Adversarial TDD process upon branch completion.

## Automated Version Upgrades
The system will introduce a `version-upgrade` playbook to handle framework bumps (e.g., React 17 to 19).
*   Agents will utilize Abstract Syntax Tree (AST) parsing to perform precise codemods rather than generating text.
*   The Orchestrator will rely on the existing test suite to verify the upgrade rather than writing new tests.

## Technology Porting
The system will introduce a `tech-port` playbook to rewrite modules across languages (e.g., Node.js to Golang).
*   Two implementation agents will run concurrently. One reads the legacy code; the other writes the new code.
*   The Orchestrator will use a compatibility harness to run the legacy tests against the new compiled binary.