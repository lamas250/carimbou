"use server";

import prisma from "@/lib/prisma";
import { StampStatus } from "@prisma/client";

export async function claimStamp(stampId: string, userId: string) {
  const stamp = await prisma.stamp.findUnique({
    where: { id: stampId },
    include: { promotion: true },
  });

  if (!stamp) {
    throw new Error("Selo não encontrado");
  }

  if (stamp.status === StampStatus.CLAIMED) {
    throw new Error("Selo já resgatado");
  }

  if (!stamp.promotion.isActive || stamp.promotion.isArchived) {
    throw new Error("Promoção não está ativa");
  }

  if (stamp.expiresAt && stamp.expiresAt < new Date()) {
    throw new Error("Selo expirado");
  }

  if (stamp.promotion.endDate && stamp.promotion.endDate < new Date()) {
    throw new Error("Promoção encerrada");
  }

  const userPromotion = await prisma.userPromotion.findFirst({
    where: {
      userId: userId,
      promotionId: stamp.promotion.id,
      isCompleted: false,
      isClaimed: false,
    },
    include: { stamps: { where: { status: StampStatus.CLAIMED } } },
  });

  if (!userPromotion) {
    throw new Error("Cartão não encontrado");
  }

  const cardDuration = userPromotion.createdAt.getTime() + (stamp.promotion.cardDuration ?? 0);

  if (stamp.promotion.cardDuration && cardDuration < new Date().getTime()) {
    throw new Error("Cartão expirado");
  }

  if (userPromotion?.stamps.length >= stamp.promotion.requiredStamps) {
    throw new Error("Cartão já está completo");
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.stamp.update({
      where: { id: stampId },
      data: { status: StampStatus.CLAIMED },
    });

    if (userPromotion.stamps.length + 1 >= stamp.promotion.requiredStamps) {
      await prisma.userPromotion.update({
        where: { id: userPromotion.id },
        data: { isCompleted: true },
      });
    }
  });

  return { success: true, message: "Selo resgatado com sucesso" };
}
