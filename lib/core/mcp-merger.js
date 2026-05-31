const fs = require('fs');
const path = require('path');
const os = require('os');

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

function interpolateEnv(obj, env) {
  let str = JSON.stringify(obj);
  str = str.replace(/\$\{([^}]+)\}/g, (match, p1) => {
    return env[p1] || '';
  });
  return JSON.parse(str);
}

function mergeMcpConfig() {
  const globalPath = path.join(os.homedir(), '.agent-system', 'config', 'mcp-defaults.json');
  const localPath = path.join(process.cwd(), '.agents', 'mcp-custom.json');
  
  let globalConfig = {};
  let localConfig = {};

  if (fs.existsSync(globalPath)) {
    globalConfig = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  }
  
  if (fs.existsSync(localPath)) {
    localConfig = JSON.parse(fs.readFileSync(localPath, 'utf8'));
  }

  const merged = deepMerge(globalConfig, localConfig);
  return interpolateEnv(merged, process.env);
}

module.exports = {
  mergeMcpConfig,
  deepMerge,
  interpolateEnv
};