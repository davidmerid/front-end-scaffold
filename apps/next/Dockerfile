FROM node:20-alpine AS base
RUN corepack enable

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/next/package.json apps/next/
COPY packages/app/package.json packages/app/
COPY packages/ui/package.json packages/ui/
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/next/node_modules ./apps/next/node_modules
COPY --from=deps /app/packages/app/node_modules ./packages/app/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY . .
RUN pnpm --filter next-app build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/next/public ./apps/next/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/next/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/next/.next/static ./apps/next/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/next/server.js"]
