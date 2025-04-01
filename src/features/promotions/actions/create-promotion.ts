"use server";

import prisma from "@/lib/prisma";
import { Promotion } from "@prisma/client";
import { CreatePromotionType } from "../types";

export const createPromotion = async (data: CreatePromotionType) => {
  const promotion = await prisma.promotion.create({
    data: {
      ...data,
      cardDuration: Number(data.cardDuration),
      requiredStamps: Number(data.requiredStamps),
      imageUrl: data.imageUrl ?? undefined,
    },
  });

  return promotion;
};
