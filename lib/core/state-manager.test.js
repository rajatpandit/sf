const fs = require('fs');
const path = require('path');
const { readState, writeState, readTasks, writeTasks, getActiveTask, updateTaskStatus } = require('./state-manager');

jest.mock('fs');

describe('state-manager', () => {
  const STATE_FILE = path.join(process.cwd(), '.agent-state.json');
  const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('readState', () => {
    it('returns null if state file does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      expect(readState()).toBeNull();
    });

    it('returns parsed JSON if state file exists', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({ status: 'running' }));
      expect(readState()).toEqual({ status: 'running' });
    });
  });

  describe('writeState', () => {
    it('writes JSON string to state file', () => {
      writeState({ status: 'paused' });
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        STATE_FILE,
        JSON.stringify({ status: 'paused' }, null, 2),
        'utf8'
      );
    });
  });

  describe('getActiveTask', () => {
    it('returns null if no tasks file', () => {
      fs.existsSync.mockReturnValue(false);
      expect(getActiveTask()).toBeNull();
    });

    it('returns the in_progress task first', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        tasks: [
          { id: 'T1', status: 'todo' },
          { id: 'T2', status: 'in_progress' }
        ]
      }));
      expect(getActiveTask().id).toBe('T2');
    });

    it('returns the first todo task if no in_progress task', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        tasks: [
          { id: 'T1', status: 'done' },
          { id: 'T2', status: 'todo' }
        ]
      }));
      expect(getActiveTask().id).toBe('T2');
    });
  });

  describe('updateTaskStatus', () => {
    it('updates status and writes back to file', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify({
        tasks: [{ id: 'T1', status: 'todo' }]
      }));
      
      updateTaskStatus('T1', 'in_progress', 'human');
      
      const expectedTasks = {
        tasks: [{ id: 'T1', status: 'in_progress', assigned_role: 'human' }]
      };
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        TASKS_FILE,
        JSON.stringify(expectedTasks, null, 2),
        'utf8'
      );
    });
  });
});