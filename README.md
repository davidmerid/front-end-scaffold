# Frontend Scaffold

Production-ready, universal (Web + Mobile) frontend scaffold using **Solito**, **Tamagui**, and **Frontend Hexagonal Architecture**.

## Architecture

```
frontend-scaffold/
├── apps/
│   ├── next/           # Web shell (Next.js App Router)
│   └── expo/           # Mobile shell (Expo Router)
├── packages/
│   ├── app/            # Shared business logic (the hexagon)
│   │   ├── features/   # Vertical feature slices
│   │   │   ├── auth/   # Authentication feature
│   │   │   │   ├── domain/      # Types, schemas (zero UI imports)
│   │   │   │   ├── hooks/       # useAuth hook
│   │   │   │   ├── providers/   # AuthProvider context
│   │   │   │   ├── api/         # JWT interceptor, API client
│   │   │   │   └── screen.tsx   # Login screen
│   │   │   ├── task/   # Task CRUD feature
│   │   │   │   ├── domain/      # Zod schemas, types, ports
│   │   │   │   ├── hooks/       # TanStack Query + Zustand
│   │   │   │   ├── api/         # Axios adapter (Zod-validated)
│   │   │   │   ├── components/  # TaskCard, TaskForm, etc.
│   │   │   │   ├── screen.tsx   # Task list (FlashList)
│   │   │   │   └── detail-screen.tsx
│   │   │   └── home/
│   │   ├── navigation/  # Solito routing utilities
│   │   └── utils/       # Env config
│   └── ui/             # Design system (Tamagui)
│       └── src/
│           ├── tamagui.config.ts  # Tokens, themes, media
│           ├── TamaguiProvider.tsx
│           └── components/        # Button, Card, Input, etc.
└── turbo.json          # Turborepo configuration
```

## Key Principles

- **Domain Purity**: `features/*/domain/` has zero UI framework imports
- **Zod Everywhere**: All API responses validated through Zod schemas
- **Token-based Styling**: Zero hardcoded hex colors
- **FlashList Only**: FlatList is banned — FlashList for all lists
- **Adapt Pattern**: Bottom sheets on mobile, dialogs on web
- **Universal Auth**: Firebase Web SDK + React Native Firebase via adapter pattern

## Prerequisites

- Node.js >= 20
- pnpm >= 10
- Xcode (for iOS development)
- Android Studio (for Android development)

## Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Development
pnpm dev:next      # Web (http://localhost:3000)
pnpm dev:expo      # Mobile (Expo DevTools)

# Build
pnpm build         # Build all packages
pnpm build:next    # Build web only

# Test
pnpm test          # Run all tests

# Type check
pnpm typecheck     # Check types across all packages
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo + pnpm workspaces |
| Web | Next.js 14 (App Router) |
| Mobile | Expo (Expo Router) |
| Navigation | Solito |
| UI | Tamagui v1 |
| Server State | TanStack Query v5 |
| Local State | Zustand v5 |
| Forms | React Hook Form + Zod |
| Auth | Firebase (Web SDK + RN Firebase) |
| HTTP | Axios |
| Lists | FlashList |
| Testing | Vitest |
