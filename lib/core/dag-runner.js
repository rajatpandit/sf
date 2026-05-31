const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { readState, writeState, getActiveTask, updateTaskStatus } = require('./state-manager');
const { getAdapter } = require('../adapters/index');
const { mergeMcpConfig } = require('./mcp-merger');
const { checkoutAgentBranch, commitAndRevert } = require('./git-sandbox');

// Maps discovery phases to their expected output artifact
const EXPECTED_ARTIFACTS = {
  'memory-agent': 'docs/context-summary.md',
  'product-manager': 'docs/prd.md',
  'architect': 'docs/architecture.md',
  'planning': 'tasks.json'
};

function verifyArtifact(phase) {
  const artifactPath = EXPECTED_ARTIFACTS[phase];
  if (!artifactPath) return true; // No specific artifact required for this phase
  
  const fullPath = path.join(process.cwd(), artifactPath);
  return fs.existsSync(fullPath);
}

function runDag() {
  let state = readState();
  if (!state) {
    state = {
      current_phase: 'memory-agent',
      active_task_id: null,
      status: 'running',
      retries: 0,
      history: []
    };
  }

  if (state.status === 'paused') {
    console.log("[Orchestrator] State is paused. Use `sf --resume` to continue.");
    process.exit(1);
  }

  // Read Pipeline config
  const pipelinePath = path.join(process.cwd(), '.agent-pipeline.yml');
  if (!fs.existsSync(pipelinePath)) {
    console.error("[Orchestrator] Missing .agent-pipeline.yml");
    process.exit(1);
  }
  const pipeline = yaml.parse(fs.readFileSync(pipelinePath, 'utf8'));

  // Load playbook
  const playbookPath = path.join(require('os').homedir(), '.agent-system', 'playbooks', `${pipeline.playbook}.yml`);
  const playbook = yaml.parse(fs.readFileSync(playbookPath, 'utf8'));

  while (state.status === 'running') {
    const currentPhaseDef = playbook.phases.find(p => p.id === state.current_phase);
    
    // Determine the active tool and model
    const agentTool = pipeline.global_settings.agent_tool || 'pi';
    const adapter = getAdapter(agentTool);
    
    // Simplistic routing for model tiers (Execution gets fast, others get reasoning)
    const isExecutionPhase = ['test-engineer', 'implementation', 'reviewer'].includes(state.current_phase);
    const modelTarget = isExecutionPhase ? pipeline.model_tiering.fast : pipeline.model_tiering.reasoning;

    // Prepare Environment & MCP
    const env = Object.assign({}, process.env);
    if (env.AI_GATEWAY_URL) env.OPENAI_BASE_URL = env.AI_GATEWAY_URL;
    const mcpConfig = mergeMcpConfig();
    const systemPromptPath = path.join(require('os').homedir(), '.agent-system', 'roles', `${state.current_phase}.md`);
    
    if (!currentPhaseDef) {
      console.log("[Orchestrator] Pipeline complete.");
      state.status = 'completed';
      writeState(state);
      break;
    }

    if (state.current_phase === 'execution-loop') {
      const activeTask = getActiveTask();
      if (!activeTask) {
        console.log("[Orchestrator] No tasks remaining in execution loop.");
        state.current_phase = currentPhaseDef.next;
        writeState(state);
        continue;
      }
      
      state.active_task_id = activeTask.id;
      updateTaskStatus(activeTask.id, 'in_progress');
      checkoutAgentBranch(activeTask.id);

      // Adversarial TDD Handoff
      console.log(`[Orchestrator] Starting Test Engineer for ${activeTask.id}`);
      let testExit = adapter.run('test-engineer', path.join(require('os').homedir(), '.agent-system', 'roles', `test-engineer.md`), activeTask.context_slice, env, mcpConfig, pipeline.model_tiering.fast);
      
      if (testExit === 0) {
        console.error(`[Orchestrator] TAUTOLOGY DETECTED. Test Engineer exited 0 (passed) without implementation.`);
        state.retries++;
        if (state.retries >= pipeline.global_settings.max_retries) state.status = 'paused';
        writeState(state);
        continue;
      }

      console.log(`[Orchestrator] Starting Implementation for ${activeTask.id}`);
      let implExit = adapter.run('implementation', path.join(require('os').homedir(), '.agent-system', 'roles', `implementation.md`), activeTask.context_slice, env, mcpConfig, pipeline.model_tiering.fast);
      if (implExit !== 0) {
        console.error(`[Orchestrator] Implementation failed tests. Retrying...`);
        state.retries++;
        if (state.retries >= pipeline.global_settings.max_retries) state.status = 'paused';
        writeState(state);
        continue;
      }

      console.log(`[Orchestrator] Starting Reviewer for ${activeTask.id}`);
      let revExit = adapter.run('reviewer', path.join(require('os').homedir(), '.agent-system', 'roles', `reviewer.md`), activeTask.context_slice, env, mcpConfig, pipeline.model_tiering.fast);
      if (revExit === 0) {
        console.log(`[Orchestrator] Task ${activeTask.id} approved.`);
        updateTaskStatus(activeTask.id, 'done');
        commitAndRevert(activeTask.id, activeTask.title);
        state.retries = 0;
      } else {
        console.error(`[Orchestrator] Reviewer rejected task.`);
        state.retries++;
        if (state.retries >= pipeline.global_settings.max_retries) state.status = 'paused';
      }
      writeState(state);

    } else {
      // Normal Discovery Phase
      console.log(`[Orchestrator] Executing Phase: ${state.current_phase}`);
      
      // Inject self-healing feedback if we are retrying
      let runContext = "";
      if (state.retries > 0) {
        runContext = `[SYSTEM FEEDBACK]: Your last execution FAILED. You must actively use the 'write' tool to save your output to disk. Do not just print to the console.`;
        console.warn(`[Orchestrator] Retry ${state.retries}/${pipeline.global_settings.max_retries}. Injecting feedback.`);
      }

      let exitCode = adapter.run(state.current_phase, systemPromptPath, runContext, env, mcpConfig, modelTarget);
      
      // Strict Artifact Verification
      if (exitCode === 0 && !verifyArtifact(state.current_phase)) {
        console.error(`[Orchestrator] ERROR: Expected artifact '${EXPECTED_ARTIFACTS[state.current_phase]}' was not generated.`);
        exitCode = 1; // Force failure so the loop retries
      }

      state.history.push({
        phase: state.current_phase,
        exit_code: exitCode,
        timestamp: Date.now()
      });

      if (exitCode === 0) {
        if (pipeline.global_settings.require_approval && pipeline.global_settings.require_approval[state.current_phase]) {
          console.log(`[Orchestrator] Yield Point reached for ${state.current_phase}.`);
          state.status = 'paused';
        }
        state.current_phase = currentPhaseDef.next;
        state.retries = 0;
      } else {
        state.retries++;
        if (state.retries >= pipeline.global_settings.max_retries) {
          console.error(`[Orchestrator] Max retries (${pipeline.global_settings.max_retries}) reached. Pausing DAG.`);
          state.status = 'paused';
        }
      }
      writeState(state);
    }
  }
}

module.exports = { runDag };