---
description: Audit the codebase for Gold Standard compliance
---

# Audit Codebase

1. **Run Static Analysis**:
   - Run `./mvnw checkstyle:check` to check code style.
   - Run `./mvnw test` to ensure all tests pass.
2. **Run Architectural Audit**:
   - Use the `scaffold-verify` skill to scan for architectural violations (domain purity, layer separation).
3. **Run Code Review**:
   - Use the `code-review` skill to analyze recent changes or specific files requested by the user.
4. **Report**:
   - Compile findings into a report (Markdown artifact).
   - Rate the codebase compliance (Red/Yellow/Green).
   - Propose remediation steps for any violations.
