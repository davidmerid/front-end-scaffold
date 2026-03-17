# Project: Gold Standard Solito/Tamagui Frontend Scaffold
**Goal:** Build a production-ready, universal (Web + Mobile) software factory using Solito, Tamagui v2, and Hexagonal Architecture.

## 1. Technology Stack
- **Framework:** Solito 5+ (Next.js + Expo Router)
- **UI Engine:** Tamagui v2+ (Optimizing Compiler)
- **Language:** TypeScript 5+ (Strict Mode)
- **State Management:** TanStack Query v5 (Server State) & Zustand (Local State)
- **Forms & Validation:** React Hook Form + Zod
- **Auth Provider:** Firebase (Web JS SDK & React Native Firebase)
- **Build Tool:** Turborepo (Monorepo management)

## 2. Architectural Guidelines (Frontend Hexagonal)
The project must strictly decouple business logic from UI frameworks to ensure code can be tested and swapped without breaking the "Core."

### Monorepo Structure
* **`apps/next`**: The Web shell. Next.js App Router, SSR configuration, and Web-only providers.
* **`apps/expo`**: The Mobile shell. Expo Router, Native modules, and Mobile-only providers.
* **`packages/ui`**: The Design System. Tamagui configuration, themes, tokens, and pure UI components.
* **`packages/app`** (The Hexagon - Shared Code)
    * **`features/<name>`**: Vertical domain slices.
        * `domain`: Zod schemas and TS interfaces (The Contract). **Constraint:** NO Tamagui/RN imports.
        * `hooks`: Application Use Cases (Primary Ports). Data fetching and business logic hooks.
        * `api`: Driven Ports. API client implementations (Axios/Firebase) to talk to the backend.
        * `screen.tsx`: Presentation Layer. Pure Tamagui views.

## 3. Key Implementation Features

### A. Universal Component Strategy
* **Tamagui Primitives:** Use `YStack`, `XStack`, and `Text` for all layouts.
* **The Adapt Pattern:** All Modals, Selects, and Dialogs must use Tamagui’s `<Adapt>` to render as a Native Bottom Sheet on touch devices and a Dialog on web.
* **Responsive Design:** Use Tamagui media queries (`$gtSm`, etc.) instead of manual window-width listeners.

### B. Identity & API Security
* **Firebase Bridge:** A universal `useAuth` hook that handles persistence on Web (Cookies/Local) and Native (SecureStore).
* **JWT Interceptor:** An Axios/Fetch wrapper that automatically injects the Firebase `IdToken` into the `Authorization` header for every request to the Spring Boot backend.
* **Protected Routes:** Usage of Expo Router's `segments` and Next.js `middleware` to redirect unauthenticated users to `/login`.

### C. Performance & DX
* **FlashList:** Mandatory usage of `@shopify/flash-list` for all scrollable lists.
* **Zod Integration:** Every API response MUST be parsed by a Zod schema before reaching the UI to ensure the "Contract" with the Java backend is intact.
* **Theme Tokens:** Zero usage of hardcoded hex codes. All colors must refer to Tamagui tokens (e.g., `$color.red10`).

## 4. DevOps & Production Readiness
* **Turborepo:** Configure `turbo.json` for remote caching of builds and lints.
* **Environment Variables:** Use a unified `.env.example`. Access variables via a shared `packages/app/utils/env` to handle `process.env` (Web) vs `Constants.expoConfig` (Mobile).
* **Bundle Analysis:** CI/CD must include a stage to check bundle sizes for the web app.

## 5. Verification Strategy
Every implementation phase MUST include a **Verification Gate**. Implementer agents will NOT proceed if a gate fails.

### Gate Types By Layer
| Layer | Mandatory Checks |
|---|---|
| **Foundation** | `npx tamagui build` succeeds. Monorepo symlinks are valid. `turbo.json` is configured. |
| **Identity** | `grep -r "getIdToken"` exists in API adapters. Firebase config is correctly initialized for both shells. |
| **Domain** | **STRICT** — `grep -r` for 'tamagui', 'react-native', or 'solito' in `domain/` must return zero results. |
| **Presentation** | `npm run build:next` succeeds (No SSR/Hydration errors). `<Adapt>` usage verified in new UI components. |
| **Logic** | Vitest unit tests pass for Zod schemas and hook logic. |
| **Quality** | `npm run lint` passes. No hardcoded hex colors found in the codebase. |

## 6. Implementation Roadmap
1. **Init:** Turborepo setup with Solito/Tamagui starter.
2. **Design System:** Customizing tokens and themes in `packages/ui`.
3. **Identity:** Implementing the Universal Firebase Auth bridge.
4. **Feature:** Building the "Reference Task" feature (Schema -> Hooks -> Screen).