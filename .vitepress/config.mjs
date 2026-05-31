import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "Synth Forge",
  description: "The AI Exoskeleton for Developers",
  srcDir: './docs',
  outDir: './build',
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Features', link: '/features' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Deployment Paths',
        items: [
          { text: 'Solo Developer Guide', link: '/solo-developer' },
          { text: 'Enterprise Team Guide', link: '/enterprise-team' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Vision & Strategy', link: '/01-vision-strategy' },
          { text: 'System Architecture', link: '/02-architecture' },
          { text: 'Developer Ergonomics', link: '/03-developer-ergonomics' },
          { text: 'Execution & TDD', link: '/04-execution-tdd' },
          { text: 'Extensibility & MCP', link: '/05-extensibility-mcp' },
          { text: 'Roles & Playbooks', link: '/06-roles-playbooks' },
          { text: 'Memory Management', link: '/07-memory-management' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'CLI Command Reference', link: '/12-cli-reference' },
          { text: 'Troubleshooting & Logs', link: '/13-troubleshooting' },
          { text: 'Roadmap & Vision', link: '/roadmap' }
        ]
      },
      {
        text: 'Appendix',
        collapsed: false,
        items: [
          { text: 'Data Schemas', link: '/08-data-schemas' },
          { text: 'AI Code Review', link: '/09-code-review-guidelines' },
          { text: 'Tech Debt & Refactoring', link: '/10-managing-tech-debt' },
          { text: 'Docs Constitution', link: '/constitution' },
          { text: 'Agent Guardrails', link: '/agents' }
        ]
      }
    ]
  }
}))