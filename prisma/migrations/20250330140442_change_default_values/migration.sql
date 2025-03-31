/*
  Warnings:

  - You are about to drop the column `createdAt` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `stamp` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `stamp` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_promotion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_promotion` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "promotion" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "stamp" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_promotion" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
