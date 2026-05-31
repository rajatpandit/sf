# CLI Command Reference

This document defines the primary commands used to control the Orchestrator and manage the DAG state machine.

## Run the Orchestrator
Use the default command to start or resume the active pipeline.
```bash
sf
```

## Override the default playbook
Pass the `--playbook` flag to execute a specific workflow defined in the global registry.
```bash
sf --playbook refactor
```

## Claim a task for human execution
Assign a specific task to a human developer. This pauses AI execution for the specified task and creates a local Git branch.
```bash
sf claim TASK-ID
```

## Complete a human task
Signal the Orchestrator that human execution is complete. This stages the code and triggers the AI reviewer.
```bash
sf complete TASK-ID
```

## Reject an AI Pull Request
Send a completed task back to the previous phase with explicit feedback.
```bash
sf reject TASK-ID --reason "Test mocks the database incorrectly."
```

## Resume a paused pipeline
Restart the Orchestrator after a manual interrupt or yield point.
```bash
sf --resume
```