-- AlterTable
ALTER TABLE "promotion" ALTER COLUMN "reward" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "isArchived" SET DEFAULT false;
