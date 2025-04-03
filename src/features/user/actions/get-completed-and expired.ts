"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getCompletedAndExpiredPromotions() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const completedCards = await prisma.userPromotion.findMany({
    where: {
      userId: session.user.id,
      isClaimed: true,
    },
    include: {
      promotion: { include: { company: true } },
    },
  });

  const expired = await prisma.userPromotion.findMany({
    where: {
      userId: session.user.id,
      isClaimed: false,
    },
    include: {
      promotion: { include: { company: true } },
    },
  });

  const expiredCards = expired.filter((userPromotion) => {
    const cardDuration = userPromotion.promotion.cardDuration;
    const endDate = userPromotion.promotion.endDate;
    const expirationDate = endDate ? new Date(endDate) : null;
    const durationExceeded = cardDuration
      ? new Date(userPromotion.createdAt).getTime() + cardDuration * 24 * 60 * 60 * 1000 <
        Date.now()
      : false;

    return (expirationDate && expirationDate < new Date()) || durationExceeded;
  });

  return { completedCards, expiredCards };
}
