"use server";

import prisma from "@/lib/prisma";

export const redeemCard = async (userPromotionId: string, userId: string) => {
  const userPromotion = await prisma.userPromotion.findFirst({
    where: { id: userPromotionId, isClaimed: false },
    include: {
      promotion: { include: { company: true } },
      user: true,
    },
  });

  const isMember = await prisma.companyUser.findFirst({
    where: { userId, companyId: userPromotion?.promotion.company.id },
  });

  if (!isMember) {
    throw new Error("User is not a member of the company");
  }

  return userPromotion;
};
