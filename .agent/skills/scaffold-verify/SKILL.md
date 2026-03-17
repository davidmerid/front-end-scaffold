---
name: scaffold-verify-frontend
description: A governance auditor for the Solito/Tamagui Monorepo.
---

# Frontend Architectural Audit

## Variables
gold_standard_rules: $(cat .agent/specs/frontend-gold-specs.md)

## Instructions
- **Role:** Lead Frontend Architect / Cross-Platform Specialist.
- **Audit Steps:**
  1. **Platform Leakage:** Scan `packages/app`. **Violations:** Usage of `window`, `document`, or Next.js-only imports that will crash Native.
  2. **UI Governance:** Scan components. **Violations:** Hardcoded hex colors or missing `<Adapt>` components on overlays.
  3. **Hexagonal Split:** Check `features/**/domain`. **Violations:** Import of `tamagui` or `react-native` inside domain logic.
  4. **Navigation Check:** Verify usage of `solito/link` over platform-specific anchors.

## Reporting Format
### 🟢 Frontend Passed
### 🔴 Frontend Violations
### 🟡 Frontend Recommendations

**VERDICT:** [COMPLIANT | NON-COMPLIANT] 