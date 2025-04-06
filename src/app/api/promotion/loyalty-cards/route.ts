import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserPromotion } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const promotionId = searchParams.get("promotionId");

  if (!promotionId) {
    return NextResponse.json({ error: "Promotion ID is required" }, { status: 400 });
  }

  const promotion = await prisma.promotion.findUnique({
    where: { id: promotionId },
    include: { company: true },
  });

  if (!promotion) {
    return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
  }

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isMember = await prisma.companyUser.findFirst({
    where: {
      userId: session.user.id,
      companyId: promotion.companyId,
    },
  });

  if (!isMember) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userPromotions = await prisma.userPromotion.findMany({
    where: {
      promotionId: promotionId,
    },
    include: {
      user: true,
      stamps: true,
      promotion: true,
    },
  });

  // TODO: rever endDate
  const [activeUserPromotions, claimedUserPromotions, expiredUserPromotions] =
    userPromotions.reduce(
      (acc: UserPromotion[][], userPromotion: UserPromotion) => {
        if (userPromotion.isClaimed) {
          acc[1].push(userPromotion);
        } else if (promotion.endDate && userPromotion.createdAt < new Date(promotion.endDate)) {
          acc[2].push(userPromotion);
        } else {
          acc[0].push(userPromotion);
        }
        return acc;
      },
      [[], [], []]
    );

  return NextResponse.json({
    activeUserPromotions,
    claimedUserPromotions,
    expiredUserPromotions,
  });
}
