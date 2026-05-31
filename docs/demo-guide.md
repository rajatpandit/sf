# End-to-End Demo: Building a TypeScript TODO App

This guide provides a complete, step-by-step walkthrough of using Synth Forge to build a functional TypeScript application from scratch.

## Step 1: Install Synth Forge
If you haven't already, install the Orchestrator CLI globally.
```bash
./install.sh
```

## Step 2: Prepare the Git Sandbox
Synth Forge requires an initialized Git repository with at least one commit so it can safely branch and stash your code.
```bash
# Create a fresh directory
mkdir ts-todo-demo && cd ts-todo-demo

# Initialize Git and Node
git init
npm init -y
npm install -D typescript @types/node ts-node jest @types/jest
npx tsc --init

# Create .gitignore so we don't commit node_modules
echo "node_modules/" > .gitignore

# Make the initial commit
git add .
git commit -m "chore: initial project setup"
```

## Step 3: Initialize the Project Scope
Inject the Synth Forge architecture into your new project.
```bash
sf project-init
```
*(This creates the `.agents/` directory, `.agent-pipeline.yml`, and your state tracking files).*

By default, the pipeline is configured to use Google's Gemini models (`gemini-3.1-pro-preview` and `gemini-2.5-flash`). Ensure you have your `GEMINI_API_KEY` exported in your terminal or saved in your local `.env` file.

## Step 4: Plant the "Seed" Vision
The AI needs to know what you want to build. Create a `VISION.md` file in the root directory.

Run this command to generate the vision file:
```bash
cat << 'EOF' > VISION.md
# Project Vision
Build a simple, command-line TypeScript TODO application.
It should support three commands:
1. `npm start add "Task name"`
2. `npm start list`
3. `npm start done <id>`
Data should be saved locally to a `todos.json` file.
EOF

git add VISION.md
git commit -m "docs: add vision document"
```

## Step 5: Run Discovery & Yield
Start the Orchestrator.
```bash
sf run
```
**What happens next:**
1. The **Memory Agent** scans the repo and reads `VISION.md`.
2. The **Product Manager** writes strict XML requirements to `docs/prd.md`.
3. The **Architect** designs the TypeScript structures and writes `docs/architecture.md`.
4. **The Yield Point:** Because our pipeline requires approval, the Orchestrator pauses. 

Open `docs/architecture.md` to review the AI's design.

## Step 6: Resume & Execute
Once you are happy with the architecture, resume the state machine:
```bash
sf --resume
```
**What happens next:**
1. The **Planning Agent** writes `tasks.json`, breaking the PRD into 3-5 atomic tasks (e.g., JSON adapter, CLI parser).
2. The Orchestrator automatically branches to `agent/TASK-1`.
3. The **Test Engineer** writes a failing `todo.spec.ts` (Exit 1).
4. The **Implementation Agent** writes `src/todo.ts` until the test passes (Exit 0).
5. The **Reviewer** approves the code, stages the commit, and reverts to `main`.
6. The Orchestrator repeats this until all tasks are complete.

## Step 7: Run Your App
Once the Orchestrator finishes, run your new application:
```bash
npx ts-node src/index.ts add "Build a massive AI company"
npx ts-node src/index.ts list
```