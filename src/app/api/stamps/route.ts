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
  const promotionId = searchParams.get("promotionId");

  if (!promotionId) {
    return NextResponse.json({ error: "Promotion ID is required" }, { status: 400 });
  }

  const promotion = await prisma.promotion.findUnique({
    where: {
      id: promotionId,
    },
  });

  const isMember = await prisma.companyUser.findFirst({
    where: {
      userId: session.user.id,
      companyId: promotion?.companyId,
    },
  });

  if (!isMember) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stamps = await prisma.stamp.findMany({
    where: {
      promotionId: promotionId,
    },
    include: {
      userPromotion: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return NextResponse.json(stamps);
}
