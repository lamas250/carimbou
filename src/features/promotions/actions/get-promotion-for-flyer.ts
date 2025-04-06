import prisma from "@/lib/prisma";

export async function getPromotionForFlyer(promotionId: string) {
  const promotion = await prisma.promotion.findUnique({
    where: { id: promotionId },
    include: {
      company: true,
    },
  });

  return promotion;
}
