---
description: Create a Gold Standard implementation plan for a new feature or project
---

# Scaffold Planner

1. **Input**:
   - Ask the user for a description of the feature or system they want to build.
   - Save this description to `.agent/input/scaffold_description.md` (create if needed).
2. **Plan**:
   - Run the `scaffold-planner` skill.
   - This will generate a comprehensive, phase-by-phase implementation plan in `.agent/specs/`.
3. **Review**:
   - Present the generated plan to the user for approval.
   - Once approved, you can use `/scaffold-implement` to execute it.
