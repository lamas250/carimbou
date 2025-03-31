"use server";

import prisma from "@/lib/prisma";

export const getPromotions = async (companyId: string) => {
  const promotions = await prisma.promotion.findMany({ where: { companyId } });
  return promotions;
};
