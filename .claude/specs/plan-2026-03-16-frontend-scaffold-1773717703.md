# Scaffold: Frontend Gold Standard Implementation Plan

## Metadata
plan_id: `frontend-scaffold-1773717703`
date: `2026-03-16`

## Project Goal
Build a production-ready, universal (Web + Mobile) frontend scaffold using Solito 5+, Tamagui v2, and Frontend Hexagonal Architecture. The scaffold serves as a "software factory" — a reusable starting point for any cross-platform application. It features a Turborepo monorepo with shared business logic, a Tamagui-based design system, Firebase Authentication (universal bridge for Web + Native), TanStack Query v5 for server state, Zustand for local state, and a reference "Task" feature that demonstrates the architecture end-to-end against the companion Spring Boot backend.

## Architectural Compliance

**Frontend Hexagonal Strategy:**

- **Shared Package (`packages/app`):** The Hexagon. Contains all domain logic, use-case hooks, and API adapters organized as vertical feature slices (`features/<name>/`). Each feature has `domain/` (Zod schemas + TS interfaces — zero UI framework imports), `hooks/` (TanStack Query + Zustand — the primary ports), `api/` (Axios/Firebase adapters — the driven ports), `components/` (feature-scoped reusable UI atoms), and `screen.tsx` (the entry adapter / presentation layer). This package is platform-agnostic and shared across Web and Mobile.

- **Design System (`packages/ui`):** The Tamagui configuration hub. Contains `tamagui.config.ts` with custom tokens (`$size`, `$color`, `$radius`, `$space`), theme definitions (light/dark), and reusable pure UI components (Button, Input, Card, etc.) built exclusively with Tamagui primitives. Zero hardcoded hex codes — all styling references tokens. Exports the Tamagui provider and compiled config.

- **Platform Shells:**
  - `apps/next` — The Web shell. Next.js App Router with SSR support, Tamagui compiler integration via `next.config.js`, Web-specific providers (Firebase Web SDK auth), Next.js middleware for protected routes, and `next-themes` for SSR-safe theming.
  - `apps/expo` — The Mobile shell. Expo Router with file-based routing mirroring the Next.js structure, Native-specific providers (`react-native-firebase` auth, `expo-secure-store` for token persistence), and `expo-router` segments for protected route redirection.

---

## Implementation Plan

### Phase 1: Monorepo & Tamagui Foundation
Initialize the Turborepo monorepo with the Solito/Tamagui starter template. Configure the workspace structure with `apps/next`, `apps/expo`, `packages/app`, and `packages/ui`. Set up Turborepo caching with `turbo.json`. Create the Tamagui configuration with custom design tokens (colors, sizes, spacing, radii), light/dark themes, and the optimizing compiler. Configure TypeScript strict mode across all packages with shared `tsconfig` bases. Set up ESLint with a shared configuration. Create `.env.example` with all environment variable placeholders.

**Tasks:**
1. Initialize Turborepo monorepo from Solito/Tamagui starter (`create-solito-app` or manual setup).
2. Configure `turbo.json` with pipeline definitions for `build`, `dev`, `lint`, `test`, and remote caching.
3. Create root `package.json` with workspace definitions (`apps/*`, `packages/*`).
4. Create shared `tsconfig.base.json` with TypeScript 5+ strict mode settings.
5. Set up `packages/ui/src/tamagui.config.ts` with custom tokens:
   - `$color` tokens (primary, secondary, success, error, warning + scales like `red1`–`red12`).
   - `$size` tokens (1–20 scale + named sizes: `$sm`, `$md`, `$lg`, `$xl`).
   - `$space` tokens (matching size scale for consistent spacing).
   - `$radius` tokens (none, sm, md, lg, full).
   - Light and Dark themes using token references.
6. Configure Tamagui compiler in `apps/next/next.config.js` via `@tamagui/next-plugin`.
7. Configure Tamagui in `apps/expo` via `babel.config.js` and `metro.config.js` with `@tamagui/babel-plugin`.
8. Create `apps/next/next.config.js` with Solito transpile config, Tamagui plugin, and monorepo resolution.
9. Create `apps/expo/app.json` with Expo configuration (name, slug, scheme for deep linking, plugins).
10. Run Expo prebuild and install native dependencies:
    - `npx expo prebuild` to generate `ios/` and `android/` directories.
    - `cd apps/expo/ios && pod install` to link native modules on iOS.
    - Verify `apps/expo/ios/Podfile` and `apps/expo/android/build.gradle` exist.
11. Set up ESLint with `@typescript-eslint` and shared config across packages.
12. Create `.env.example` at root with placeholders: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_API_KEY`, `API_BASE_URL`.
13. Create `packages/app/utils/env.ts` — unified env access that handles `process.env` (Web) vs `expo-constants` (Mobile).

#### Verification Gate
- **Files Must Exist:**
  - `turbo.json`
  - `package.json` (root)
  - `tsconfig.base.json`
  - `packages/ui/src/tamagui.config.ts`
  - `packages/ui/package.json`
  - `packages/app/package.json`
  - `apps/next/next.config.js`
  - `apps/next/package.json`
  - `apps/expo/app.json`
  - `apps/expo/package.json`
  - `.env.example`
  - `packages/app/utils/env.ts`
  - `apps/expo/ios/Podfile`
  - `apps/expo/android/build.gradle`
- **Commands:**
  - `pnpm install` -> exits 0 (all workspace dependencies resolve)
  - `npx tamagui build` -> exits 0 (Tamagui config compiles)
  - `npx turbo run build --dry-run` -> shows all packages in dependency graph
  - `cd apps/expo/ios && pod install` -> exits 0 (CocoaPods dependencies resolve)
  - `cd apps/expo && npx expo run:ios --no-build-cache` -> exits 0 (app launches in iOS Simulator)
  - `cd apps/expo && npx expo run:android` -> exits 0 (app launches in Android Emulator)
- **Assertions:**
  - `grep -c "pipeline\|tasks" turbo.json` -> returns >= 1 (Turborepo pipeline configured)
  - `grep -c "workspaces" package.json` -> returns >= 1 (monorepo workspaces defined)
  - `grep -c "strict" tsconfig.base.json` -> returns >= 1 (strict mode enabled)
  - `grep -c "createTamagui" packages/ui/src/tamagui.config.ts` -> returns >= 1
  - `grep -c "tokens" packages/ui/src/tamagui.config.ts` -> returns >= 1
  - `grep -c "themes" packages/ui/src/tamagui.config.ts` -> returns >= 1
  - `grep -c "withTamagui\|tamaguiPlugin" apps/next/next.config.js` -> returns >= 1 (Tamagui compiler enabled)
  - `grep -c "FIREBASE" .env.example` -> returns >= 2 (Firebase env vars present)
- **Pass Criteria:** Monorepo installs without errors. Tamagui config compiles. Turborepo recognizes all packages. TypeScript strict mode is enforced. All workspace symlinks are valid. Native prebuild generates `ios/` and `android/` directories. `pod install` succeeds. Expo app launches on both iOS Simulator and Android Emulator.

---

### Phase 2: Design System — Shared UI Components (`packages/ui`)
Build the reusable UI component library using Tamagui primitives. Every component must use token-based styling exclusively (zero hardcoded hex codes). Components must be universal (work on both Web and Native without conditional platform checks inside the component).

**Tasks:**
1. Create `packages/ui/src/index.ts` — barrel export for all UI components and the Tamagui config/provider.
2. Create `packages/ui/src/TamaguiProvider.tsx` — wraps `TamaguiProvider` from Tamagui with the project config and theme. Exports a universal provider component.
3. Create base layout components:
   - `packages/ui/src/components/Container.tsx` — responsive max-width container using `YStack` with media queries.
   - `packages/ui/src/components/SafeArea.tsx` — universal safe area wrapper (uses `SafeAreaView` on native, plain `YStack` on web).
4. Create form components:
   - `packages/ui/src/components/Button.tsx` — styled Tamagui `Button` with variant support (primary, secondary, outline, destructive) using tokens.
   - `packages/ui/src/components/Input.tsx` — styled Tamagui `Input` with error state, label, and helper text.
   - `packages/ui/src/components/TextArea.tsx` — multi-line input using Tamagui `TextArea`.
5. Create feedback components:
   - `packages/ui/src/components/Card.tsx` — content card using `YStack` with shadow, padding, and radius tokens.
   - `packages/ui/src/components/Badge.tsx` — status badge with color variants mapped to tokens.
   - `packages/ui/src/components/Spinner.tsx` — loading indicator using Tamagui `Spinner`.
6. Create overlay components with the **Adapt pattern**:
   - `packages/ui/src/components/AdaptiveSheet.tsx` — uses `<Sheet>` + `<Adapt>` so it renders as a bottom sheet on mobile and a dialog/modal on web.
   - `packages/ui/src/components/AdaptiveSelect.tsx` — uses `<Select>` + `<Adapt>` for native picker on mobile, dropdown on web.
7. Create typography components:
   - `packages/ui/src/components/Heading.tsx` — `H1`–`H4` using Tamagui `Heading` with token-based sizes.
   - `packages/ui/src/components/Paragraph.tsx` — body text with size variants.
8. Verify zero hardcoded colors: scan all `packages/ui/src/` files for hex codes.

#### Verification Gate
- **Files Must Exist:**
  - `packages/ui/src/index.ts`
  - `packages/ui/src/TamaguiProvider.tsx`
  - `packages/ui/src/components/Container.tsx`
  - `packages/ui/src/components/SafeArea.tsx`
  - `packages/ui/src/components/Button.tsx`
  - `packages/ui/src/components/Input.tsx`
  - `packages/ui/src/components/Card.tsx`
  - `packages/ui/src/components/AdaptiveSheet.tsx`
  - `packages/ui/src/components/AdaptiveSelect.tsx`
  - `packages/ui/src/components/Heading.tsx`
- **Commands:**
  - `npx tamagui build` -> exits 0
  - `cd apps/next && npx next build` -> exits 0 (components compile for web)
- **Assertions:**
  - `grep -rn "#[0-9a-fA-F]\{3,8\}" packages/ui/src/` -> MUST return empty (zero hardcoded hex colors)
  - `grep -c "Adapt" packages/ui/src/components/AdaptiveSheet.tsx` -> returns >= 1 (Adapt pattern used)
  - `grep -c "Adapt" packages/ui/src/components/AdaptiveSelect.tsx` -> returns >= 1 (Adapt pattern used)
  - `grep -c "createTamagui\|TamaguiProvider" packages/ui/src/TamaguiProvider.tsx` -> returns >= 1
  - `grep -c "export" packages/ui/src/index.ts` -> returns >= 5 (barrel exports present)
- **Pass Criteria:** All UI components compile for both Web and Native. Zero hardcoded hex colors anywhere in `packages/ui`. Adapt pattern is used for all overlay components. Tamagui config builds successfully.

---

### Phase 3: Navigation & Solito Routing
Configure universal file-based routing using Solito + Expo Router + Next.js App Router. The route structure must mirror between `apps/next` and `apps/expo` to ensure deep link parity. Set up layout groups, tab navigation, and the foundational screen wrappers.

**Tasks:**
1. Configure Solito navigation in `packages/app/navigation/`:
   - `packages/app/navigation/index.ts` — re-exports `Link` from `solito/link`, `useRouter` from `solito/router`, and typed route helpers.
2. Set up Next.js App Router file structure:
   - `apps/next/app/layout.tsx` — root layout with TamaguiProvider, theme provider, and `<html>` wrapper.
   - `apps/next/app/page.tsx` — home/landing screen.
   - `apps/next/app/(auth)/login/page.tsx` — login route.
   - `apps/next/app/(protected)/tasks/page.tsx` — tasks list route.
   - `apps/next/app/(protected)/tasks/[id]/page.tsx` — task detail route.
   - `apps/next/app/(protected)/layout.tsx` — protected area layout (will wire auth guard later).
3. Set up Expo Router file structure (mirroring Next.js):
   - `apps/expo/app/_layout.tsx` — root layout with TamaguiProvider and navigation container.
   - `apps/expo/app/index.tsx` — home screen.
   - `apps/expo/app/(auth)/login.tsx` — login route.
   - `apps/expo/app/(protected)/tasks/index.tsx` — tasks list route.
   - `apps/expo/app/(protected)/tasks/[id].tsx` — task detail route.
   - `apps/expo/app/(protected)/_layout.tsx` — protected tab layout (will wire auth guard later).
4. Create shared screen wrappers in `packages/app/`:
   - Each route file in `apps/next` and `apps/expo` should import and render the shared screen component from `packages/app/features/*/screen.tsx`.
   - Create placeholder screens: `packages/app/features/home/screen.tsx`, `packages/app/features/auth/screen.tsx`.
5. Verify URL parameter passing works via `useParams` from `solito/router`.

#### Verification Gate
- **Files Must Exist:**
  - `packages/app/navigation/index.ts`
  - `apps/next/app/layout.tsx`
  - `apps/next/app/page.tsx`
  - `apps/next/app/(auth)/login/page.tsx`
  - `apps/next/app/(protected)/tasks/page.tsx`
  - `apps/next/app/(protected)/tasks/[id]/page.tsx`
  - `apps/expo/app/_layout.tsx`
  - `apps/expo/app/index.tsx`
  - `apps/expo/app/(auth)/login.tsx`
  - `apps/expo/app/(protected)/tasks/index.tsx`
  - `apps/expo/app/(protected)/tasks/[id].tsx`
  - `packages/app/features/home/screen.tsx`
- **Commands:**
  - `cd apps/next && npx next build` -> exits 0 (routes compile)
  - `cd apps/expo && npx expo export --platform web` -> exits 0 (Expo routes compile)
  - `cd apps/expo && npx expo run:ios` -> exits 0 (navigation renders on iOS Simulator)
  - `cd apps/expo && npx expo run:android` -> exits 0 (navigation renders on Android Emulator)
- **Assertions:**
  - `grep -r "solito/link\|solito/router" packages/app/navigation/` -> returns >= 1 (Solito imports present)
  - `grep -r "useRouter\|useParams" packages/app/` -> returns >= 1 (Solito router hooks used)
  - Route parity check: the number of route files under `apps/next/app/(protected)/` should match `apps/expo/app/(protected)/`
- **Pass Criteria:** Next.js build succeeds with all routes compiling. Expo export succeeds. Route structure mirrors between Next.js and Expo. Solito `Link` and `useRouter` are the universal navigation primitives. Placeholder screens render on both Web and Native simulators.

---

### Phase 4: Identity Infrastructure (Firebase Universal Auth)
Implement the universal Firebase Authentication bridge that works on both Web (Firebase JS SDK) and Native (React Native Firebase). Create the `useAuth` hook, JWT interceptor for API calls, and protected route logic for both platforms.

**Tasks:**
1. Create the universal auth provider interface:
   - `packages/app/features/auth/domain/types.ts` — `AuthUser` interface (uid, email, displayName, token), `AuthState` type (loading | authenticated | unauthenticated).
2. Create platform-specific Firebase initialization:
   - `apps/next/lib/firebase.ts` — initialize Firebase Web SDK (`firebase/app`, `firebase/auth`) with env vars.
   - `apps/expo/lib/firebase.ts` — initialize React Native Firebase (`@react-native-firebase/app`, `@react-native-firebase/auth`).
3. Create the universal `useAuth` hook:
   - `packages/app/features/auth/hooks/useAuth.ts` — defines the hook interface. Uses a provider pattern to inject platform-specific implementation.
   - `packages/app/features/auth/providers/AuthProvider.tsx` — React context that wraps the auth state and exposes `signIn`, `signOut`, `user`, `isLoading`, `isAuthenticated`.
4. Create platform-specific auth adapters:
   - `apps/next/providers/WebAuthAdapter.ts` — implements auth using Firebase Web SDK. Persistence via cookies or `localStorage`.
   - `apps/expo/providers/NativeAuthAdapter.ts` — implements auth using React Native Firebase. Token persistence via `expo-secure-store`.
5. Create the JWT Axios interceptor:
   - `packages/app/features/auth/api/apiClient.ts` — Axios instance with a request interceptor that calls `getIdToken()` and injects `Authorization: Bearer <token>` on every outbound request.
   - Automatic 401 response interceptor that triggers token refresh or redirects to login.
6. Create protected route guards:
   - `apps/next/middleware.ts` — Next.js middleware that checks for auth cookie/token and redirects unauthenticated users to `/login`.
   - `apps/expo/app/(protected)/_layout.tsx` — uses `useAuth` and Expo Router `segments` to redirect unauthenticated users.
7. Install and link React Native Firebase native modules:
   - Add `@react-native-firebase/app` and `@react-native-firebase/auth` to `apps/expo`.
   - Configure `apps/expo/app.json` plugins array with `@react-native-firebase/app` and `@react-native-firebase/auth`.
   - Run `npx expo prebuild --clean` to regenerate native projects with Firebase native modules.
   - Run `cd apps/expo/ios && pod install` to link Firebase iOS pods.
   - Add `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) placeholder paths in `app.json`.
8. Create the Login screen:
   - `packages/app/features/auth/screen.tsx` — universal login screen with email/password form using Tamagui + React Hook Form + Zod validation.
   - Wire into both `apps/next/app/(auth)/login/page.tsx` and `apps/expo/app/(auth)/login.tsx`.

#### Verification Gate
- **Files Must Exist:**
  - `packages/app/features/auth/domain/types.ts`
  - `packages/app/features/auth/hooks/useAuth.ts`
  - `packages/app/features/auth/providers/AuthProvider.tsx`
  - `packages/app/features/auth/api/apiClient.ts`
  - `packages/app/features/auth/screen.tsx`
  - `apps/next/lib/firebase.ts`
  - `apps/expo/lib/firebase.ts`
  - `apps/next/middleware.ts`
  - `apps/next/providers/WebAuthAdapter.ts`
  - `apps/expo/providers/NativeAuthAdapter.ts`
- **Commands:**
  - `cd apps/next && npx next build` -> exits 0
  - `cd apps/expo/ios && pod install` -> exits 0 (Firebase iOS pods linked)
  - `cd apps/expo && npx expo run:ios` -> exits 0 (app launches with Firebase native modules on iOS Simulator)
  - `cd apps/expo && npx expo run:android` -> exits 0 (app launches with Firebase native modules on Android Emulator)
- **Assertions:**
  - `grep -c "@react-native-firebase" apps/expo/package.json` -> returns >= 2 (app and auth modules installed)
  - `grep -r "getIdToken" packages/app/features/auth/api/apiClient.ts` -> returns >= 1 (JWT injection present)
  - `grep -r "Authorization" packages/app/features/auth/api/apiClient.ts` -> returns >= 1 (Bearer token header set)
  - `grep -r "401" packages/app/features/auth/api/apiClient.ts` -> returns >= 1 (401 interceptor present)
  - `grep -r "useAuth" packages/app/features/auth/hooks/` -> returns >= 1
  - `grep -r "signIn\|signOut" packages/app/features/auth/providers/AuthProvider.tsx` -> returns >= 2
  - Domain purity: `grep -r "tamagui\|react-native\|solito\|expo" packages/app/features/auth/domain/` -> MUST return empty (zero UI framework imports in domain)
  - `grep -r "firebase" apps/next/lib/firebase.ts` -> returns >= 1 (Web Firebase initialized)
  - `grep -r "firebase" apps/expo/lib/firebase.ts` -> returns >= 1 (Native Firebase initialized)
  - `grep -r "middleware" apps/next/middleware.ts` -> returns >= 1 (Next.js middleware exists)
- **Pass Criteria:** Auth provider compiles on both platforms. JWT interceptor injects tokens. Protected route guards redirect unauthenticated users. Login screen renders. Domain types contain zero framework imports. Firebase is initialized on both Web and Native. React Native Firebase native modules are linked and the Expo app launches on both iOS Simulator and Android Emulator without native build errors.

---

### Phase 5: Domain Core — Task Feature (Schemas, Types, Ports)
Build the domain layer for the reference "Task" feature. This layer is **strictly framework-agnostic** — zero imports from Tamagui, React Native, Solito, Expo, or Next.js. Only Zod, TypeScript interfaces, and pure business logic.

**Tasks:**
1. Create the Task domain schema:
   - `packages/app/features/task/domain/schema.ts` — Zod schemas:
     - `TaskStatusSchema` — z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).
     - `TaskSchema` — z.object with id (UUID), title, description, status, createdAt, updatedAt.
     - `CreateTaskSchema` — z.object for task creation (title required, description optional).
     - `UpdateTaskSchema` — z.object for task update (title, description, status — all optional).
     - `TaskListResponseSchema` — z.array(TaskSchema).
2. Create TypeScript interfaces derived from Zod:
   - `packages/app/features/task/domain/types.ts` — `Task`, `CreateTask`, `UpdateTask`, `TaskStatus` types inferred from Zod schemas using `z.infer<>`.
3. Create port interfaces:
   - `packages/app/features/task/domain/ports.ts` — `TaskApiPort` interface defining: `getTasks()`, `getTask(id)`, `createTask(data)`, `updateTask(id, data)`, `deleteTask(id)`. Pure TypeScript interface, no implementation.
4. Create query key factory:
   - `packages/app/features/task/domain/queryKeys.ts` — TanStack Query key factory: `taskKeys.all`, `taskKeys.lists()`, `taskKeys.list(filters)`, `taskKeys.details()`, `taskKeys.detail(id)`.

#### Verification Gate
- **Files Must Exist:**
  - `packages/app/features/task/domain/schema.ts`
  - `packages/app/features/task/domain/types.ts`
  - `packages/app/features/task/domain/ports.ts`
  - `packages/app/features/task/domain/queryKeys.ts`
- **Commands:**
  - `npx tsc --noEmit -p packages/app/tsconfig.json` -> exits 0 (types compile)
- **Assertions (STRICT — Domain Purity):**
  - `grep -r "tamagui" packages/app/features/task/domain/` -> MUST return empty
  - `grep -r "react-native" packages/app/features/task/domain/` -> MUST return empty
  - `grep -r "solito" packages/app/features/task/domain/` -> MUST return empty
  - `grep -r "expo" packages/app/features/task/domain/` -> MUST return empty
  - `grep -r "next" packages/app/features/task/domain/` -> MUST return empty
  - `grep -c "z.object\|z.enum\|z.array" packages/app/features/task/domain/schema.ts` -> returns >= 3 (Zod schemas defined)
  - `grep -c "z.infer" packages/app/features/task/domain/types.ts` -> returns >= 2 (types inferred from Zod)
  - `grep -c "interface TaskApiPort" packages/app/features/task/domain/ports.ts` -> returns 1
- **Pass Criteria:** All domain files compile with zero errors. Absolutely zero UI/framework imports in `domain/`. Zod schemas define the contract. TypeScript types are inferred from Zod (single source of truth). Port interface is a pure TS interface.

---

### Phase 6: Application Use Cases — Task Feature (Hooks & API Adapter)
Build the application layer: TanStack Query hooks (primary ports / use cases) and the Axios API adapter (driven port / secondary adapter). Every API response MUST be validated through Zod before reaching the UI.

**Tasks:**
1. Create the API adapter (driven port implementation):
   - `packages/app/features/task/api/taskApi.ts` — implements `TaskApiPort` using the authenticated Axios client from Phase 4. Each method:
     - Calls the Spring Boot REST API (`/api/v1/tasks`).
     - Parses the response through the corresponding Zod schema (e.g., `TaskSchema.parse(response.data)`).
     - Returns typed, validated data.
2. Create TanStack Query hooks (primary ports / use cases):
   - `packages/app/features/task/hooks/useTasks.ts`:
     - `useTasks()` — `useQuery` with `taskKeys.lists()`, fetches all tasks via `taskApi.getTasks()`.
     - `useTask(id)` — `useQuery` with `taskKeys.detail(id)`, fetches single task.
     - `useCreateTask()` — `useMutation` that calls `taskApi.createTask()`, invalidates `taskKeys.lists()` on success.
     - `useUpdateTask()` — `useMutation` that calls `taskApi.updateTask()`, invalidates both list and detail queries.
     - `useDeleteTask()` — `useMutation` that calls `taskApi.deleteTask()`, invalidates `taskKeys.lists()`.
   - All hooks use the query key factory for cache consistency.
3. Create form hook:
   - `packages/app/features/task/hooks/useTaskForm.ts` — React Hook Form + Zod integration. Uses `zodResolver(CreateTaskSchema)` or `zodResolver(UpdateTaskSchema)` for form validation. Returns form methods and typed `onSubmit` handler.
4. Create Zustand store for local UI state:
   - `packages/app/features/task/hooks/useTaskStore.ts` — Zustand store for ephemeral UI state: `selectedTaskId`, `isFilterOpen`, `filterStatus`. Lightweight, no server state.

#### Verification Gate
- **Files Must Exist:**
  - `packages/app/features/task/api/taskApi.ts`
  - `packages/app/features/task/hooks/useTasks.ts`
  - `packages/app/features/task/hooks/useTaskForm.ts`
  - `packages/app/features/task/hooks/useTaskStore.ts`
- **Commands:**
  - `npx tsc --noEmit -p packages/app/tsconfig.json` -> exits 0
- **Assertions:**
  - `grep -c "useQuery\|useMutation" packages/app/features/task/hooks/useTasks.ts` -> returns >= 4 (CRUD hooks present)
  - `grep -c "taskKeys" packages/app/features/task/hooks/useTasks.ts` -> returns >= 3 (query key factory used)
  - `grep -c ".parse\|.safeParse" packages/app/features/task/api/taskApi.ts` -> returns >= 2 (Zod validation on API responses)
  - `grep -c "zodResolver" packages/app/features/task/hooks/useTaskForm.ts` -> returns >= 1 (Zod + React Hook Form wired)
  - `grep -c "create\|zustand" packages/app/features/task/hooks/useTaskStore.ts` -> returns >= 1 (Zustand store defined)
  - Logic/UI separation: `grep -r "import.*tamagui\|import.*Tamagui" packages/app/features/task/hooks/` -> MUST return empty (no UI imports in hooks)
  - Logic/UI separation: `grep -r "import.*tamagui\|import.*Tamagui" packages/app/features/task/api/` -> MUST return empty (no UI imports in API layer)
- **Pass Criteria:** All hooks and API adapter compile. Every API response is Zod-validated before returning. Query key factory is used consistently. React Hook Form is integrated with Zod. Zustand handles only local UI state. Zero Tamagui imports in hooks or API layers.

---

### Phase 7: Presentation Layer — Task Feature (Screens & Components)
Build the actual screens using Tamagui primitives, the Adapt pattern for modals, and FlashList for performant lists. Screens consume hooks from Phase 6 and render data — they contain zero business logic.

**Tasks:**
1. Create feature-scoped UI components:
   - `packages/app/features/task/components/TaskCard.tsx` — renders a single task using `Card` from `packages/ui`, with status `Badge`, title `Text`, and tap handler via Solito `Link`.
   - `packages/app/features/task/components/TaskStatusBadge.tsx` — maps `TaskStatus` to color tokens (OPEN=blue, IN_PROGRESS=yellow, DONE=green).
   - `packages/app/features/task/components/TaskForm.tsx` — create/edit form using `Input`, `TextArea`, `AdaptiveSelect` (for status), and `Button` from `packages/ui`. Wired to `useTaskForm` hook.
   - `packages/app/features/task/components/TaskFilter.tsx` — filter bar for task status using `XStack` and `Button` variants, wired to `useTaskStore`.
2. Create the Task List screen:
   - `packages/app/features/task/screen.tsx` — the main tasks screen:
     - Uses `useTasks()` hook for data.
     - Renders with `@shopify/flash-list` `FlashList` (NOT `FlatList`).
     - Pull-to-refresh via `onRefresh` + `refreshing` props.
     - Empty state component when no tasks.
     - FAB or header button to create new task (opens AdaptiveSheet).
     - `TaskFilter` component at the top.
3. Create the Task Detail screen:
   - `packages/app/features/task/detail-screen.tsx` — single task view:
     - Uses `useTask(id)` hook with `id` from `useParams()` (Solito).
     - Displays full task details with edit capability.
     - Delete action with confirmation via `AdaptiveSheet`.
     - Uses `useUpdateTask()` and `useDeleteTask()` mutations.
4. Create the Task Create/Edit sheet:
   - `packages/app/features/task/components/TaskCreateSheet.tsx` — uses `AdaptiveSheet` from `packages/ui`. Contains `TaskForm` wired to `useCreateTask()`.
5. Wire screens into platform shells:
   - `apps/next/app/(protected)/tasks/page.tsx` — imports and renders `TaskListScreen` from `packages/app`.
   - `apps/next/app/(protected)/tasks/[id]/page.tsx` — imports and renders `TaskDetailScreen` from `packages/app`.
   - `apps/expo/app/(protected)/tasks/index.tsx` — imports and renders `TaskListScreen`.
   - `apps/expo/app/(protected)/tasks/[id].tsx` — imports and renders `TaskDetailScreen`.
6. Add error boundaries:
   - `packages/app/features/task/components/TaskErrorBoundary.tsx` — feature-level error boundary to prevent full-app crashes on task-related errors.

#### Verification Gate
- **Files Must Exist:**
  - `packages/app/features/task/screen.tsx`
  - `packages/app/features/task/detail-screen.tsx`
  - `packages/app/features/task/components/TaskCard.tsx`
  - `packages/app/features/task/components/TaskStatusBadge.tsx`
  - `packages/app/features/task/components/TaskForm.tsx`
  - `packages/app/features/task/components/TaskFilter.tsx`
  - `packages/app/features/task/components/TaskCreateSheet.tsx`
  - `packages/app/features/task/components/TaskErrorBoundary.tsx`
- **Commands:**
  - `cd apps/next && npx next build` -> exits 0 (No SSR/Hydration errors)
  - `cd apps/expo && npx expo export --platform web` -> exits 0
  - `cd apps/expo && npx expo run:ios` -> exits 0 (Task screens render on iOS Simulator — FlashList, Adapt sheets, navigation all functional)
  - `cd apps/expo && npx expo run:android` -> exits 0 (Task screens render on Android Emulator)
- **Assertions:**
  - `grep -c "FlashList" packages/app/features/task/screen.tsx` -> returns >= 1 (FlashList used, NOT FlatList)
  - `grep -rn "FlatList" packages/app/features/task/` -> MUST return empty (FlatList is banned)
  - `grep -c "AdaptiveSheet\|Adapt" packages/app/features/task/components/TaskCreateSheet.tsx` -> returns >= 1 (Adapt pattern used)
  - `grep -c "useParams\|useRoute" packages/app/features/task/detail-screen.tsx` -> returns >= 1 (Solito params used)
  - `grep -c "useTasks\|useTask" packages/app/features/task/screen.tsx` -> returns >= 1 (hooks consumed, not raw API calls)
  - `grep -rn "#[0-9a-fA-F]\{3,8\}" packages/app/features/task/` -> MUST return empty (zero hardcoded hex colors)
  - `grep -c "onRefresh\|refreshing" packages/app/features/task/screen.tsx` -> returns >= 1 (pull-to-refresh implemented)
  - `grep -c "ErrorBoundary\|error" packages/app/features/task/components/TaskErrorBoundary.tsx` -> returns >= 1 (error boundary present)
- **Pass Criteria:** Next.js build succeeds with zero SSR/hydration errors. Expo export succeeds. Expo app launches on both iOS Simulator and Android Emulator with Task screens fully rendering (FlashList, Adapt sheets, navigation). FlashList is used for all lists (FlatList banned). Adapt pattern used for overlays. Zero hardcoded colors. Screens only consume hooks — no direct API calls or business logic in presentation layer.

---

### Phase 8: Testing & Quality Assurance
Write tests for the domain layer, hooks, and critical UI components. Validate code quality with linting and platform-specific build checks.

**Tasks:**
1. Set up Vitest configuration:
   - `packages/app/vitest.config.ts` — configure Vitest for the shared package with TypeScript and React support.
2. Write domain tests:
   - `packages/app/features/task/domain/__tests__/schema.test.ts` — test Zod schemas: valid input passes, invalid input rejects with expected errors, edge cases (empty strings, missing fields).
   - `packages/app/features/auth/domain/__tests__/types.test.ts` — validate auth type contracts.
3. Write hook tests:
   - `packages/app/features/task/hooks/__tests__/useTasks.test.ts` — test TanStack Query hooks with mocked API adapter. Verify cache invalidation, error states, and loading states.
   - `packages/app/features/task/hooks/__tests__/useTaskForm.test.ts` — test form validation with various inputs.
4. Write API adapter tests:
   - `packages/app/features/task/api/__tests__/taskApi.test.ts` — test Axios calls with mocked responses. Verify Zod parsing on responses. Test 401 handling.
5. Write UI component tests:
   - `packages/app/features/task/components/__tests__/TaskCard.test.tsx` — test rendering with valid props using React Native Testing Library.
6. Run full quality suite:
   - `pnpm run lint` across all packages.
   - `npx tsc --noEmit` across all packages (type checking).
   - Verify no `window` usage in `packages/app` (would break SSR/Native).
   - Verify no hardcoded colors in entire codebase.

#### Verification Gate
- **Files Must Exist:**
  - `packages/app/vitest.config.ts`
  - `packages/app/features/task/domain/__tests__/schema.test.ts`
  - `packages/app/features/task/hooks/__tests__/useTasks.test.ts`
  - `packages/app/features/task/hooks/__tests__/useTaskForm.test.ts`
  - `packages/app/features/task/api/__tests__/taskApi.test.ts`
  - `packages/app/features/task/components/__tests__/TaskCard.test.tsx`
- **Commands:**
  - `cd packages/app && npx vitest run` -> exits 0 with all tests passing
  - `pnpm run lint` -> exits 0 (no lint errors)
  - `npx tsc --noEmit` -> exits 0 across all packages
- **Assertions:**
  - `grep -rn "window\." packages/app/features/ --include="*.ts" --include="*.tsx"` -> MUST return empty OR only inside `isWeb` guards (no bare `window` usage)
  - `grep -rn "#[0-9a-fA-F]\{3,8\}" packages/app/ packages/ui/src/` -> MUST return empty (zero hardcoded hex colors)
  - Test count: `cd packages/app && npx vitest run 2>&1 | grep "Tests"` -> shows > 0 tests passed, 0 failed
  - Domain purity re-check: `grep -r "tamagui\|react-native\|solito\|expo\|next" packages/app/features/task/domain/` -> MUST return empty
- **Pass Criteria:** All Vitest tests pass with zero failures. Lint passes across all packages. TypeScript compiles with zero errors. No bare `window` usage in shared code. Zero hardcoded colors. Domain purity is preserved.

---

### Phase 9: DevOps & Production Hardening
Configure CI/CD pipeline, environment variable management, bundle analysis, and production build verification.

**Tasks:**
1. Configure Turborepo caching:
   - Update `turbo.json` with proper output definitions, input hashes, and remote cache configuration placeholder.
2. Create CI/CD pipeline:
   - `.github/workflows/ci.yml` — GitHub Actions pipeline:
     - Install dependencies.
     - Run lint (`turbo run lint`).
     - Run type check (`turbo run typecheck`).
     - Run tests (`turbo run test`).
     - Build Next.js (`turbo run build --filter=next`).
     - Build Expo Web export (`turbo run build --filter=expo`).
     - Bundle size analysis for web app.
3. Environment variable management:
   - Verify `packages/app/utils/env.ts` handles both `process.env` (Web) and `expo-constants` (Mobile) correctly.
   - Verify `.env.example` documents all required variables.
4. Create production Dockerfiles:
   - `apps/next/Dockerfile` — multi-stage build for Next.js production deployment.
5. Final build verification:
   - Full `turbo run build` across all packages.
   - Verify no circular dependencies between packages.
   - Verify all platform shells can import from shared packages without errors.
6. Create `README.md` at root:
   - Project overview, architecture diagram (ASCII/text), prerequisites, setup instructions, development workflow, deployment guide.

#### Verification Gate
- **Files Must Exist:**
  - `turbo.json` (updated)
  - `.github/workflows/ci.yml`
  - `apps/next/Dockerfile`
  - `README.md`
  - `.env.example`
- **Commands:**
  - `npx turbo run build` -> exits 0 (all packages build successfully)
  - `npx turbo run lint` -> exits 0
  - `npx turbo run test` -> exits 0
  - `pnpm run build:next` OR `cd apps/next && npx next build` -> exits 0
  - `npx expo export` OR `cd apps/expo && npx expo export --platform web` -> exits 0
- **Assertions:**
  - `grep -c "turbo run" .github/workflows/ci.yml` -> returns >= 3 (lint, test, build stages)
  - `grep -c "FIREBASE" .env.example` -> returns >= 2 (Firebase env vars documented)
  - Domain purity final check: `grep -r "tamagui\|react-native\|@expo" packages/app/features/*/domain/` -> MUST return empty
  - No hardcoded colors final check: `grep -rn "#[0-9a-fA-F]\{3,8\}" packages/ui/src/ packages/app/features/` -> MUST return empty
  - `grep -c "FROM.*node" apps/next/Dockerfile` -> returns >= 1 (multi-stage Docker build)
- **Pass Criteria:** Full monorepo builds across all packages. CI pipeline covers lint, typecheck, test, and build. Environment variables are documented. Docker deployment is configured. Zero domain impurity. Zero hardcoded colors. The scaffold is production-ready.

---

## Step by Step Tasks

### 1. Initialize Turborepo Monorepo
Create the root `package.json` with workspace definitions, install Turborepo, and set up the basic directory structure (`apps/next`, `apps/expo`, `packages/app`, `packages/ui`). Configure `turbo.json` with pipeline definitions.

### 2. Configure TypeScript
Create `tsconfig.base.json` with strict mode. Create per-package `tsconfig.json` files that extend the base config. Ensure path aliases are consistent across packages.

### 3. Set Up Tamagui Configuration
Create `packages/ui/src/tamagui.config.ts` with custom tokens (colors, sizes, spacing, radii), light/dark themes, and font configurations. Export the config and types.

### 4. Configure Next.js Shell
Set up `apps/next` with Next.js App Router, Tamagui compiler plugin, Solito transpilation, and the root layout with TamaguiProvider.

### 5. Configure Expo Shell
Set up `apps/expo` with Expo Router, Tamagui babel plugin, metro config for monorepo resolution, and the root layout.

### 6. Run Expo Prebuild & Install Native Dependencies
Run `npx expo prebuild` to generate `ios/` and `android/` native directories. Run `cd apps/expo/ios && pod install` to link CocoaPods dependencies. Verify `Podfile` and `build.gradle` exist.

### 7. Create Environment Variable Utility
Build `packages/app/utils/env.ts` that provides unified env access for both Web (`process.env`) and Mobile (`expo-constants`).

### 8. Create `.env.example`
Document all environment variables: Firebase config, API base URL, and platform-specific variables.

### 9. Run Phase 1 Verification Gate
Execute all commands and assertions from Phase 1, including `npx expo run:ios` and `npx expo run:android` to verify the app launches on both simulators. Do NOT proceed until all pass.

### 10. Build TamaguiProvider Wrapper
Create `packages/ui/src/TamaguiProvider.tsx` that wraps the Tamagui provider with project config and theme management.

### 11. Build Base Layout Components
Create Container and SafeArea components in `packages/ui/src/components/`.

### 12. Build Form Components
Create Button, Input, and TextArea components with token-based styling and variant support.

### 13. Build Feedback Components
Create Card, Badge, and Spinner components.

### 14. Build Overlay Components with Adapt Pattern
Create AdaptiveSheet and AdaptiveSelect using Tamagui's `<Adapt>` for platform-appropriate rendering.

### 15. Build Typography Components
Create Heading and Paragraph components with token-based sizing.

### 16. Create UI Package Barrel Export
Create `packages/ui/src/index.ts` exporting all components, config, and provider.

### 17. Run Phase 2 Verification Gate
Execute all commands and assertions from Phase 2. Verify zero hardcoded hex colors. Do NOT proceed until all pass.

### 18. Set Up Solito Navigation Utilities
Create `packages/app/navigation/index.ts` with re-exports of Solito primitives and typed route helpers.

### 19. Create Next.js Route Structure
Set up `apps/next/app/` with layout groups: `(auth)/login`, `(protected)/tasks`, `(protected)/tasks/[id]`.

### 20. Create Expo Route Structure
Set up `apps/expo/app/` mirroring the Next.js routes: `(auth)/login`, `(protected)/tasks/index`, `(protected)/tasks/[id]`.

### 21. Create Placeholder Shared Screens
Create `packages/app/features/home/screen.tsx` and `packages/app/features/auth/screen.tsx` as placeholder screens.

### 22. Run Phase 3 Verification Gate
Execute all commands and assertions from Phase 3, including `npx expo run:ios` and `npx expo run:android` to verify navigation renders on both simulators. Verify route parity. Do NOT proceed until all pass.

### 23. Create Auth Domain Types
Create `packages/app/features/auth/domain/types.ts` with `AuthUser` and `AuthState` interfaces. Zero framework imports.

### 24. Create Firebase Initialization (Web)
Create `apps/next/lib/firebase.ts` initializing Firebase Web SDK with environment variables.

### 25. Create Firebase Initialization (Native)
Create `apps/expo/lib/firebase.ts` initializing React Native Firebase.

### 26. Install & Link React Native Firebase Native Modules
Add `@react-native-firebase/app` and `@react-native-firebase/auth` to `apps/expo`. Configure `app.json` plugins array. Run `npx expo prebuild --clean` to regenerate native projects with Firebase modules. Run `cd apps/expo/ios && pod install` to link Firebase iOS pods. Add `google-services.json` and `GoogleService-Info.plist` placeholder paths.

### 27. Create Universal AuthProvider
Create `packages/app/features/auth/providers/AuthProvider.tsx` with React context for auth state, `signIn`, `signOut`, `user`, and loading state.

### 28. Create Platform Auth Adapters
Create `apps/next/providers/WebAuthAdapter.ts` and `apps/expo/providers/NativeAuthAdapter.ts` for platform-specific Firebase auth.

### 29. Create JWT Axios Interceptor
Create `packages/app/features/auth/api/apiClient.ts` with request interceptor for Bearer token injection and 401 response interceptor.

### 30. Create Protected Route Guards
Create `apps/next/middleware.ts` for web auth guard and update `apps/expo/app/(protected)/_layout.tsx` for native auth guard.

### 31. Create Login Screen
Create `packages/app/features/auth/screen.tsx` with email/password form using Tamagui + React Hook Form + Zod. Wire into both platform shells.

### 32. Run Phase 4 Verification Gate
Execute all commands and assertions from Phase 4, including `npx expo run:ios` and `npx expo run:android` to verify the app launches with Firebase native modules on both simulators. Verify JWT injection and domain purity. Do NOT proceed until all pass.

### 33. Create Task Zod Schemas
Create `packages/app/features/task/domain/schema.ts` with `TaskSchema`, `CreateTaskSchema`, `UpdateTaskSchema`, `TaskListResponseSchema`.

### 34. Create Task TypeScript Types
Create `packages/app/features/task/domain/types.ts` using `z.infer<>` to derive types from Zod schemas.

### 35. Create Task Port Interface
Create `packages/app/features/task/domain/ports.ts` with `TaskApiPort` interface for CRUD operations.

### 36. Create Task Query Key Factory
Create `packages/app/features/task/domain/queryKeys.ts` with structured query keys for TanStack Query cache management.

### 37. Run Phase 5 Verification Gate
Execute all commands and assertions from Phase 5. Verify strict domain purity. Do NOT proceed until all pass.

### 38. Create Task API Adapter
Create `packages/app/features/task/api/taskApi.ts` implementing `TaskApiPort` with Axios calls and Zod response validation.

### 39. Create Task TanStack Query Hooks
Create `packages/app/features/task/hooks/useTasks.ts` with `useTasks`, `useTask`, `useCreateTask`, `useUpdateTask`, `useDeleteTask` hooks.

### 40. Create Task Form Hook
Create `packages/app/features/task/hooks/useTaskForm.ts` with React Hook Form + zodResolver integration.

### 41. Create Task UI State Store
Create `packages/app/features/task/hooks/useTaskStore.ts` Zustand store for ephemeral UI state.

### 42. Run Phase 6 Verification Gate
Execute all commands and assertions from Phase 6. Verify Zod validation and logic/UI separation. Do NOT proceed until all pass.

### 43. Create Task Feature UI Components
Create TaskCard, TaskStatusBadge, TaskForm, TaskFilter, TaskCreateSheet, and TaskErrorBoundary components.

### 44. Create Task List Screen
Create `packages/app/features/task/screen.tsx` with FlashList, pull-to-refresh, filters, and FAB for creation.

### 45. Create Task Detail Screen
Create `packages/app/features/task/detail-screen.tsx` with full detail view, edit, and delete actions.

### 46. Wire Task Screens into Platform Shells
Import and render shared Task screens in both `apps/next` and `apps/expo` route files.

### 47. Run Phase 7 Verification Gate
Execute all commands and assertions from Phase 7, including `npx expo run:ios` and `npx expo run:android` to verify Task screens render fully on both simulators (FlashList, Adapt sheets, navigation). Verify FlashList usage, Adapt pattern, and no hydration errors. Do NOT proceed until all pass.

### 48. Set Up Vitest
Create `packages/app/vitest.config.ts` with TypeScript and React testing support.

### 49. Write Domain Schema Tests
Create `packages/app/features/task/domain/__tests__/schema.test.ts` testing Zod validation with valid and invalid inputs.

### 50. Write Hook Tests
Create tests for `useTasks` and `useTaskForm` with mocked adapters.

### 51. Write API Adapter Tests
Create tests for `taskApi` with mocked Axios responses, verifying Zod parsing and error handling.

### 52. Write UI Component Tests
Create tests for `TaskCard` using React Native Testing Library.

### 53. Run Full Quality Suite
Run lint, type check, and tests across all packages. Verify no `window` usage in shared packages. Verify zero hardcoded colors.

### 54. Run Phase 8 Verification Gate
Execute all commands and assertions from Phase 8. Do NOT proceed until all pass.

### 55. Configure CI/CD Pipeline
Create `.github/workflows/ci.yml` with lint, typecheck, test, build, and bundle analysis stages.

### 56. Create Next.js Dockerfile
Create `apps/next/Dockerfile` with multi-stage build for production deployment.

### 57. Finalize Turborepo Configuration
Update `turbo.json` with proper output definitions, input hashes, and remote cache configuration.

### 58. Create Root README
Create `README.md` with project overview, architecture, setup instructions, and development workflow.

### 59. Run Final Validation — Phase 9 Gate
Execute ALL verification gate commands and assertions from Phase 9. Run all Validation Commands including native simulator builds. Verify the scaffold is complete and production-ready.

---

## Validation Commands
Execute every command to validate the scaffold works correctly.

- `pnpm run lint` — Validate project-wide linting.
- `npx tsc --noEmit` — Validate TypeScript compilation across all packages.
- `npx expo export` — Validate native bundle integrity.
- `pnpm run build:next` OR `cd apps/next && npx next build` — Validate web SSR/Compiler integrity.
- `npx turbo run build` — Validate full monorepo build.
- `npx vitest run` — Validate all tests pass.
- `cd apps/expo && npx expo run:ios` — Validate iOS Simulator build and launch.
- `cd apps/expo && npx expo run:android` — Validate Android Emulator build and launch.
- `grep -r "tamagui\|react-native\|solito\|expo\|next" packages/app/features/*/domain/` — Domain purity (MUST return empty).
- `grep -rn "#[0-9a-fA-F]\{3,8\}" packages/ui/src/ packages/app/features/` — No hardcoded hex colors (MUST return empty).
- `grep -rn "FlatList" packages/app/features/` — No FlatList usage (MUST return empty — use FlashList).

---

## Notes

1. **Solito 5+** is required for App Router compatibility. Verify `solito/link` and `solito/router` exports work with Next.js App Router.
2. **Tamagui v2+** — use the optimizing compiler for production builds. Verify it's configured in both Next.js (via plugin) and Expo (via babel plugin).
3. **Domain Purity is non-negotiable.** The `features/*/domain/` directories must have zero imports from any UI framework (Tamagui, React Native, Solito, Expo, Next.js). Only Zod, TypeScript types, and pure logic.
4. **FlashList is mandatory** for all scrollable lists. `FlatList` is banned.
5. **Adapt Pattern is mandatory** for all overlays (sheets, selects, dialogs). Ensures native bottom sheets on mobile, modals on web.
6. **Zod validates everything.** Every API response MUST pass through a Zod schema before reaching the UI. This enforces the contract with the Spring Boot backend.
7. **Zero hardcoded colors.** All colors must reference Tamagui tokens (`$color.red10`, etc.). No hex codes anywhere in component code.
8. **Firebase initialization is platform-split.** Web uses `firebase/auth`, Native uses `@react-native-firebase/auth`. The `useAuth` hook abstracts this via a provider pattern.
9. **Query Key Factory pattern** ensures consistent cache invalidation across all TanStack Query hooks for a feature.
10. **The "Hydration" Rule** — use `isWeb` checks or `useIsomorphicLayoutEffect` to prevent Next.js hydration mismatches. Never use bare `window` in shared packages.
