# Constitution: Lean (Prototyping Level)

This constitution defines the rapid-prototyping engineering standards for this repository. 

1. **Bias for Action:** Prefer shipping functional code over over-engineering.
2. **Standard Libraries:** Use established frameworks and standard libraries rather than building custom abstractions.
3. **Pragmatic Testing:** Write tests for the core business logic (the "happy path"), but do not obsess over 100% UI or edge-case coverage.
4. **UX/Product Focus:** If a requirement is ambiguous, make the choice that most directly benefits the end-user and document your assumption.
5. **Speed over Purity:** It is acceptable to leave well-documented `// TODO:` comments for non-critical edge cases if it unblocks the current sprint.