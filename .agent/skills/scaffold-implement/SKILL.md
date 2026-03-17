---
name: scaffold-implement-frontend
description: Execute a Gold Standard Frontend plan (Solito/Tamagui) with Monorepo and Platform-leakage gates.
---

# Frontend Implementation & Verification

## Variables
plan_file: $ARGUMENTS
gold_standard_rules: $(cat .agent/specs/frontend-gold-specs.md)

## Instructions
- **Role:** Senior Frontend/Mobile Engineer & UI Auditor.
- **Protocol:**
  1. **Execute:** Implement the next open `[ ]` phase in `{plan_file}` within the `frontend/` directory.
  2. **Verify (The Gate):** Execute the plan's `#### Verification Gate`.
  3. **Framework Purity Check:** In `packages/app/features/**/domain`, run `grep -r "import.*from 'tamagui'\|import.*from 'react-native'"` — this MUST be empty.
  4. **Web/Native Parity:** Run `npx tamagui build` to verify tokens and `npm run build:next` to check for SSR hydration leaks (like usage of `window` in shared code).
  5. **Commit:** `git commit -m "feat(frontend): completed phase <X>"` only if ALL gates pass.

## Report Output
- **Current Phase:** <Number>
- **Compiler Status:** <Tamagui/Next.js output>
- **Hydration Safety:** <Confirmed/Violated>
- **Overall Gate Status:** <PASSED/FAILED>