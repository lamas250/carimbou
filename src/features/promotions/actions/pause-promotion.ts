"use server";

import prisma from "@/lib/prisma";

export async function pausePromotion(promotionId: string, reactivate: boolean = false) {
  await prisma.promotion.update({
    where: { id: promotionId },
    data: { pausedAt: reactivate ? null : new Date() },
  });
}
