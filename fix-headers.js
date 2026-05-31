const fs = require('fs');
const path = require('path');
const dir = './docs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  // Remove numbering like "# 1. ", "## 1.1 ", "### 11.2 "
  content = content.replace(/^(#+)\s+\d+(?:\.\d+)*\.?\s+/gm, '$1 ');
  fs.writeFileSync(p, content);
});
