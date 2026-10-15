# ADR 0001 — Forward-Only Database Migrations

**Status:** Accepted  
**Date:** 2026-10-15

## Context

PR Guardian uses Prisma Migrate for database schema management. We need a clear policy for how schema changes are applied and how rollbacks are handled.

## Decision

Use **forward-only migrations** with an **expand-and-contract** compatibility strategy.

### Rules

1. Every schema change is committed as a migration in `packages/database/prisma/migrations/`.
2. Production deployments run `prisma migrate deploy` — never `prisma migrate dev`.
3. Prisma does **not** generate automatic down-migrations. We do not rely on automated rollback.
4. Destructive schema changes (dropping columns, renaming, type changes) are never bundled with feature releases.

### Expand-and-contract sequence for breaking changes

1. **Expand**: Add the new nullable column, table, or index. Deploy application code compatible with both old and new schema.
2. **Backfill**: Migrate existing data if needed (in a separate migration or script).
3. **Contract**: Remove the deprecated column or table only in a later release, after all code references are removed.

### Rollback strategy

| Scenario | Action |
|---|---|
| App deployment fails, schema is compatible | Roll back the application binary. No schema change needed. |
| Migration fails before a destructive change | Diagnose and apply a corrective forward migration. |
| Destructive migration applied | Use a documented recovery SQL script (reviewed for data loss, tested before use) and a backup/export taken before the migration. |

### What is out of scope

Automatic schema downgrade for every migration is out of scope. We do not maintain a `down.sql` for every migration.

## Consequences

- Deployments can always be rolled back at the application layer as long as the schema remains additive.
- Developers must design migrations carefully and never treat schema changes as reversible by default.
- Historical data is preserved through explicit migration sequencing, not implicit rollback.
