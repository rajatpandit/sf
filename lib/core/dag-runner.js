const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { readState, writeState, getActiveTask, updateTaskStatus } = require('./state-manager');
const { runPi } = require('../adapters/pi-runner');
const { checkoutAgentBranch, commitAndRevert } = require('./git-sandbox');

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
      let testExit = runPi('test-engineer', activeTask.context_slice);
      if (testExit === 0) {
        console.error(`[Orchestrator] TAUTOLOGY DETECTED. Test Engineer exited 0 (passed) without implementation.`);
        state.retries++;
        if (state.retries >= pipeline.global_settings.max_retries) state.status = 'paused';
        writeState(state);
        continue;
      }

      console.log(`[Orchestrator] Starting Implementation for ${activeTask.id}`);
      let implExit = runPi('implementation', activeTask.context_slice);
      if (implExit !== 0) {
        console.error(`[Orchestrator] Implementation failed tests. Retrying...`);
        state.retries++;
        if (state.retries >= pipeline.global_settings.max_retries) state.status = 'paused';
        writeState(state);
        continue;
      }

      console.log(`[Orchestrator] Starting Reviewer for ${activeTask.id}`);
      let revExit = runPi('reviewer', activeTask.context_slice);
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
      const exitCode = runPi(state.current_phase, "");
      
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
          state.status = 'paused';
        }
      }
      writeState(state);
    }
  }
}

module.exports = { runDag };