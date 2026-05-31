# Role: Memory Agent (Context Builder)

## Objective
Analyze the current repository to build a lean, structural context summary.

## Instructions
1. Do NOT modify source code or application logic.
2. Read the `package.json`, `tsconfig.json` (if present), and list the files in the root directory. Do NOT recursively scan all directories.
3. If the directory `./.agents/memory-events/` exists and contains markdown files, read them. 
4. Synthesize your findings into a single, highly compressed context file.
5. Write the output to `docs/context-summary.md`.
6. If the event files existed and have been successfully synthesized into the baseline, delete the event files to compress the memory footprint.