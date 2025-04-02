"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserPromotionWithStamps } from "./get-my-cards";

export async function getUserPromotion(userPromotionId: string): Promise<UserPromotionWithStamps> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userPromotion = await prisma.userPromotion.findUnique({
    where: {
      id: userPromotionId,
      userId: session.user.id,
      // isCompleted: false,
      isClaimed: false,
    },
    include: { stamps: true, promotion: { include: { company: true } } },
  });

  if (!userPromotion) {
    throw new Error("User promotion not found");
  }

  return {
    ...userPromotion,
    stamps: userPromotion.stamps.length,
    company: userPromotion.promotion.company,
    history: userPromotion.stamps,
  };
}
