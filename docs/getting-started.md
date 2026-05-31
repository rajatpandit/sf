# Getting Started

This guide explains how to install Synth Forge and initialize your first project. Synth Forge is designed to run locally, orchestrating standard developer tools to build software autonomously.

## Prerequisites
Ensure the following tools are available in your system path:
* Node.js (v18+)
* jq (JSON processor)
* pi (Coding agent CLI)
* Git

## Global Registry Initialization
Synth Forge requires a global directory to store core playbooks, roles, and default configurations. This prevents duplicating core prompts across every project.

Run the global initialization command:
```bash
sf system-init
```
This creates the `~/.agent-system/` directory and populates it with the default stable release.

## Project Scope Initialization
Initialize the system within a target repository to create local configuration files and link them to the global registry.

Run the project initialization command at your repository root:
```bash
sf project-init
```
This generates the `.agents/` directory, an `.agent-version` lockfile, and an `.agent-pipeline.yml` configuration file.

## Choose Your Deployment Path
Synth Forge adapts to your working environment. Depending on your context, proceed to the specific configuration guide:

*   **[Solo Developer Guide](solo-developer.md):** Optimizes for zero-infrastructure, speed, and direct API access.
*   **[Enterprise Team Guide](enterprise-team.md):** Optimizes for data privacy (AI Gateways), shared configurations, and conflict-free Git collaboration.