"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Company, Promotion, UserPromotion, Stamp } from "@prisma/client";
import { redirect } from "next/navigation";

export type UserPromotionWithStamps = UserPromotion & {
  stamps: number;
  company: Company;
  promotion: Promotion;
  history: Stamp[];
};

export async function getMyCards(): Promise<UserPromotionWithStamps[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.user.findUnique({ where: { id: session?.user.id } });

  if (!user) {
    redirect("/sign-in");
  }

  const userPromotions = await prisma.userPromotion.findMany({
    where: { userId: user.id, isClaimed: false },
    include: { stamps: true, promotion: { include: { company: true } } },
  });

  const userPromotionsWithStamps = userPromotions.map((userPromotion) => {
    return {
      ...userPromotion,
      stamps: userPromotion.stamps.length,
      company: userPromotion.promotion.company,
      promotion: userPromotion.promotion,
      history: userPromotion.stamps,
    };
  });

  return userPromotionsWithStamps;
}
