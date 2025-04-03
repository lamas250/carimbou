"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserPromotionWithStamps } from "./get-my-cards";
import { redirect } from "next/navigation";

export async function getUserPromotion(
  userPromotionId: string
): Promise<UserPromotionWithStamps | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userPromotion = await prisma.userPromotion.findUnique({
    where: {
      id: userPromotionId,
      userId: session.user.id,
    },
    include: { stamps: true, promotion: { include: { company: true } } },
  });

  if (!userPromotion) {
    redirect("/home");
  }

  return {
    ...userPromotion,
    stamps: userPromotion.stamps.length,
    company: userPromotion.promotion.company,
    history: userPromotion.stamps,
  };
}
