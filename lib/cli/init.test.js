const fs = require('fs');
const path = require('path');
const { initProject } = require('./init');

jest.mock('fs');
jest.mock('os', () => ({
  homedir: () => '/mock/home'
}));

describe('Project Initialization', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fs.existsSync.mockReturnValue(false); // Simulate fresh project
  });

  it('creates required directories', () => {
    initProject();
    expect(fs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('.agents'));
    expect(fs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('custom-roles'));
    expect(fs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('memory-events'));
  });

  it('writes the pipeline and lockfile', () => {
    initProject();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('.agent-version'), 
      'v0.0.1', 
      'utf8'
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('.agent-pipeline.yml'), 
      expect.stringContaining('full-stack-epic'), 
      'utf8'
    );
  });

  it('exits early if already initialized', () => {
    fs.existsSync.mockReturnValue(true);
    initProject();
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});