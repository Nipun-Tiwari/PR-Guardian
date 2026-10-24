-- CreateEnum
CREATE TYPE "InstallationStatus" AS ENUM ('active', 'removed');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "github_user_id" BIGINT NOT NULL,
    "github_username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repositories" (
    "id" TEXT NOT NULL,
    "github_repository_id" BIGINT NOT NULL,
    "github_installation_id" BIGINT NOT NULL,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "owned_by_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repository_installations" (
    "id" TEXT NOT NULL,
    "github_installation_id" BIGINT NOT NULL,
    "github_account_id" BIGINT NOT NULL,
    "github_account_login" TEXT NOT NULL,
    "created_by_user_id" TEXT NOT NULL,
    "status" "InstallationStatus" NOT NULL DEFAULT 'active',
    "installed_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repository_installations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_github_user_id_key" ON "users"("github_user_id");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_expires_at_idx" ON "sessions"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_github_repository_id_key" ON "repositories"("github_repository_id");

-- CreateIndex
CREATE INDEX "repositories_github_installation_id_idx" ON "repositories"("github_installation_id");

-- CreateIndex
CREATE INDEX "repositories_owned_by_user_id_idx" ON "repositories"("owned_by_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "repository_installations_github_installation_id_key" ON "repository_installations"("github_installation_id");

-- CreateIndex
CREATE INDEX "repository_installations_github_account_id_idx" ON "repository_installations"("github_account_id");

-- CreateIndex
CREATE INDEX "repository_installations_created_by_user_id_idx" ON "repository_installations"("created_by_user_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_owned_by_user_id_fkey" FOREIGN KEY ("owned_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repository_installations" ADD CONSTRAINT "repository_installations_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
