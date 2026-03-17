# Frontend Gold Standard Architecture Specifications (2026 Edition)

## 1. Core Architecture (Frontend Hexagonal)
- **Dependency Rule:** The `features/<name>/domain` package must be framework-agnostic. No Tamagui, No Expo, No Next.js.
- **Package Layout (within packages/app):**
  - `features/<name>/domain`: Zod schemas, TypeScript interfaces, and pure business logic.
  - `features/<name>/hooks`: Application Use Cases (TanStack Query / Zustand). This is the "Primary Port".
  - `features/<name>/api`: Secondary Adapters (Axios/Fetch calls to Spring Boot).
  - `features/<name>/components`: Reusable UI atoms for this feature.
  - `features/<name>/screen.tsx`: The Entry Adapter (The actual view).

## 2. Universal UI Standards (Tamagui v2.0+)
- **Styling:** Strictly token-based styling. Use `$size`, `$color`, and `$radius`.
- **Platform Adaptivity:** - Mandatory use of `<Adapt>` for all overlays (Dialog, Popover, Select).
  - Web = Modal/Dialog; Mobile = BottomSheet (`@gorhom/bottom-sheet`).
- **Performance:**
  - All lists MUST use `@shopify/flash-list`.
  - Image handling via `expo-image` (for caching and blur-hash support).

## 3. Navigation & Routing (Solito + Expo Router)
- **Universal Links:** Use `Link` from `solito/link`.
- **File-based Routing:** - `apps/next/pages` (or `app`) must mirror `apps/expo/app`.
- **State Sync:** URL parameters must be the source of truth for screen state to ensure "Copy-Paste URL" works on Web.

## 4. Identity & Firebase Integration (Universal)
- **Auth Bridge:** Use a platform-agnostic `useAuth` hook.
- **Native:** Implementation via `react-native-firebase`.
- **Web:** Implementation via `firebase/auth`.
- **JWT Governance:**
  - Every outgoing API call must inject `Authorization: Bearer <token>`.
  - Automatic 401 interception to trigger re-login or token refresh.

## 5. State Management & Data Fetching
- **Server State:** TanStack Query v5.
  - Mandatory `queryKeys` factory for every feature.
  - Stale-while-revalidate (SWR) patterns for offline-ready feel.
- **Local State:** Zustand for lightweight UI state (sidebars, theme toggles).
- **Forms:** React Hook Form + Zod validation (Shared with Domain Layer).

## 6. Observability & Quality
- **Error Boundaries:** Feature-level error boundaries to prevent full-app crashes.
- **Logging:** Sentry integration for production crash reporting.
- **The "Hydration" Rule:** Use `useIsomorphicLayoutEffect` or Tamagui's `isWeb` checks to prevent Next.js hydration mismatches.

## 7. DevOps & CI/CD
- **Monorepo Tooling:** Turborepo for caching builds/tests.
- **Environment Variables:** Strict `.env.example` mirroring. Use `expo-constants` for native env access.
- **Testing:** - `Vitest` for Domain logic.
  - `React Native Testing Library` for critical UI components.

## 8. Generic "Reference Feature" (The Starter Kit)
- **Feature:** `Task` (To match the Backend).
- **Components:**
  - `TaskSchema`: Zod object mirroring the Java `Task` entity.
  - `useTasks`: Hook for GET/POST/PUT/DELETE.
  - `TaskList`: FlashList implementation with pull-to-refresh.
  - `TaskDetail`: Universal screen with platform-specific "Adapt" sheets.