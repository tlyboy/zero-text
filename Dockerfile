FROM node:22-alpine AS build-stage

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
  pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM caddy AS production-stage

COPY --from=build-stage /app/dist /app
COPY Caddyfile /etc/caddy/Caddyfile
