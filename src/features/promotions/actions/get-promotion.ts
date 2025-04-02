"use server";

import prisma from "@/lib/prisma";

export async function getPromotion(promotionId: string) {
  const promotion = await prisma.promotion.findUnique({
    where: { id: promotionId },
    include: {
      company: true,
    },
  });

  const userPromotionsResult = await prisma.userPromotion.findMany({
    select: {
      id: true,
      createdAt: true,
      isClaimed: true,
      isCompleted: true,
    },
    where: {
      promotionId: promotionId,
    },
  });

  const totalUserPromotions = userPromotionsResult.length;

  const activeUserPromotions = userPromotionsResult.filter((userPromotion) => {
    if (!promotion?.cardDuration || !promotion?.endDate) {
      return !userPromotion.isClaimed;
    }
    const startDate = new Date(Date.now() - promotion.cardDuration * 24 * 60 * 60 * 1000);
    const endDate = new Date(promotion.endDate);
    return (
      userPromotion.createdAt >= startDate &&
      userPromotion.createdAt <= endDate &&
      !userPromotion.isClaimed
    );
  }).length;

  const completedUserPromotions = userPromotionsResult.filter(
    (userPromotion) => userPromotion.isClaimed
  ).length;

  return {
    promotion: promotion,
    userPromotions: {
      total: totalUserPromotions,
      active: activeUserPromotions,
      completed: completedUserPromotions,
    },
  };
}
