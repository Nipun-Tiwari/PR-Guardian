# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json turbo.json tsconfig.base.json ./
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/observability/package.json ./packages/observability/package.json

RUN npm ci --workspace=apps/worker \
           --workspace=packages/shared \
           --workspace=packages/database \
           --workspace=packages/observability

COPY apps/worker ./apps/worker
COPY packages/shared ./packages/shared
COPY packages/database ./packages/database
COPY packages/observability ./packages/observability

RUN npm run build -w packages/shared
RUN npm run build -w packages/observability
RUN npm run build -w apps/worker

# ---- runtime stage ----
# NOTE (M4): Add Semgrep CLI installation here when static-analysis is implemented:
# RUN apk add --no-cache python3 && pip3 install semgrep==<pinned-version>
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/apps/worker/dist ./apps/worker/dist
COPY --from=build /app/apps/worker/package.json ./apps/worker/package.json
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/packages/database/src/generated ./packages/database/src/generated
COPY --from=build /app/packages/database/package.json ./packages/database/package.json
COPY --from=build /app/packages/observability/dist ./packages/observability/dist
COPY --from=build /app/packages/observability/package.json ./packages/observability/package.json

USER node

CMD ["node", "apps/worker/dist/index.js"]
