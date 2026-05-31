---
layout: home

hero:
  name: "Synth Forge"
  text: "The AI Exoskeleton for Developers."
  tagline: "Prioritizing determinism, token efficiency, Git-native workflows, and team safety over runaway autonomous loops."
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: View Architecture
      link: /02-architecture
---

<style>
/* Custom Landing Page Typography and Layout */
.home-content {
  max-width: 800px;
  margin: 64px auto;
  padding: 0 24px;
  font-family: var(--vp-font-family-base);
}

.home-section {
  margin-bottom: 80px;
  border-top: 1px solid var(--vp-c-border);
  padding-top: 40px;
}

.home-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  color: var(--vp-c-brand-1);
}

.home-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .home-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

.home-link-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.home-link {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  transition: color 0.2s ease, transform 0.2s ease;
  border: 1px solid transparent;
}

.home-link:hover {
  color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.home-link span.mono {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-right: 12px;
}

.home-divider {
  height: 1px;
  background: var(--vp-c-border);
  margin: 64px 0;
  width: 100%;
}
</style>

<div class="home-content">

  <div class="home-section">
    <h2>Deployment Paths</h2>
    <div class="home-grid">
      <div class="home-link-group">
        <a href="/solo-developer" class="home-link"><span class="mono">01</span> Solo Developer Guide</a>
      </div>
      <div class="home-link-group">
        <a href="/enterprise-team" class="home-link"><span class="mono">02</span> Enterprise Team Guide</a>
      </div>
    </div>
  </div>

  <div class="home-section">
    <h2>Core Concepts</h2>
    <div class="home-grid">
      <div class="home-link-group">
        <a href="/01-vision-strategy" class="home-link"><span class="mono">01</span> Vision & Strategy</a>
        <a href="/02-architecture" class="home-link"><span class="mono">02</span> System Architecture</a>
        <a href="/03-developer-ergonomics" class="home-link"><span class="mono">03</span> Developer Ergonomics</a>
        <a href="/04-execution-tdd" class="home-link"><span class="mono">04</span> Execution & TDD</a>
      </div>
      <div class="home-link-group">
        <a href="/05-extensibility-mcp" class="home-link"><span class="mono">05</span> Extensibility & MCP</a>
        <a href="/06-roles-playbooks" class="home-link"><span class="mono">06</span> Roles & Playbooks</a>
        <a href="/07-memory-management" class="home-link"><span class="mono">07</span> Memory Management</a>
      </div>
    </div>
  </div>

  <div class="home-section">
    <h2>Reference & Appendix</h2>
    <div class="home-grid">
      <div class="home-link-group">
        <a href="/12-cli-reference" class="home-link"><span class="mono">REF</span> CLI Command Reference</a>
        <a href="/13-troubleshooting" class="home-link"><span class="mono">REF</span> Troubleshooting & Logs</a>
        <a href="/roadmap" class="home-link"><span class="mono">REF</span> Roadmap & Vision</a>
      </div>
      <div class="home-link-group">
        <a href="/08-data-schemas" class="home-link"><span class="mono">APP</span> Data Schemas</a>
        <a href="/09-code-review-guidelines" class="home-link"><span class="mono">APP</span> Code Review Guidelines</a>
        <a href="/10-managing-tech-debt" class="home-link"><span class="mono">APP</span> Managing Tech Debt</a>
        <a href="/agents" class="home-link"><span class="mono">APP</span> Agent Guardrails</a>
        <a href="/constitution" class="home-link"><span class="mono">APP</span> Docs Constitution</a>
      </div>
    </div>
  </div>

</div>
