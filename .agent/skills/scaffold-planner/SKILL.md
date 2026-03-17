# Frontend Scaffold Planning
Create a new plan to build the Gold Standard Frontend using the exact specified markdown Plan Format. Follow the Instructions to merge the user's idea with the architectural rules.

## Variables
current_date: $(date +%Y-%m-%d)
user_idea: $(cat .agent/input/scaffold_description.md)
gold_standard_rules: $(cat .agent/specs/frontend-gold-specs.md)

## Instructions
- **Role:** You are a Senior Frontend Architect specializing in Solito, Tamagui, and Hexagonal React patterns.
- **Goal:** Create a granular, step-by-step implementation plan that builds the user_idea while strictly adhering to the gold_standard_rules.
- **Constraint Checklist:**
    1. Read the `gold_standard_rules` carefully.
    2. Ensure the plan includes specific tasks for:
        - Turborepo / Monorepo structure setup.
        - Tamagui v2 configuration (Themes, Tokens, Compiler).
        - Solito Universal Routing (Shared between Next.js and Expo).
        - Firebase Auth Integration (Native + Web bridges).
        - Hexagonal Feature Structure (Domain/Schema -> Hooks -> Screens).
- **Granularity Strategy:** Break the plan into small, atomic phases. One logical layer per phase (e.g., UI Kit, then Auth, then Feature Logic).
- **Verification Gates (MANDATORY):** Every phase MUST end with a #### Verification Gate subsection containing:
    - **Files Must Exist:** Exact file paths expected after the phase.
    - **Commands:** Shell commands to execute (e.g., `npx expo export`, `npm run build:next`).
    - **Assertions:** Grep/search patterns to validate (e.g., check for no 'window' usage in shared packages).
    - **Pass Criteria:** Concrete definition of "done."
- **ID Generation:** Generate a unique `plan_id` (e.g., `frontend-scaffold-<timestamp>`).
- **Output:** Create the plan in `.agent/specs/` with filename: `plan-{current_date}-{plan_id}.md`.

## Plan Format

```md
# Scaffold: Frontend Gold Standard Implementation Plan

## Metadata
plan_id: `{plan_id}`
date: `{current_date}`

## Project Goal
<Summarize the `user_idea` for the frontend here.>

## Architectural Compliance
**Frontend Hexagonal Strategy:**
- **Shared Package (packages/app):** <Describe the Domain/Use-Case logic.>
- **Design System (packages/ui):** <Describe the Tamagui tokens/theme setup.>
- **Platform Shells:** <Describe Next.js and Expo entry points.>

## Implementation Plan

### Phase 1: Monorepo & Tamagui Foundation
<Tasks for: Turborepo init, tamagui.config.ts, and shared design tokens.>
#### Verification Gate
- **Files Must Exist:** [packages/ui/src/tamagui.config.ts, apps/next/next.config.js, apps/expo/app.json]
- **Commands:** `npx tamagui build`
- **Pass Criteria:** UI package compiles without errors.

### Phase 2: Navigation & Solito Setup
<Tasks for: Universal router configuration and base layout groups.>
#### Verification Gate
- **Pass Criteria:** Root navigation works on both Web and Mobile simulators.

### Phase 3: Identity Infrastructure (Firebase)
<Tasks for: AuthProvider wrapper, JWT interceptors in Axios, and Protected Route logic.>
#### Verification Gate
- **Assertions:** `grep -r "getIdToken" packages/app` confirms JWT injection logic exists.

### Phase 4: Domain Core & Feature Logic
<Tasks for: Zod schemas, Port interfaces, and TanStack Query hooks for the feature.>
#### Verification Gate
- **Assertions:** `grep -r "import { Tamagui }" packages/app/features/<name>/hooks.ts` MUST return empty (Logic/UI separation).

### Phase 5: Presentation Layer (The UI)
<Tasks for: Building the actual screens using Tamagui and the "Adapt" pattern for Modals.>
#### Verification Gate
- **Commands:** `cd apps/next && npm run build` (Verify no SSR/Hydration errors).

## Step by Step Tasks
<List step by step tasks as h3 headers.>
```

## Validation Commands
- `npm run lint` - Validate project-wide linting.
- `npx expo export` - Validate native bundle integrity.
- `npm run build:next` - Validate web SSR/Compiler integrity.
