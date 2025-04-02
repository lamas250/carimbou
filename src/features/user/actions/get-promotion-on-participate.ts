"use server";

import prisma from "@/lib/prisma";
import { UserPromotion, Promotion, Company } from "@prisma/client";

export async function getPromotionOnParticipate(
  promotionId: string,
  userId: string
): Promise<{
  promotion?: Promotion & { company: Company };
  userPromotion?: UserPromotion;
}> {
  const promotion = await prisma.promotion.findUnique({
    where: {
      id: promotionId,
    },
    include: {
      company: true,
    },
  });

  if (!promotion) {
    return {
      promotion: undefined,
      userPromotion: undefined,
    };
  }
  const promotionUser = await prisma.userPromotion.findFirst({
    where: {
      userId,
      promotionId,
      isCompleted: false,
      isClaimed: false,
    },
  });

  if (!promotionUser) {
    return {
      promotion,
    };
  }

  return {
    userPromotion: promotionUser,
    promotion,
  };
}
