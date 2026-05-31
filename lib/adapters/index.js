const piAdapter = require('./pi-adapter');
const opencodeAdapter = require('./opencode-adapter');
const geminiAdapter = require('./gemini-adapter');

function getAdapter(toolName) {
  switch (toolName.toLowerCase()) {
    case 'pi':
      return piAdapter;
    case 'opencode':
      return opencodeAdapter;
    case 'gemini':
      return geminiAdapter;
    default:
      console.warn(`[Orchestrator] Unknown tool "${toolName}". Falling back to Pi.`);
      return piAdapter;
  }
}

module.exports = { getAdapter };