"use server";

import prisma from "@/lib/prisma";
import { StampStatus } from "@prisma/client";
export const createStamp = async (promotionId: string, userPromotionId: string) => {
  const hasPendingStamp = await prisma.stamp.findFirst({
    where: {
      userPromotionId,
      status: StampStatus.PENDING,
    },
  });

  if (hasPendingStamp) {
    return {
      stamp: {
        id: hasPendingStamp.id,
        status: hasPendingStamp.status,
        promotionId: hasPendingStamp.promotionId,
      },
      url: `${process.env.NEXT_PUBLIC_APP_URL}/claim/${hasPendingStamp.id}`,
    };
  }

  const stamp = await prisma.stamp.create({
    data: {
      promotionId,
      userPromotionId,
      status: StampStatus.PENDING,
    },
  });
  return {
    stamp: {
      id: stamp.id,
      status: stamp.status,
      promotionId: stamp.promotionId,
    },
    url: `${process.env.NEXT_PUBLIC_APP_URL}/claim/${stamp.id}`,
  };
};
