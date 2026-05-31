#!/usr/bin/env node

const { program } = require('commander');
const { runDag } = require('../lib/core/dag-runner');
const { claimBranch, commitAndRevert } = require('../lib/core/git-sandbox');
const { updateTaskStatus, readState, writeState } = require('../lib/core/state-manager');

const { initProject } = require('../lib/cli/init');

program
  .name('sf')
  .description('Synth Forge - The AI Exoskeleton CLI')
  .version('0.0.1');

program
  .command('run')
  .description('Run the active pipeline (default action)')
  .option('--playbook <name>', 'Override default playbook')
  .option('--resume', 'Resume a paused pipeline')
  .action((options) => {
    if (options.resume) {
      let state = readState();
      if (state && state.status === 'paused') {
        state.status = 'running';
        state.retries = 0;
        writeState(state);
      }
    }
    runDag();
  });

program
  .command('claim <task_id>')
  .description('Claim a task for human execution')
  .action((taskId) => {
    updateTaskStatus(taskId, 'in_progress', 'human');
    const branch = claimBranch(taskId);
    console.log(`[SF] Claimed ${taskId}. Switched to branch ${branch}.`);
  });

program
  .command('complete <task_id>')
  .description('Mark a human-claimed task as ready for AI review')
  .action((taskId) => {
    commitAndRevert(taskId, 'Human Implementation');
    console.log(`[SF] Human task ${taskId} committed and staged for AI review.`);
    // In a real run, this might trigger the DAG for just the reviewer phase
  });

program
  .command('system-init')
  .description('Initialize the global ~/.agent-system registry')
  .action(() => {
    console.log('[SF] Global registry initialized.');
    // Handled mostly by install.sh, but can be triggered here
  });

program
  .command('project-init')
  .description('Initialize local .agents/ scope')
  .action(() => {
    initProject();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // Default to run
  runDag();
}