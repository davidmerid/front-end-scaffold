---
description: Execute a scaffold plan using the scaffold-implement skill
---

# Execute Scaffold Plan

1. **Verify Plan Exists**:
   - Check if an implementation plan (`.agent/specs/*.md`) exists and is open or recently modified.
   - If not, ask the user for the path to the plan file.
2. **Execute**:
   - Run the `scaffold-implement` skill pointing to the plan file.
   - **CRITICAL**: Do NOT execute multiple phases at once unless explicitly told to "turbo". Do one phase, then verify, then ask for confirmation or proceed if the plan allows auto-execution.
   - **Verification**: Ensure all verification gates pass.
3. **Completion**:
   - Once all phases are complete, notify the user.
