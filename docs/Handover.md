# PR Guardian — AI Handover Document

**Date:** 2026-10-29  
**Project:** PR Guardian — AI-Powered GitHub Code Review Assistant  
**Repo root:** `pr-guardian/` (Turborepo + npm workspaces monorepo)  
**Active branch:** `feat/m3-webhook-job-queue`  
**Handover reason:** Continuing implementation in a new AI session

---

## 1. Project Summary

PR Guardian is a student portfolio project. When a developer opens or updates a pull request on a GitHub-connected repository, PR Guardian:
1. Receives a GitHub webhook
2. Enqueues a review job in PostgreSQL
3. A worker polls and claims the job
4. Fetches the diff, runs static analysis (Semgrep + ESLint), calls an LLM (Claude), validates findings
5. Publishes results as a GitHub Check Run and stores them for the web dashboard

There is also a public **recruiter demo** (no login needed) at `/demo` using fixture data, so the portfolio always looks live.

**Tech stack:** TypeScript 5.6 (strict), Node.js 20, Express 4, React 18 + Vite + Tailwind v4, PostgreSQL + Prisma ORM, Zod, pino, Vitest, Docker, Turborepo.

---

## 2. Milestone Status

| Milestone | Status | Notes |
|-----------|--------|-------|
| M0 — Foundation | ✅ Complete | Monorepo, CI, shared schemas, error contracts, rate limiter, sessions store, Docker |
| M1 — Public Demo | ✅ Complete | Demo fixtures, demo API routes, React dashboard |
| M2 — Auth & Identity | ✅ Complete | GitHub App OAuth, sessions, `requireAuth`, repositories endpoint |
| **M3 — Webhook & Job Queue** | **🔶 Code done, CI blocked** | See Section 4 for the one remaining action |
| M4 — Diff & Static Analysis | ⬜ Not started | `packages/diff-engine`, `packages/static-analysis`, `packages/github-client` are stubs |
| M5 — AI Review | ⬜ Not started | `packages/ai-review` is a stub |
| M6 — GitHub Publishing | ⬜ Not started | Check Run publication, `GITHUB_PUBLISH_ENABLED` feature flag |
| M7 — Live Dashboard | ⬜ Not started | Authenticated review history, findings, feedback APIs |
| M8 — Deploy & Hardening | ⬜ Not started | Security review, smoke tests, Render deployment |

---

## 3. What Was Built in M3

All M3 application code is committed on branch `feat/m3-webhook-job-queue`. Here is exactly what was added:

### Database schema (`packages/database/prisma/schema.prisma`)
- **New enum:** `ReviewJobStatus` (`pending | running | succeeded | failed`)
- **New model:** `WebhookDelivery` — deduplication log keyed on `github_delivery_id` (unique)
- **New model:** `ReviewJob` — job queue with lease columns for `FOR UPDATE SKIP LOCKED` polling
- **Changed:** `RepositoryInstallation.createdByUserId` → `String?` (nullable)
- **Changed:** `Repository.ownedByUserId` → `String?` (nullable)

### New files
| File | Purpose |
|------|---------|
| `apps/api/src/lib/webhookSignature.ts` | `verifyGitHubSignature()` — HMAC-SHA256 constant-time verification |
| `apps/api/src/routes/webhooks.ts` | `POST /webhooks/github` handler — raw-body parsing, signature verify, dedup, event routing |
| `apps/worker/src/config.ts` | Zod-validated worker env vars (`WORKER_POLL_INTERVAL_MS`, etc.) |
| `apps/worker/src/lib/jobQueue.ts` | `claimJob` (FOR UPDATE SKIP LOCKED), `processJob` (M3 stub), `handleJobFailure` |
| `apps/worker/src/start.ts` | Standalone entry point — calls `startWorker()` |
| `apps/api/tests/helpers/webhook.ts` | Test helper: `buildSignedWebhookRequest()` |
| `apps/api/tests/webhooks/signature.test.ts` | Unit tests UT-C07 |
| `apps/api/tests/webhooks/webhook.test.ts` | Integration tests UT-C08, IT-12, IT-13 |

### Modified files
| File | What changed |
|------|--------------|
| `apps/api/src/config.ts` | Added `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `WEBHOOK_SECRET` as required fields |
| `apps/api/src/server.ts` | Mounts `webhookRouter` BEFORE `express.json()` (critical for raw-body HMAC) |
| `apps/worker/src/index.ts` | Replaced 10-line stub with full polling loop; exports `startWorker()` |
| `apps/worker/package.json` | Added `exports` field, `zod` dep, changed `main`/`dev` to `start.ts` |
| `apps/worker/tests/worker.test.ts` | Full job queue test suite (replaced placeholder) |
| `apps/worker/vitest.config.ts` | Added `env` block with `DATABASE_URL` and `WORKER_*` vars |
| `apps/api/vitest.config.ts` | Added `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `WEBHOOK_SECRET` to `env` |
| `apps/runtime/src/index.ts` | Now calls `startWorker()` alongside API for zero-cost deployment |
| `apps/runtime/package.json` | Added `@prguardian/worker` dependency |
| `.env.example` | Uncommented/documented `WEBHOOK_SECRET`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_ID` |
| `.github/workflows/ci.yml` | Added `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `WEBHOOK_SECRET` to CI `env:` block |
| `decisions.md` | Added D-026 (nullable FKs) and D-027 (raw-body scope) |

### Key design decisions
- **Raw-body before JSON parser:** Webhook router mounts BEFORE `express.json()`. Uses `express.raw({ type: '*/*' })` internally to preserve raw bytes for HMAC. Never use `express.json()` on the webhook route.
- **Claim atomicity:** `SELECT FOR UPDATE SKIP LOCKED` + `UPDATE status='running'` run inside a single `db.$transaction()`. Never hold the transaction open while doing external work.
- **No Redis:** Job queue is pure PostgreSQL. `FOR UPDATE SKIP LOCKED` handles concurrency. No BullMQ or Redis until needed.
- **Worker entry point split:** `index.ts` exports `startWorker()` as a library; `start.ts` is the runnable entry point. This allows `apps/runtime` to import and call `startWorker()` without double-starting the loop.
- **M3 worker stub:** `processJob()` logs and immediately marks the job `succeeded`. The real pipeline (diff fetch, static analysis, LLM) is M4/M5.
- **`installationId`/`repositoryId` are NOT foreign keys in `review_jobs`:** A webhook can arrive before the `RepositoryInstallation` row exists. M4 will look up the installation when it needs to mint an Octokit token.

---

## 4. The One Remaining Blocker (Action Required)

**CI is failing** because the M3 Prisma migration file has not been committed yet.

### Root cause
`prisma migrate dev` (which generates the migration SQL) requires a live PostgreSQL connection. This environment has no database. The migration SQL was written manually but was **not committed** — it is sitting as an untracked file:

```
packages/database/prisma/migrations/20261024180000_m3_webhook_queue/migration.sql
```

### What you need to do on the system with PostgreSQL

**Option A — Use the pre-written migration SQL (recommended, fast):**
The manually written SQL file already exists in the repo at:
`packages/database/prisma/migrations/20261024180000_m3_webhook_queue/migration.sql`

Just stage and commit it:
```bash
cd pr-guardian
git add packages/database/prisma/migrations/20261024180000_m3_webhook_queue/migration.sql
git commit -m "feat(database): add m3_webhook_queue migration for review_jobs and webhook_deliveries"
git push
```

**Option B — Let Prisma regenerate it (cleaner timestamp):**
```bash
cd pr-guardian
# Discard the manually-written file first
rm -rf packages/database/prisma/migrations/20261024180000_m3_webhook_queue

# With Docker running:
docker compose up -d postgres
cd packages/database
npx prisma migrate dev --name m3_webhook_queue
cd ../..
git add packages/database/prisma/migrations/
git commit -m "feat(database): add m3_webhook_queue migration"
git push
```

Either option will unblock CI. Once pushed, the CI pipeline should go green.

---

## 5. Repository Structure

```
pr-guardian/
├── apps/
│   ├── api/          — Express API server (port 3001)
│   ├── web/          — React + Vite frontend (port 5173)
│   ├── worker/       — Background job worker (polls PostgreSQL)
│   └── runtime/      — Combined API+worker for free-tier deploy (Render)
├── packages/
│   ├── database/     — Prisma ORM client + migrations
│   ├── shared/       — Zod schemas (FindingV1, ReviewSummaryV1, ApiProblemV1), fixtures, pricing catalog
│   ├── observability/ — pino logger singleton
│   ├── github-client/ — STUB (implement in M4)
│   ├── diff-engine/  — STUB (implement in M4)
│   ├── static-analysis/ — STUB (implement in M4)
│   ├── finding-engine/ — STUB (implement in M5)
│   └── ai-review/    — STUB (implement in M5)
├── decisions.md      — Architectural decision log (D-001 to D-027)
├── Plan.md           — Original engineering plan (M0–M8)
├── Updated_Plan.md   — Architecture addendum closing 11 gaps (A1–A11)
└── Combined_Plan.md  — Plan.md + Updated_Plan.md merged (single reference)
```

---

## 6. Environment Variables Reference

### Required for `apps/api`
| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | ≥32 chars, signs session cookies |
| `GITHUB_CLIENT_ID` | GitHub App OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub App OAuth client secret |
| `GITHUB_OAUTH_CALLBACK_URL` | e.g. `http://localhost:3001/api/v1/auth/github/callback` |
| `FRONTEND_URL` | e.g. `http://localhost:5173/auth/callback` |
| `GITHUB_APP_ID` | Numeric GitHub App ID (**added in M3**) |
| `GITHUB_APP_PRIVATE_KEY` | Base64-encoded PEM private key (**added in M3**) |
| `WEBHOOK_SECRET` | GitHub App webhook secret (**added in M3**) |

### Required for `apps/worker`
| Var | Default | Purpose |
|-----|---------|---------|
| `DATABASE_URL` | — | PostgreSQL connection string |
| `WORKER_POLL_INTERVAL_MS` | 2000 | How often to poll for jobs |
| `WORKER_CONCURRENCY` | 1 | Parallel job slots |
| `WORKER_MAX_ATTEMPTS` | 3 | Retry limit per job |
| `WORKER_LEASE_SECONDS` | 120 | Job lease duration |
| `WORKER_JOB_TIMEOUT_SECONDS` | 600 | Max job wall-clock time |

### Local dev setup
```bash
cp .env.example .env
# Fill in GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_APP_ID,
# GITHUB_APP_PRIVATE_KEY, WEBHOOK_SECRET, SESSION_SECRET
docker compose up
```

---

## 7. Key Conventions to Follow

- **API routes** live under `/api/v1/` prefix. The webhook endpoint is `/webhooks/github` (no version prefix).
- **Error responses** always use `ApiProblemV1` shape (`application/problem+json`), never ad-hoc JSON.
- **BigInt fields** from Prisma (`githubUserId`, `githubInstallationId`, `githubRepositoryId`) must be serialized as `string` at API boundaries.
- **Migrations** are forward-only. Never write a down migration. Use expand-and-contract for destructive changes.
- **Prisma generated client** lives at `packages/database/src/generated/client/` and is committed to the repo (it is excluded from Prettier via `.prettierignore`).
- **`exactOptionalPropertyTypes: true`** is enabled — use `null` explicitly, not `undefined`, when setting nullable Prisma fields.
- **Tests** use a real test database (`prguardian_test`), never mocks. `DATABASE_URL` must point to a running PostgreSQL when running tests locally.
- **Worker transactions:** Never hold a `$transaction` open while calling GitHub, the LLM, or running Semgrep.

---

## 8. Next Milestone: M4 — Diff and Static Analysis

Once M3 CI is green (migration file committed), M4 begins. Scope:

1. **`packages/github-client`** — Octokit App SDK, installation token lifecycle (auto-renewed, never persisted), PR metadata fetch, diff fetch, pinned `GITHUB_API_VERSION` header
2. **`packages/diff-engine`** — unified diff parser, hunk mapping, changed-line annotation positions
3. **`packages/static-analysis`** — ESLint adapter + Semgrep CLI subprocess (pinned version, local rules, JSON output, timeout, temp-dir cleanup)
4. **Worker pipeline** — replace the M3 `processJob` stub with the real orchestration: fetch diff → parse → run scanners → normalize findings → persist `ReviewSummaryV1` + `FindingV1[]`
5. **New Prisma models** — `reviews` and `findings` tables
6. **New API routes** — `GET /api/v1/repositories/:id/reviews`, `GET /api/v1/reviews/:id`, `GET /api/v1/reviews/:id/findings`

Relevant planning references: Plan.md sections 2.6–2.8, Updated_Plan.md decisions A4 (Semgrep), A5 (GitHub token lifecycle).

---

## 9. Reference Files in This Repo

| File | What it contains |
|------|-----------------|
| `decisions.md` | D-001 to D-027 — every architectural decision with rationale |
| `Combined_Plan.md` | Full engineering plan including M0–M8 scope + architecture decisions A1–A11 |
| `.env.example` | All env vars with documentation |
| `apps/api/src/middleware/errorHandler.ts` | `AuthenticationError`, `AccessDeniedError`, `errorHandler` — use these, don't invent new error patterns |
| `packages/shared/src/index.ts` | `FindingV1Schema`, `ReviewSummaryV1Schema`, `ApiProblemV1Schema` — all domain contracts |
| `packages/database/prisma/schema.prisma` | Current full schema |
