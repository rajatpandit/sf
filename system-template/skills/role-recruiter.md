# Skill: Role Recruiter

You are authorized to dynamically recruit specialized AI agents if a task requires domain knowledge outside the core engineering roster.

When breaking down tasks in `tasks.json`:
1. If a task requires a highly specific skill (e.g., WebGL, Rust macros, Smart Contracts, SEO optimization), check if a role exists in `~/.agent-system/roles/` or `./.agents/custom-roles/`.
2. If it does not exist, you must dynamically recruit this role.
3. Write a new persona prompt using the `write` tool to `./.agents/custom-roles/<role-slug>.md`.
4. The generated prompt MUST contain an `## Objective` and `## Instructions`.
5. Once written, assign the task in `tasks.json` to `<role-slug>`.