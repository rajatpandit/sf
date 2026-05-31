const { execSync } = require('child_process');

function execGit(cmd) {
  try {
    return execSync(`git ${cmd}`, { stdio: 'pipe' }).toString().trim();
  } catch (err) {
    throw new Error(`Git command failed: git ${cmd}\n${err.message}`);
  }
}

function checkoutAgentBranch(taskId) {
  // Check if branch exists
  const branchName = `agent/${taskId}`;
  try {
    execGit(`checkout -b ${branchName}`);
  } catch (err) {
    // Branch might exist, try checking it out
    execGit(`checkout ${branchName}`);
  }
}

function claimBranch(taskId) {
  const branchName = `human/${taskId}`;
  try {
    execGit(`checkout -b ${branchName}`);
  } catch (err) {
    execGit(`checkout ${branchName}`);
  }
  return branchName;
}

function commitAndRevert(taskId, title) {
  execGit(`add .`);
  execGit(`commit -m "feat: ${title} [${taskId}]"`);
  execGit(`checkout main`);
}

module.exports = {
  checkoutAgentBranch,
  claimBranch,
  commitAndRevert
};