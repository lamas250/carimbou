"use server";

import prisma from "@/lib/prisma";
import { Promotion } from "@prisma/client";
import { CreatePromotionType } from "../types";

export const createPromotion = async (data: CreatePromotionType) => {
  const promotion = await prisma.promotion.create({
    data: {
      ...data,
      companyId: data.companyId,
      requiredStamps: Number(data.requiredStamps),
    },
  });

  return promotion;
};
