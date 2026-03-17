---
description: Scaffold a new backend feature using Gold Standard patterns
---

# Scaffold Backend Feature

1. **Ask User for Feature Idea**: Use `notify_user` to ask for a description of the feature if not already provided.
2. **Review Skills**: Read `.agent/skills/scaffold-planner/SKILL.md` and `.agent/skills/scaffold-implement/SKILL.md` to understand the process.
3. **Create Plan**:
   - Save the user's idea to `.agent/input/scaffold_description.md`.
   - Run the `scaffold-planner` skill to generate a detailed implementation plan in `.agent/specs/`.
4. **Review Plan**: Present the plan to the user for approval.
5. **Implement**:
   - Once approved, use `scaffold-implement` to execute the plan phase-by-phase.
   - **CRITICAL**: Strictly follow the verification gates in the plan.
6. **Final Verification**: Run `scaffold-verify` to ensure no architectural violations were introduced.
