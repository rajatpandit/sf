const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(process.cwd(), '.agent-state.json');
const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

function readState() {
  if (!fs.existsSync(STATE_FILE)) return null;
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function readTasks() {
  if (!fs.existsSync(TASKS_FILE)) return null;
  return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

function getActiveTask() {
  const tasks = readTasks();
  if (!tasks || !tasks.tasks) return null;
  return tasks.tasks.find(t => t.status === 'in_progress') || tasks.tasks.find(t => t.status === 'todo');
}

function updateTaskStatus(taskId, status, assigned_role = null) {
  const tasks = readTasks();
  if (!tasks) return;
  const task = tasks.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = status;
    if (assigned_role) task.assigned_role = assigned_role;
    writeTasks(tasks);
  }
}

module.exports = {
  readState,
  writeState,
  readTasks,
  writeTasks,
  getActiveTask,
  updateTaskStatus
};