FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @officesync/socket build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app /app

EXPOSE 4000
CMD ["pnpm", "--filter", "@officesync/socket", "start"]
