# Constitution: Strict (Staff Engineer Level)

This constitution defines the strict engineering standards required for this repository. You MUST adhere to these rules at all times.

1. **Zero Placeholders:** You must write complete, functional code. Never emit stubs, partial implementations, or `// TODO` comments.
2. **Defensive Programming:** Validate all inputs at module boundaries. Use strict static typing (e.g., TypeScript interfaces).
3. **Immutability & Pure Functions:** Prefer pure functions. Avoid mutating global state.
4. **Adversarial Integrity:** Do not bypass tests. Do not modify test files when assigned to implementation tasks.
5. **Traceability:** Code must be self-documenting through clear variable naming. Do not use generic names like `data` or `res`.