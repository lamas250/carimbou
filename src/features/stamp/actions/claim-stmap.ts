"use server";

import prisma from "@/lib/prisma";
import { StampStatus } from "@prisma/client";

export async function claimStamp(stampId: string, userId: string) {
  const stamp = await prisma.stamp.findUnique({
    where: { id: stampId },
    include: { promotion: true },
  });

  if (!stamp) {
    throw new Error("Stamp not found");
  }

  if (stamp.status === StampStatus.CLAIMED) {
    throw new Error("Stamp already claimed");
  }

  if (!stamp.promotion.isActive || stamp.promotion.isArchived) {
    throw new Error("Promotion is not active");
  }

  if (stamp.expiresAt && stamp.expiresAt < new Date()) {
    throw new Error("Stamp expired");
  }

  if (stamp.promotion.endDate && stamp.promotion.endDate < new Date()) {
    throw new Error("Promotion ended");
  }

  const userPromotion = await prisma.userPromotion.findFirst({
    where: {
      userId: userId,
      promotionId: stamp.promotion.id,
      isCompleted: false,
      isClaimed: false,
    },
    include: { stamps: true },
  });

  if (!userPromotion) {
    const newUserPromotion = await prisma.userPromotion.create({
      data: {
        userId: userId,
        promotionId: stamp.promotion.id,
        isCompleted: false,
        isClaimed: false,
      },
    });

    await prisma.stamp.update({
      where: { id: stampId },
      data: { userPromotionId: newUserPromotion.id },
    });

    return { success: true, message: "Stamp claimed successfully" };
  }

  const cardDuration = userPromotion.createdAt.getTime() + (stamp.promotion.cardDuration ?? 0);

  if (stamp.promotion.cardDuration && cardDuration < new Date().getTime()) {
    throw new Error("Card expired");
  }

  if (userPromotion?.stamps.length >= stamp.promotion.requiredStamps) {
    throw new Error("Stamp limit reached");
  }

  await prisma.stamp.update({ where: { id: stampId }, data: { status: StampStatus.CLAIMED } });

  return { success: true, message: "Stamp claimed successfully" };
}
