/*
  Warnings:

  - Added the required column `promotionId` to the `stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `stamp` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StampStatus" AS ENUM ('PENDING', 'EXPIRED', 'CLAIMED');

-- AlterTable
ALTER TABLE "stamp" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "promotionId" TEXT NOT NULL,
ADD COLUMN     "status" "StampStatus" NOT NULL,
ALTER COLUMN "userPromotionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "stamp" ADD CONSTRAINT "stamp_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
