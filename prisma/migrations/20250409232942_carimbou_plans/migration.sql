-- CreateEnum
CREATE TYPE "CarimbouPlanType" AS ENUM ('FREE', 'BASIC', 'ADVANCED', 'CUSTOM');

-- CreateTable
CREATE TABLE "carimbou_plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "type" "CarimbouPlanType" NOT NULL,

    CONSTRAINT "carimbou_plan_pkey" PRIMARY KEY ("id")
);
