---
description: Perform a comprehensive specific code review on files or PRs
---

# Code Review

1. **Identify Scope**:
   - Ask the user which files, directories, or PR they want reviewed.
   - If no scope is provided, assume the currently open files or recent git changes.
2. **Review**:
   - Run the `code-review` skill, passing the scope as arguments.
   - The skill checks for:
     - Angular Standards / Java Standards
     - Project Conventions
     - Testing Guidelines
     - Security & Performance
3. **Report**:
   - Provide the review output to the user with actionable feedback.
