"use server";

import prisma from "@/lib/prisma";
import { UserPromotion } from "@prisma/client";
export async function participatePromotion(
  promotionId: string,
  userId: string
): Promise<UserPromotion | null> {
  const promotion = await prisma.promotion.findUnique({
    where: {
      id: promotionId,
    },
  });

  if (!promotion) {
    throw new Error("Promoção não encontrada");
  }

  if (promotion.pausedAt) {
    throw new Error("Promoção pausada");
  }

  const exisistingActiveCard = await prisma.userPromotion.findFirst({
    where: {
      userId,
      promotionId,
      isClaimed: false,
    },
  });

  if (exisistingActiveCard) {
    return exisistingActiveCard;
  }

  const promotionUser = await prisma.userPromotion.create({
    data: {
      userId,
      promotionId,
      isCompleted: false,
      isClaimed: false,
    },
  });

  return promotionUser;
}
