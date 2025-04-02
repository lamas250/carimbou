import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  if (!companyId) {
    return NextResponse.json({ error: "Company ID is required" }, { status: 400 });
  }

  const promotion = await prisma.promotion.findMany({
    where: {
      companyId: companyId,
    },
  });

  const isMember = await prisma.companyUser.findFirst({
    where: {
      userId: session.user.id,
      companyId: companyId,
    },
  });

  if (!isMember) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userPromotionsResult = await prisma.userPromotion.findMany({
    select: {
      id: true,
      promotionId: true,
      createdAt: true,
      isClaimed: true,
      isCompleted: true,
    },
    where: {
      promotionId: {
        in: promotion.map((p) => p.id),
      },
    },
  });

  const resultArray = promotion.map((promotion) => {
    const totalUserPromotions = userPromotionsResult.filter(
      (userPromotion) => userPromotion.promotionId === promotion.id
    ).length;

    const activeUserPromotions = userPromotionsResult.filter((userPromotion) => {
      if (!promotion?.cardDuration || !promotion?.endDate) {
        return !userPromotion.isClaimed && userPromotion.promotionId === promotion.id;
      }
      const startDate = new Date(Date.now() - promotion.cardDuration * 24 * 60 * 60 * 1000);
      const endDate = new Date(promotion.endDate);
      return (
        userPromotion.createdAt >= startDate &&
        userPromotion.createdAt <= endDate &&
        !userPromotion.isClaimed &&
        userPromotion.promotionId === promotion.id
      );
    }).length;

    const completedUserPromotions = userPromotionsResult.filter(
      (userPromotion) => userPromotion.isClaimed && userPromotion.promotionId === promotion.id
    ).length;

    return {
      promotionId: promotion.id,
      totalUserPromotions,
      activeUserPromotions,
      completedUserPromotions,
    };
  });

  return NextResponse.json(resultArray);
}
