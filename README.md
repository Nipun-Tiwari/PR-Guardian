# PR Guardian

AI-powered code review assistant. When a pull request is opened, PR Guardian runs static analysis (ESLint + Semgrep) and an LLM review, then posts findings as GitHub Check Run annotations and displays them in a web dashboard.

A public recruiter demo is available without any GitHub credentials or AI API keys.

---

## Prerequisites

- **Node.js 20+** and **npm 10+**
- **Docker Desktop** (for local PostgreSQL)
- **ngrok** (optional, for webhook development — see [docs/local-webhook-setup.md](docs/local-webhook-setup.md))

---

## Quick start

```bash
# 1. Clone and install
git clone https://github.com/<your-username>/pr-guardian
cd pr-guardian
npm install

# 2. Configure environment
cp .env.example .env
# The defaults in .env work for local Docker development — no changes needed for M0

# 3. Start PostgreSQL
docker compose up postgres -d

# 4. Run database migrations (first time only)
npm run db:migrate

# 5. Start the API
npm run dev -w apps/api

# 6. Verify
curl http://localhost:3001/healthz
# → {"status":"ok","timestamp":"..."}
```

---

## Running the full stack with Docker

```bash
docker compose up
curl http://localhost:3001/healthz
curl http://localhost:3001/readyz
```

---

## Development commands

```bash
# Run all tests
npm run test

# Type-check all packages
npm run typecheck

# Lint all packages
npm run lint

# Format check
npm run format:check

# Auto-format
npm run format

# Build all packages
npm run build

# Database — generate Prisma client
npm run db:generate

# Database — apply migrations (production-safe)
npm run db:migrate
```

---

## Project structure

```
pr-guardian/
├── apps/
│   ├── api/        Express API server
│   ├── web/        React dashboard (M1+)
│   ├── worker/     Background job worker (M3+)
│   └── runtime/    Combined API+worker for zero-cost hosting
├── packages/
│   ├── shared/     Versioned Zod schemas and types
│   ├── database/   Prisma ORM and migrations
│   ├── observability/  Structured logging (pino)
│   └── ...         Stub packages for future milestones
├── docs/
│   ├── adr/        Architecture decision records
│   └── local-webhook-setup.md
└── docker-compose.yml
```

---

## Feature flags

All features are controlled by environment variables:

| Flag                      | Default | Purpose                                     |
| ------------------------- | ------- | ------------------------------------------- |
| `DEMO_MODE_ENABLED`       | `true`  | Public recruiter demo — always keep enabled |
| `AI_REVIEW_ENABLED`       | `false` | LLM review (enabled in M5)                  |
| `LIVE_GITHUB_ENABLED`     | `false` | Real GitHub integration (enabled in M2+)    |
| `STATIC_ANALYSIS_ENABLED` | `true`  | ESLint/Semgrep analysis (enabled in M4)     |
| `GITHUB_PUBLISH_ENABLED`  | `false` | Check Run publishing (enabled in M6)        |

---

## Webhook development

See [docs/local-webhook-setup.md](docs/local-webhook-setup.md) for ngrok setup and signature verification.

---

## Milestones

| Milestone | Scope                                         |
| --------- | --------------------------------------------- |
| **M0** ✅ | Monorepo scaffold, shared schemas, CI, Docker |
| **M1**    | Public demo dashboard with fixture data       |
| **M2**    | GitHub App auth and repository installation   |
| **M3**    | Webhook ingress and PostgreSQL job queue      |
| **M4**    | Diff processing and static analysis           |
| **M5**    | LLM review and finding validation             |
| **M6**    | GitHub Check Run publishing                   |
| **M7**    | Live dashboard and feedback                   |
| **M8**    | Public deployment and hardening               |

---

## API

All application endpoints use the `/api/v1/` prefix.

| Endpoint       | Description      |
| -------------- | ---------------- |
| `GET /healthz` | Liveness check   |
| `GET /readyz`  | Readiness check  |
| `GET /api/v1/` | API version info |

Error responses follow [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807) with `application/problem+json`.
