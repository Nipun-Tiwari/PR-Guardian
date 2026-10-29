# PR Guardian — Combined Engineering Plan

> This file merges `Plan.md` (original delivery plan) and `Updated_Plan.md` (architecture addendum).  
> **Updated_Plan.md decisions supersede any ambiguous or incomplete parts of Plan.md.**  
> Use this as the single reference document.

---

# PART 1 — Original Engineering Delivery Plan

**Document type:** Engineering implementation and delivery plan  
**Product:** PR Guardian — AI-Powered Code Review & Security Assistant  
**Target:** Student portfolio project for Software Engineer I applications  
**Delivery model:** Solo developer, incremental milestones  
**Deployment goal:** Public web demo with optional real GitHub pull request integration  
**Primary stack:** React, TypeScript, Node.js, PostgreSQL, GitHub App, Docker, LLM API

---

# 1. Project Overview

## 1.1 Project summary

PR Guardian is a GitHub-integrated code review assistant that automatically analyzes pull request changes, identifies potential bugs and security vulnerabilities, explains findings with code evidence, and suggests missing test cases.

When a developer opens or updates a pull request in a repository where PR Guardian is installed, GitHub sends an event to the PR Guardian backend. The backend retrieves the relevant code diff, runs deterministic static-analysis rules, invokes an LLM for contextual reasoning, validates the generated findings, and publishes the results as a GitHub Check Run with annotations where supported.

PR Guardian also provides a web dashboard for reviewing findings, inspecting evidence, browsing review history, submitting false-positive feedback, and monitoring review latency and estimated API cost.

A recruiter should be able to open the public website and explore a realistic sample review without connecting a repository, entering an API key, or waiting for AI processing.

## 1.2 Business objective

The product aims to reduce repetitive manual code-review effort and help developers discover potential defects before merging changes.

The portfolio objective is to demonstrate practical engineering competence across:

- Full-stack application development.
- GitHub APIs, Apps, webhooks and CI integrations.
- Secure API and background-job design.
- Static analysis and AI-assisted code reasoning.
- Database modelling and persistence.
- Automated testing and CI/CD.
- Deployment, observability and cost management.

## 1.3 User impact

| User | Expected benefit |
|---|---|
| Developer submitting a PR | Receives early feedback on potentially problematic code. |
| Code reviewer | Can prioritize issues that require human judgment. |
| Tech lead | Gets more consistent review feedback and historical visibility. |
| Recruiter evaluating the portfolio | Can explore a working application and see the engineering workflow. |
| Project owner | Can evaluate review quality, false positives, latency and operating cost. |

PR Guardian supplements human review. It does not certify code as secure or replace tests, developer judgment or a formal security review.

## 1.4 Key architectural assumptions

1. The project starts as a **modular monolith**, not a microservices platform.
2. The repository is organized as a TypeScript monorepo with separate frontend, API and worker applications.
3. The initial supported review languages are JavaScript and TypeScript.
4. The application uses a GitHub App rather than a personal access token as its primary repository integration.
5. GitHub Check Runs are the primary mechanism for publishing review status and line annotations.
6. The application never automatically changes source code, commits fixes or merges pull requests.
7. The LLM is accessed through a backend-only provider adapter. Claude Sonnet 4.6 can be configured for production reviews, but the review engine must not depend on a single model provider.
8. PostgreSQL is the source of truth for installations, repositories, jobs, reviews, findings and feedback.
9. The zero-cost deployment objective influences the initial infrastructure choices. PostgreSQL-backed background jobs are the default for the MVP; Redis and BullMQ are optional upgrades.
10. The public recruiter demo uses curated, non-sensitive sample data and works even when GitHub integration or AI processing is unavailable.

## 1.5 Dependencies

| Dependency | Purpose |
|---|---|
| GitHub App | Repository installation, webhook events and Check Runs. |
| GitHub REST API | Pull request metadata, changed files and publishing findings. |
| Node.js and TypeScript | Backend APIs and background workers. |
| React and TypeScript | Web dashboard and demo experience. |
| PostgreSQL | Persistent application state and review history. |
| Prisma ORM | Database access and migrations. |
| ESLint | Deterministic JavaScript/TypeScript checks. |
| Semgrep | Configured code-pattern and security analysis. |
| LLM API | Contextual explanations, bug reasoning and test suggestions. |
| Docker and Docker Compose | Reproducible local development. |
| Hosting provider | Public frontend and backend deployment. |
| CI provider | Automated tests, linting and builds. |

## 1.6 Principal risks

- The LLM may produce plausible but incorrect findings.
- Free hosting may sleep or impose runtime and quota limits.
- GitHub API rate limits and permissions may prevent a review from completing.
- Large diffs may exceed model context limits or result in excessive API cost.
- Code annotations may refer to invalid or outdated lines.
- Untrusted repository content may contain prompt-injection instructions.
- Duplicate webhooks may create duplicate reviews.
- Background jobs may fail or remain stuck after a deployment.
- Publicly accessible endpoints may be abused to trigger expensive reviews.
- False positives may reduce confidence in the product.

---

# 2. Technical Scope — Modules A–L

## 2.1 Target architecture

```text
Developer → GitHub Pull Request
   → Node.js API (signature verify, dedup, job create)
      → Review Worker
         → Diff Processor
         → ESLint / Semgrep
         → Finding Normalizer
         → LLM Service
         → Finding Validation
            → PostgreSQL + Review Result
               → GitHub Check Run + Dashboard API → React Dashboard
```

## 2.2 Module A — Public demo and frontend foundation

**Objective:** Provide immediate, reliable product value without requiring a GitHub connection.

APIs: `GET /api/v1/demo/reviews`, `GET /api/v1/demo/reviews/:id`, `GET /api/v1/demo/reviews/:id/findings`

**Acceptance criteria:** A recruiter can open the public URL and inspect a complete sample review without authentication. The demo remains available if the live review worker or AI provider is unavailable.

## 2.3 Module B — Authentication and GitHub App installation

**Objective:** Establish a secure relationship between a GitHub user, an installation and the repositories PR Guardian is allowed to access.

APIs: GitHub App installation flow, `GET /api/v1/repositories`

**Acceptance criteria:** An authorized user can install the App on a selected test repository. Uninstalled repositories become unavailable immediately.

## 2.4 Module C — Webhook ingress and review-job orchestration

**Objective:** Convert GitHub events into durable, retryable review jobs.

APIs: `POST /webhooks/github`, `GET /healthz`, `GET /readyz`

New tables: `webhook_deliveries`, `review_jobs`

**Acceptance criteria:** A valid webhook creates at most one logical review job for the configured revision. Invalid signatures never create jobs. Concurrent workers do not claim the same job simultaneously.

## 2.5 Module D — GitHub API client and diff processing

**Objective:** Retrieve the correct PR revision and transform its changed files into analyzable code units.

**Acceptance criteria:** The worker obtains the correct commit revision. Added-line mappings are correct for normal, renamed and multi-hunk diffs.

## 2.6 Module E — Deterministic static analysis

**Objective:** Identify known code-quality and security patterns using reproducible tools before invoking the LLM.

**Acceptance criteria:** A known unsafe code pattern produces the expected normalized finding. Scanner failure does not erase already collected results.

## 2.7 Module F — LLM review service

**Objective:** Explain deterministic findings, identify additional contextual risks and suggest relevant tests.

**Acceptance criteria:** Valid structured responses produce normalized candidate findings. Cost and input size are bounded. AI-disabled mode still produces static-analysis findings.

## 2.8 Module G — Finding normalization and validation

**Objective:** Produce one consistent, explainable finding format for all scanners and AI-generated results.

**Acceptance criteria:** Every persisted finding conforms to the schema. Duplicate findings are merged. Invalid annotations are never published.

## 2.9 Module H — Review persistence and lifecycle

**Objective:** Persist the full review lifecycle and preserve historical results by PR revision.

APIs: `GET /api/v1/reviews/:id`, `GET /api/v1/reviews/:id/findings`, `GET /api/v1/repositories/:id/reviews`

## 2.10 Module I — GitHub Check Run publishing

**Objective:** Publish review status and useful findings directly in the pull request.

**Acceptance criteria:** A review creates a visible Check Run against the correct commit. A stale review does not masquerade as a review of a newer commit.

## 2.11 Module J — Dashboard API and UI

**Objective:** Provide a usable interface for reviewing findings and managing repositories.

APIs: `GET /api/v1/repositories`, `GET /api/v1/repositories/:id/reviews`, `GET /api/v1/reviews/:id`, `GET /api/v1/reviews/:id/findings`, `POST /api/v1/findings/:id/feedback`

## 2.12 Module K — Feedback, metrics and cost accounting

**Objective:** Measure usefulness and keep the service economically predictable.

APIs: `POST /api/v1/findings/:id/feedback`, `GET /api/v1/metrics/summary`

## 2.13 Module L — Configuration, deployment and developer tooling

**Objective:** Provide reproducible local development and a secure public demo deployment.

---

# 3. Delivery Plan — Milestones

> **Note:** Effort estimates below are from Updated_Plan.md (supersede original Plan.md estimates).

| Milestone | Scope | Effort | Definition of Done |
|---|---|---:|---|
| M0 — Foundation | Monorepo, `/api/v1`, shared schemas, error contract, rate-limiter, migration policy, ngrok, CI | 6–8 h | Clean install, typecheck, lint, test in CI |
| M1 — Public demo | Shared-schema fixtures, demo UI, contract validation | 8–12 h | Recruiter can explore sample review without credentials |
| M2 — Authentication | GitHub App OAuth, sessions, installation ownership, repository authorization | 10–14 h | Authorized installation persisted and visible |
| M3 — Webhook & worker | Raw-body signature verify, dedup, PostgreSQL poller, leases, retries, runtime options | 9–13 h | Valid PR events create durable deduplicated jobs |
| M4 — Diff & static analysis | GitHub client/token lifecycle, diff mapping, Dockerized Semgrep + ESLint | 11–15 h | Known test PR produces deterministic findings |
| M5 — AI & validation | Provider adapter, schema validation, pricing catalog, usage capture, cost enforcement | 10–16 h | AI findings validated, bounded, provenance-tagged |
| M6 — GitHub publishing | Check Run lifecycle, annotation limits, stale-SHA protection | 6–10 h | Findings visible on correct commit in GitHub |
| M7 — Live dashboard | Authenticated APIs, review history, findings, feedback, contract tests, metrics | 9–13 h | Authenticated users can inspect live reviews and submit feedback |
| M8 — Deploy & hardening | Free-tier deployment, security review, migration checks, smoke tests, docs | 9–13 h | Public demo usable; live mode limitations documented |

**Revised total: 78–114 hours.**

## 3.1 Milestone delivery rules

- Each milestone must leave the default branch buildable and deployable.
- Database migrations must be committed with the code that uses them.
- New behavior must include automated tests.
- Live GitHub processing must remain feature-flagged until permissions, retries and security checks pass.
- Demo mode must remain functional while live integration is developed.

---

# 4. Feature Flags

| Flag | Default | Purpose |
|---|---|---|
| `DEMO_MODE_ENABLED` | true | Keeps the public demo available |
| `LIVE_GITHUB_ENABLED` | false | Prevents untested live processing |
| `STATIC_ANALYSIS_ENABLED` | true | Enables deterministic checks |
| `AI_REVIEW_ENABLED` | false | Disables LLM usage when unnecessary |
| `GITHUB_PUBLISH_ENABLED` | false | Prevents premature Check Run writes |
| `LIVE_REVIEW_RATE_LIMIT_ENABLED` | true | Protects against review abuse |
| `COST_LIMIT_ENFORCED` | true | Rejects processing above configured budget |

---

# 5. Security Boundaries (Must Not Be Compromised)

1. Never run arbitrary pull request code inside the API process.
2. Never expose the LLM API key or GitHub App private key in frontend code.
3. Never allow a model-generated finding to bypass schema validation.
4. Never assume that a valid GitHub event alone authorizes a user to view all historical data.
5. Never publish findings from a stale SHA as though they belong to the latest PR revision.

---

# PART 2 — Architecture Decisions Addendum (Updated_Plan.md)

> These 11 decisions supersede ambiguous or incomplete parts of Part 1.

---

## A1. Authentication: GitHub App OAuth for identity, installation for repository access

**Decision:** Use a single GitHub App for both user authorization and repository integration.

- **GitHub App user authorization** → establishes identity of the person accessing the live dashboard.
- **GitHub App installation** → grants access to installed repositories and allows publishing Check Runs.

The anonymous recruiter demo does not require authentication.

**MVP scope restriction:** First release supports personal GitHub account installations owned by the authenticated user. Organization collaboration is deferred.

**Session requirements:** Server-side sessions in PostgreSQL. `HttpOnly; Secure` cookie in production. `SameSite=Lax`. Rotate session after authentication. Discard GitHub access token after identity retrieval.

**Acceptance criteria:** Demo works without login. User identity and installation permissions are not conflated. Removing an installation immediately disables live access.

---

## A2. Internal API versioning and GitHub API versioning

**Decision:** Use `/api/v1/` for all versioned application REST APIs. Use `/webhooks/github` (no version) for GitHub webhook delivery. Pin `X-GitHub-Api-Version` header on all outbound GitHub REST calls.

**Endpoint convention:**
```
GET    /api/v1/demo/reviews
GET    /api/v1/demo/reviews/:id
GET    /api/v1/repositories
GET    /api/v1/repositories/:id/reviews
GET    /api/v1/reviews/:id
GET    /api/v1/reviews/:id/findings
POST   /api/v1/findings/:id/feedback
POST   /webhooks/github
GET    /healthz
GET    /readyz
```

**New config:** `APP_API_VERSION=v1`, `GITHUB_API_VERSION=2022-11-28`

---

## A3. One versioned domain contract for demo and live data

**Decision:** Keep versioned Zod schemas in `packages/shared`. Demo fixtures, backend responses, persisted findings and frontend components all use the same schemas.

**Core schemas:** `ReviewSummaryV1`, `FindingV1`, `ApiProblemV1` (see `packages/shared/src/index.ts`).

Validate every fixture against its Zod schema during CI.

---

## A4. Semgrep execution environment

**Decision:** Run Semgrep Community Edition as a local CLI subprocess inside the worker's Docker image. No managed Semgrep platform. No remote rule registry.

**Execution:** Worker creates temp dir → writes relevant files → invokes pinned Semgrep CLI with local rules → captures JSON → normalizes to `FindingV1` → deletes temp dir in `finally`.

**Security:** Pin CLI version. No `npm install` from reviewed repos. Apply subprocess timeouts and bounded input sizes.

---

## A5. GitHub installation-token lifecycle

**Decision:** Use the official Octokit App SDK. Never persist installation access tokens. The SDK manages creation and renewal of short-lived tokens.

**Credential storage:** Only `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, and `WEBHOOK_SECRET` are deployment secrets. No installation tokens in the DB.

**Retry policy:** Retry transient errors with bounded backoff. Treat repeated 401/403 as actionable installation/permission failure.

---

## A6. Shared API error contract

**Decision:** Every API error uses `application/problem+json` with this envelope:

```json
{
  "type": "https://prguardian.dev/problems/<code>",
  "title": "...",
  "status": 400,
  "detail": "...",
  "code": "VALIDATION_ERROR",
  "requestId": "req_xxx",
  "retryable": false,
  "errors": [{ "path": "field", "message": "..." }]
}
```

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid request |
| 401 | `AUTHENTICATION_REQUIRED` | Missing/invalid session |
| 403 | `ACCESS_DENIED` | Authenticated but unauthorized |
| 404 | `RESOURCE_NOT_FOUND` | Resource unavailable |
| 409 | `CONFLICT` | Duplicate/incompatible state |
| 429 | `RATE_LIMITED` | Rate or review limit exceeded |
| 500 | `INTERNAL_ERROR` | Unexpected failure |

Never expose stack traces, filesystem paths, tokens or DB connection strings.

---

## A7. Database migration and rollback strategy

**Decision:** Prisma Migrate, **forward-only**, expand-and-contract strategy.

- Every schema change is committed as a migration file.
- Production uses `prisma migrate deploy`.
- Destructive changes are not bundled with feature releases.
- Prefer adding nullable columns first; backfill; remove old column in a later release.

**Rollback:** If schema remains compatible, roll back the app deployment. If migration fails before a destructive change, apply a corrected forward migration.

---

## A8. Rate-limiting implementation

**Decision:** Express rate-limiting middleware (in-memory) for general abuse protection. Separate durable DB-backed review budgets for cost controls.

| Route | Limit |
|---|---|
| Public demo reads | 60 req/min/IP |
| Auth attempts | 10 attempts/15 min/IP |
| Live review requests | 5/hour/user, subject to cost budgets |
| Webhooks | Signature + dedup + body-size controls (no IP limiter) |

---

## A9. Worker process model and free-tier deployment

**Decision:** PostgreSQL-backed polling job queue. No Redis for MVP.

**Worker algorithm:**
1. Poll for available jobs at `WORKER_POLL_INTERVAL_MS`.
2. Claim job inside a short transaction using `FOR UPDATE SKIP LOCKED`.
3. Mark running, assign lease.
4. Process **outside** the transaction.
5. Persist result and complete job.
6. On failure: retry if attempts < max; otherwise mark failed.
7. Stop claiming on SIGTERM/SIGINT (graceful drain).

**Never hold a DB transaction open while calling GitHub, scanners or the LLM.**

**Initial config:**
```
WORKER_POLL_INTERVAL_MS=2000
WORKER_CONCURRENCY=1
WORKER_MAX_ATTEMPTS=3
WORKER_LEASE_SECONDS=120
WORKER_JOB_TIMEOUT_SECONDS=600
```

**Process entry points:**
- `apps/api/src/server.ts` — API only
- `apps/worker/src/start.ts` — worker only (calls `startWorker()` from `index.ts`)
- `apps/runtime/src/index.ts` — API + inline worker (zero-cost deployment)

---

## A10. Verified local webhook tunneling

**Decision:** Use ngrok for local webhook development.

```bash
ngrok http 3001
# Set GitHub App webhook URL to: https://<ngrok-host>/webhooks/github
```

**Signature verification requirements:**
- Mount webhook router BEFORE `express.json()`.
- Use `express.raw({ type: '*/*' })` to capture raw bytes.
- Compute HMAC-SHA256, compare with `timingSafeEqual`.
- Parse JSON only after signature is verified.

---

## A11. Pricing configuration and cost accounting

**Decision:** Versioned pricing catalog at `packages/shared/src/pricing/pricing-catalog.json`. No hard-coded model prices. No reliance on undocumented provider cost fields.

Store per-review: provider+model ID, catalog version, input/output token counts, cache usage, provider-reported cost (if available), calculated estimated cost, currency, timestamp.

---

# PART 3 — Test Plan Summary

## Additional tests from Updated_Plan.md

| Test ID | Scenario | Expected result |
|---|---|---|
| UT-C07 | Valid signed raw body vs tampered body | Valid passes; tampered rejected |
| UT-C08 | Exceed endpoint rate limit | HTTP 429 + common error envelope |
| UT-L05 | Inline runtime + separate worker modes | Both use same job contract |
| IT-12 | Webhook tunnel verification | Signature verified, job created, dedup works |
| IT-13 | Worker crash recovery | Expired lease enables safe retry |

Full test plans are in Plan.md sections 5 and 6.

---

# PART 4 — Revised Delivery Sequence

1. Freeze architecture decisions → commit decisions.md
2. Build shared contracts (`packages/shared`)
3. Establish local dev (Docker, PostgreSQL, CI, ngrok)
4. Build public demo (schema-validated fixtures)
5. Add rate limiting
6. Implement GitHub authentication and installation ownership
7. Implement signed webhooks and durable jobs ← **M3 (current)**
8. Implement worker polling lifecycle ← **M3 (current)**
9. Implement GitHub client (Octokit SDK, token lifecycle) ← **M4 next**
10. Implement diff processing and local static analysis ← **M4**
11. Implement finding validation and persistence ← **M4/M5**
12. Implement LLM and pricing catalog ← **M5**
13. Implement Check Run publishing ← **M6**
14. Connect authenticated dashboard ← **M7**
15. Complete security/integration testing ← **M8**
16. Deploy and verify ← **M8**

---

# PART 5 — Final Priority Order

If time is constrained:

1. Public demo and clear UI
2. Secure GitHub App and webhook handling
3. Reliable diff processing
4. Deterministic static analysis
5. Finding validation and correct line mapping
6. AI explanations with cost limits
7. GitHub Check Run publishing
8. Live dashboard and feedback
9. Quality/cost analytics
10. Advanced scaling (Redis/BullMQ optional)

**Do not cut:** webhook validation, authorization, finding validation, revision safety, or automated tests.  
**Cut instead:** optional UI polish, advanced metrics.

---

# PART 6 — Explicitly Out of Scope (First Release)

- Autonomous code modifications or automatic commits
- Multi-agent orchestration
- Supporting every programming language
- Arbitrary execution of repository test suites
- Enterprise SSO, organization billing, multi-tenant administration
- Guaranteed always-on SLAs
- Custom model training
- Advanced historical trend analytics
