-- AlterTable
ALTER TABLE "carimbou_plan" ADD COLUMN     "allowed_companies" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "allowed_promotions" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "allowed_stamps" INTEGER NOT NULL DEFAULT 1500;
