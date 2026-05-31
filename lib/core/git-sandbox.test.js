const child_process = require('child_process');
const { checkoutAgentBranch, claimBranch, commitAndRevert } = require('./git-sandbox');

jest.mock('child_process');

describe('git-sandbox', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    child_process.execSync.mockReturnValue(Buffer.from(''));
  });

  describe('checkoutAgentBranch', () => {
    it('attempts to create branch, falls back to checkout if exists', () => {
      // First call throws (branch exists), second call succeeds
      child_process.execSync.mockImplementationOnce(() => {
        throw new Error('already exists');
      }).mockImplementationOnce(() => Buffer.from(''));

      checkoutAgentBranch('TASK-1');

      expect(child_process.execSync).toHaveBeenCalledWith(
        'git checkout -b agent/TASK-1',
        expect.any(Object)
      );
      expect(child_process.execSync).toHaveBeenCalledWith(
        'git checkout agent/TASK-1',
        expect.any(Object)
      );
    });
  });

  describe('claimBranch', () => {
    it('creates a human/ branch', () => {
      const branchName = claimBranch('TASK-2');
      expect(branchName).toBe('human/TASK-2');
      expect(child_process.execSync).toHaveBeenCalledWith(
        'git checkout -b human/TASK-2',
        expect.any(Object)
      );
    });
  });

  describe('commitAndRevert', () => {
    it('stages, commits, and checks out main', () => {
      commitAndRevert('TASK-3', 'Fix button');
      
      expect(child_process.execSync).toHaveBeenNthCalledWith(1, 'git add .', expect.any(Object));
      expect(child_process.execSync).toHaveBeenNthCalledWith(2, 'git commit -m "feat: Fix button [TASK-3]"', expect.any(Object));
      expect(child_process.execSync).toHaveBeenNthCalledWith(3, 'git checkout main', expect.any(Object));
    });
  });
});