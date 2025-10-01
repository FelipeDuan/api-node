# 1) deps
FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 2) builder
FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY drizzle.config.ts ./

RUN pnpm run build   # usa tsconfig.build.json e gera dist/

# 3) runner
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist
COPY drizzle ./drizzle
COPY drizzle.config.ts ./
COPY docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3333
ENV PORT=3333

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "dist/server.js"]
