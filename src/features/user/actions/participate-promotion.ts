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
