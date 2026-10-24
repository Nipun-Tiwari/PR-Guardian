# PR Guardian — AI Decision Log

Maintained as the single source of truth for significant architectural, technical, and design decisions.

**Instructions for the AI:**

- Read this file before making any significant architectural, technical, or design decision.
- Follow existing decisions unless there is a strong reason to revisit them.
- Update this file whenever a new significant decision is made or an existing one changes.
- Never silently contradict a previous decision — document the change and reasoning.
- Do not log trivial implementation details or routine code changes.

---

## Decision Index

| #     | Date       | Decision                                                                                        | Status |
| ----- | ---------- | ----------------------------------------------------------------------------------------------- | ------ |
| D-001 | 2026-10-17 | Monorepo structure: npm workspaces + Turborepo                                                  | Active |
| D-002 | 2026-10-17 | Authentication: GitHub App OAuth + server-side sessions in PostgreSQL                           | Active |
| D-003 | 2026-10-17 | API versioning: `/api/v1/` prefix for all application routes                                    | Active |
| D-004 | 2026-10-17 | Shared domain contracts: `FindingV1`, `ReviewSummaryV1`, `ApiProblemV1` in `@prguardian/shared` | Active |
| D-005 | 2026-10-17 | Semgrep: Community Edition CLI subprocess in worker Docker image                                | Active |
| D-006 | 2026-10-17 | GitHub installation tokens: Octokit App SDK, never persisted in DB                              | Active |
| D-007 | 2026-10-17 | Error contract: `application/problem+json` (RFC 7807) for all API errors                        | Active |
| D-008 | 2026-10-17 | Database migrations: Prisma Migrate, forward-only, expand-and-contract                          | Active |
| D-009 | 2026-10-17 | Rate limiting: in-memory express-rate-limit for API abuse; DB-backed budgets for live reviews   | Active |
| D-010 | 2026-10-17 | Worker/queue: PostgreSQL polling queue, no Redis in MVP                                         | Active |
| D-011 | 2026-10-17 | Deployment: PostgreSQL `FOR UPDATE SKIP LOCKED` job claiming; combined runtime for free-tier    | Active |
| D-012 | 2026-10-17 | Webhook tunneling: ngrok on port 3001 for local development                                     | Active |
| D-013 | 2026-10-17 | Pricing catalog: versioned JSON in `packages/shared/src/pricing/pricing-catalog.json`           | Active |
| D-014 | 2026-10-17 | CI/CD workflow: all changes via PR branch, CI must pass before merge to main                    | Active |
| D-015 | 2026-10-17 | TypeScript: strict mode, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`               | Active |
| D-016 | 2026-10-21 | Demo fixture domain: `acme-corp/api-gateway` (rate limiting PR)                                 | Active |
| D-017 | 2026-10-21 | Frontend CSS framework: Tailwind CSS v4 with `@tailwindcss/vite` plugin                         | Active |
| D-018 | 2026-10-21 | CORS strategy: conditional, `API_CORS_ORIGIN` env var, dev-only by convention                   | Active |
| D-019 | 2026-10-21 | Fixture storage: `packages/shared/src/fixtures/` — shared by API and frontend                   | Active |
| D-020 | 2026-10-21 | Fixture fingerprint: SHA-256 of `filePath:lineStart:message`, hex-encoded, 16-char prefix       | Active |
| D-021 | 2026-10-21 | Frontend data strategy: API-driven (primary); fixtures importable for offline fallback only     | Active |
| D-022 | 2026-10-21 | Frontend module type: `"type": "module"` in `apps/web/package.json` for ESM-only Tailwind v4    | Active |
| D-023 | 2026-10-24 | Session store: custom Prisma adapter for `express-session` — reuses existing `Session` model    | Active |
| D-024 | 2026-10-24 | OAuth state storage: signed `HttpOnly; SameSite=Strict` cookie (10-min TTL), not a session row  | Active |
| D-025 | 2026-10-24 | BigInt serialization: all Prisma `BigInt` fields converted to string at API response boundary   | Active |

---

## Detailed Entries

---

### D-001 — Monorepo Structure

**Date:** 2026-10-17
**Decision:** Use npm workspaces with Turborepo for the monorepo.
**Context:** Project has multiple apps (api, web, worker, runtime) and shared packages. Need unified build, test, and lint pipeline.
**Alternatives:** Nx, Lerna, single-package repo.
**Rationale:** Turborepo is lightweight, has native npm workspaces support, and handles incremental builds via `dependsOn: ["^build"]` with minimal config.
**Consequences:** All build ordering via package.json workspace `*` dependencies + `turbo.json` task graph. App-level `tsconfig.json` must NOT use `references` arrays — Turbo owns sequencing.

---

### D-002 — Authentication

**Date:** 2026-10-17
**Decision:** GitHub App OAuth for user identity; GitHub App installation for repository access. Sessions stored server-side in PostgreSQL using opaque HttpOnly/Secure/SameSite=Lax cookies. GitHub access tokens discarded after identity retrieval — not persisted.
**Context:** PR Guardian needs to read PR diffs and post review comments on behalf of users. Two flows: user login and repository installation.
**Alternatives:** GitHub OAuth App (no installation access), storing tokens in DB, JWT sessions.
**Rationale:** GitHub App required for Check Run API. Server-side sessions allow instant revocation. Discarding tokens minimizes breach impact.
**Consequences:** New DB tables needed: `users`, `sessions`, `repository_installations`. MVP restricts to personal account installations.

---

### D-003 — API Versioning

**Date:** 2026-10-17
**Decision:** All versioned REST endpoints use `/api/v1/` prefix. Webhook: `POST /webhooks/github`. Health endpoints unversioned.
**Context:** Future API breaking changes must not affect existing clients.
**Alternatives:** Header-based versioning, URL versioning at major version only.
**Rationale:** URL prefix versioning is explicit, easy to route/proxy, standard for REST APIs.
**Consequences:** All route files live under `apps/api/src/routes/v1/`. Config: `APP_API_VERSION=v1`, `GITHUB_API_VERSION=2026-03-10`.

---

### D-004 — Shared Domain Contracts

**Date:** 2026-10-17
**Decision:** Three core contracts in `@prguardian/shared`: `ReviewSummaryV1`, `FindingV1`, `ApiProblemV1`. Demo fixtures and live findings use identical field shapes. Fixture validation runs in CI.
**Context:** Demo mode and live mode must be interchangeable in the frontend.
**Alternatives:** Separate demo and live schemas, no schema validation on fixtures.
**Rationale:** Single contract eliminates "demo works, live breaks" bugs. Zod provides both compile-time types and runtime validation.
**Consequences:** Schema changes to `FindingV1` or `ReviewSummaryV1` require updating fixtures. CI validates via `packages/shared/tests/fixtures.test.ts`.

---

### D-005 — Semgrep Execution

**Date:** 2026-10-17
**Decision:** Run Semgrep Community Edition as a local CLI subprocess in the worker Docker image. No managed Semgrep platform.
**Context:** Need static analysis without external service dependency or per-seat cost.
**Alternatives:** Semgrep Cloud Platform, ESLint only, CodeQL.
**Rationale:** CLI subprocess gives full control, no per-repo cost, stays within the worker process boundary.
**Consequences:** Worker Docker image must include pinned Semgrep CLI. Subprocess timeouts, bounded input sizes, limited concurrency required.

---

### D-006 — GitHub Installation Token Lifecycle

**Date:** 2026-10-17
**Decision:** Use Octokit App authentication SDK. Never manually persist or refresh installation tokens. Store only: App ID, App private key, webhook secret.
**Context:** GitHub installation tokens expire after 1 hour and must be refreshed.
**Alternatives:** Manually implement token refresh, store tokens in Redis with TTL.
**Rationale:** Octokit SDK handles expiry and renewal transparently. Storing tokens increases breach surface area.
**Consequences:** Retry policy: bounded backoff for network/rate-limit errors; repeated 401/403 treated as actionable failure.

---

### D-007 — API Error Contract

**Date:** 2026-10-17
**Decision:** All API errors use `application/problem+json` (RFC 7807) with `ApiProblemV1` shape. Required codes: `VALIDATION_ERROR`, `AUTHENTICATION_REQUIRED`, `ACCESS_DENIED`, `RESOURCE_NOT_FOUND`, `CONFLICT`, `PAYLOAD_TOO_LARGE`, `RATE_LIMITED`, `UPSTREAM_FAILURE`, `SERVICE_UNAVAILABLE`, `INTERNAL_ERROR`. Every request gets `requestId` in logs and responses.
**Context:** Consistent error handling across API and frontend.
**Alternatives:** Custom error format, plain JSON, HTTP status only.
**Rationale:** RFC 7807 standard. `code` enum allows frontend to branch on error type. `requestId` enables log correlation.
**Consequences:** All route handlers and middleware must return `ApiProblemV1`. Frontend `ErrorDisplay` parses `problem.code` for user-friendly messages.

---

### D-008 — Database Migration Strategy

**Date:** 2026-10-17
**Decision:** Prisma Migrate with forward-only production migrations and expand-and-contract strategy. `prisma migrate deploy` in CI and production. No automatic rollback.
**Context:** Irreversible migrations are dangerous in production.
**Alternatives:** Down migrations, raw SQL files, full schema snapshots.
**Rationale:** Forward-only is safer. Expand-and-contract ensures backward compatibility during deployments. Documented in `docs/adr/0001-forward-only-migrations.md`.
**Consequences:** Destructive migrations require a documented recovery procedure and database backup.

---

### D-009 — Rate Limiting

**Date:** 2026-10-17
**Decision:** In-memory `express-rate-limit` for general API abuse. Database-backed review budgets for live review cost control. Initial limits: 60 req/min/IP for demo reads, 10 attempts/15min/IP for auth, 5 req/hour/user for live reviews.
**Context:** Demo endpoints must be protected from abuse without authentication. Live reviews cost money.
**Alternatives:** Redis-backed rate limiting, no rate limiting on demo.
**Rationale:** In-memory sufficient for demo. Database-backed budgets survive restarts for the costly live review path.
**Consequences:** `createDemoLimiter(rpm)` and `createAuthLimiter(max, windowMin)` in `apps/api/src/middleware/rateLimiter.ts`. Rate limiter applied before feature flag guard on demo routes.

---

### D-010 — Worker Queue

**Date:** 2026-10-17
**Decision:** PostgreSQL-backed polling queue. No Redis or BullMQ in MVP. Worker uses `FOR UPDATE SKIP LOCKED` for job claiming.
**Context:** Need async job processing. Redis adds operational complexity.
**Alternatives:** Redis/BullMQ, SQS, synchronous inline processing.
**Rationale:** PostgreSQL already required. `FOR UPDATE SKIP LOCKED` provides safe concurrent job claiming. Sufficient for MVP (WORKER_CONCURRENCY=1).
**Consequences:** New `review_jobs` and `webhook_deliveries` tables needed in M3. Worker config: `WORKER_POLL_INTERVAL_MS=2000`, `WORKER_MAX_ATTEMPTS=3`, `WORKER_LEASE_SECONDS=120`, `WORKER_JOB_TIMEOUT_SECONDS=600`.

---

### D-011 — Deployment Model

**Date:** 2026-10-17
**Decision:** Three entry points: `apps/api`, `apps/worker`, `apps/runtime` (combined API+worker for zero-cost deployment). `apps/runtime` runs both with WORKER_CONCURRENCY=1.
**Context:** Free-tier hosting supports one container.
**Alternatives:** Always separate processes, serverless, cloud run per invocation.
**Rationale:** Combined runtime satisfies zero-cost deployment for MVP. Separation available for production.
**Consequences:** `apps/runtime/src/index.ts` imports `createApp()` from `@prguardian/api`. Worker polling added to runtime in M3.

---

### D-012 — Webhook Tunneling

**Date:** 2026-10-17
**Decision:** Use ngrok on port 3001 for local webhook development. Webhook handler verifies HMAC-SHA256 signature against raw request body bytes before JSON parsing.
**Context:** GitHub webhooks require a public HTTPS URL.
**Alternatives:** smee.io, VS Code port forwarding, Cloudflare Tunnel.
**Rationale:** ngrok is widely used, supports HTTPS. Raw-body verification before JSON parsing is a security requirement.
**Consequences:** `WEBHOOK_SECRET` env var required. Documented in `docs/local-webhook-setup.md`.

---

### D-013 — Pricing Catalog

**Date:** 2026-10-17
**Decision:** Versioned pricing catalog at `packages/shared/src/pricing/pricing-catalog.json`. Per-review usage records store token counts, model ID, catalog version, and estimated cost. Historical estimates not recomputed when prices change.
**Context:** LLM API costs must be tracked per review.
**Alternatives:** Hardcode prices in code, fetch from API at runtime.
**Rationale:** Source-controlled catalog creates an audit trail. Historical immutability ensures consistent reporting.
**Consequences:** `catalogVersion` increments on any pricing change. Catalog verification required before release.

---

### D-014 — PR/CI Workflow

**Date:** 2026-10-17 (enforced after initial M0 push issues)
**Decision:** All changes via PR branch. CI (GitHub Actions) must pass — build, typecheck, lint, format:check, test — before merging to main. No direct pushes to main.
**Context:** Initial M0 commits had CI failures. Branch protection prevents broken main.
**Alternatives:** Direct pushes, merge without CI gate.
**Rationale:** Ensures main is always green. Required for credible resume demo project.
**Consequences:** Feature branches: `feat/module-X`. Fix branches: `fix/description`. Every PR needs passing CI before merge.

---

### D-015 — TypeScript Strictness

**Date:** 2026-10-17
**Decision:** TypeScript strict mode with `noUncheckedIndexedAccess: true` and `exactOptionalPropertyTypes: true`. Module: `"module": "Node16"` for apps/packages, `"moduleResolution": "bundler"` for `apps/web`.
**Context:** Strict TypeScript catches runtime bugs at compile time.
**Alternatives:** Loose TypeScript, any escapes, optional strict flags.
**Rationale:** `noUncheckedIndexedAccess` forces null checks on array/object index access. `exactOptionalPropertyTypes` prevents undefined being assigned to optional fields.
**Consequences:** Route handlers must check `req.params['id']` for undefined even though Express guarantees it. Array access requires bounds checking. JSON fixtures cast via schema `parse()` for runtime guarantees.

---

### D-016 — Demo Fixture Domain

**Date:** 2026-10-21
**Decision:** Demo fixtures use `acme-corp/api-gateway` as the sample repository, with a rate limiting PR (token bucket algorithm) as the demo subject.
**Context:** Demo fixtures need a realistic, recruiter-friendly codebase context covering all finding categories.
**Alternatives:** payment-service (JWT auth PR), pr-guardian itself (meta), e-commerce.
**Rationale:** API gateway with rate limiting naturally produces security, performance, error handling, bug, test coverage, and style findings — all 6 categories covered convincingly.
**Consequences:** Fixture filePaths reference realistic API gateway source files. The PR context describes a rate-limiting feature.

---

### D-017 — Frontend CSS Framework

**Date:** 2026-10-21
**Decision:** Tailwind CSS v4 with `@tailwindcss/vite` plugin. No PostCSS config file needed.
**Context:** `apps/web` needs a CSS solution.
**Alternatives:** Tailwind v3 (needs PostCSS config), CSS Modules, styled-components.
**Rationale:** v4's `@tailwindcss/vite` avoids a PostCSS step in the Vite pipeline. No additional Turbo task changes. Simpler configuration.
**Consequences:** `apps/web/vite.config.ts` adds `tailwindcss()` from `@tailwindcss/vite`. CSS uses `@import "tailwindcss"` (v4 syntax). `"type": "module"` required in `apps/web/package.json` (see D-022).

---

### D-018 — CORS Strategy

**Date:** 2026-10-21
**Decision:** CORS conditional: only enabled when `API_CORS_ORIGIN` env var is set. Applied before `express.json()`. Exposes `RateLimit-*` headers. Dev-only by convention.
**Context:** In dev, `apps/web` runs on Vite port 5173 and `apps/api` on 3001 — cross-origin. In production, reverse proxy serves both from same origin.
**Alternatives:** Always enable CORS, wildcard origin, separate dev/prod configs.
**Rationale:** Conditional CORS via env var is explicit and safe. Unset in production means no CORS header emitted.
**Consequences:** `API_CORS_ORIGIN=http://localhost:5173` in `.env.example`. CORS applied before `express.json()` to handle OPTIONS preflight before body parsing.

---

### D-019 — Fixture Storage Location

**Date:** 2026-10-21
**Decision:** Demo fixture JSON files live in `packages/shared/src/fixtures/`. Exported via `packages/shared/src/fixtures/index.ts`. Accessible via `@prguardian/shared/fixtures` subpath export.
**Context:** Fixtures must be available to both `apps/api` (demo endpoints) and `apps/web` (offline fallback).
**Alternatives:** `apps/api/src/fixtures/` (API-only), `apps/web/public/` (frontend-only), separate `packages/fixtures` package.
**Rationale:** Shared package is the canonical location for data contracts. Single source of truth.
**Consequences:** `packages/shared/package.json` needs `"exports"` subpath map with `"./fixtures"` entry. `tsconfig.base.json` needs `"resolveJsonModule": true`. Shared tsconfig needs `"src/**/*.json"` in include patterns.

---

### D-020 — Fixture Fingerprint Generation

**Date:** 2026-10-21
**Decision:** Fixture `fingerprint` is SHA-256 of `"{filePath}:{lineStart}:{message}"`, hex-encoded, truncated to 16 characters. Pre-computed when authoring and hardcoded in JSON.
**Context:** `FindingV1Schema` requires non-empty `fingerprint`. Used for deduplication in live mode.
**Alternatives:** UUID (not deterministic), full SHA-256 (64 chars), MD5.
**Rationale:** SHA-256 via Node built-in `crypto`. 16-char truncation provides sufficient collision resistance for demo data.
**Consequences:** If `filePath`, `lineStart`, or `message` changes in a fixture, the fingerprint must be manually recomputed.

---

### D-021 — Frontend Data Strategy

**Date:** 2026-10-21
**Decision:** Frontend is API-driven (primary). Calls `VITE_API_BASE_URL/api/v1/demo/*`. Fixture imports used only as offline fallback type reference.
**Context:** Need to decide whether frontend loads fixtures directly or via API calls.
**Alternatives:** Bundle fixtures directly (fully offline), always API-driven (fragile on API unavailability).
**Rationale:** API-driven keeps demo/live toggle logic server-side. Both paths use same `FindingV1`/`ReviewSummaryV1` types.
**Consequences:** `VITE_API_BASE_URL` must be set in all deployment environments. Frontend `ErrorDisplay` catches `ApiError` with `code: 'SERVICE_UNAVAILABLE'` and shows appropriate message.

---

### D-022 — Frontend Module Type

**Date:** 2026-10-21
**Decision:** Add `"type": "module"` to `apps/web/package.json`.
**Context:** `@tailwindcss/vite` v4 is ESM-only. Without `"type": "module"`, Vite's config loader (esbuild) tries to require it as CJS and fails with "ESM file cannot be loaded by require".
**Alternatives:** Use `.mts` extension for `vite.config.ts`, use Tailwind v3.
**Rationale:** `"type": "module"` is the standard Node.js way to declare an ESM package. Cleanest fix for the monorepo since `apps/web` is a frontend package with no Node.js CJS requirements.
**Consequences:** All `.js` files in `apps/web` are treated as ESM. The TypeScript `moduleResolution: "bundler"` in `apps/web/tsconfig.json` is compatible with this.

---

### D-023 — Session Store

**Date:** 2026-10-24
**Decision:** Custom Prisma session store adapter (`apps/api/src/lib/prismaSessionStore.ts`) implementing `express-session`'s `Store` interface using the existing `Session` Prisma model.
**Context:** Sessions must be stored in PostgreSQL per D-002. Two options: `connect-pg-simple` (raw PG connection) or a Prisma adapter. The `Session` model already exists.
**Alternatives:** `connect-pg-simple` (would require a second raw PG connection separate from Prisma's connection pool).
**Rationale:** Prisma adapter reuses the existing `getClient()` singleton — no second DB connection, consistent with the rest of the app. The `Session.userId` non-nullable FK is handled by using a signed cookie for OAuth state (D-024) so the store is only called after a user exists.
**Consequences:** `PrismaSessionStore` implements `get`, `set`, `destroy`, `touch`. `set` rejects if `userId` is not in the session data.

---

### D-024 — OAuth State Storage

**Date:** 2026-10-24
**Decision:** Store OAuth `state` parameter in a signed `HttpOnly; SameSite=Strict; Max-Age=600` cookie named `oauth_state`, not in a pre-auth session row.
**Context:** The `Session` Prisma model has a non-nullable `userId` FK. Creating a session before the user is authenticated would either require relaxing the FK or creating a "pending" user — both bad options.
**Alternatives:** Pre-auth session with nullable `userId` (requires schema change), stateless JWT signed state (works but adds dependency).
**Rationale:** A signed cookie is the simplest safe solution. The `cookie-parser` middleware with `SESSION_SECRET` handles signing and verification. Cookie is `SameSite=Strict` (the initiation request is same-origin), cleared immediately in the callback regardless of outcome.
**Consequences:** `oauth_state` cookie has 10-minute TTL. If the user takes > 10 min to authorize on GitHub, the callback returns 400 and they must retry.

---

### D-025 — BigInt Serialization

**Date:** 2026-10-24
**Decision:** All Prisma `BigInt` fields (`githubUserId`, `githubRepositoryId`, `githubInstallationId`) are converted to `string` at the API response boundary. Session stores `githubUserId` as a string; `requireAuth` converts back to `BigInt` for use in downstream handlers.
**Context:** JavaScript's `JSON.stringify` throws on `BigInt` values. Prisma maps PostgreSQL `bigint` to Node.js `BigInt`.
**Alternatives:** Use `number` type (loses precision for large GitHub IDs above 2^53), custom JSON serializer.
**Rationale:** String representation preserves full precision, is JSON-safe, and is easily parsed back with `BigInt()`. All GitHub numeric IDs fit comfortably as strings.
**Consequences:** API consumers receive GitHub user/repo/installation IDs as strings. Frontend `AuthUser` type has `githubUserId: string`. Any numeric comparison must use `BigInt()` conversion.
