import prisma from "@/lib/prisma";

export const getUserProgress = async (userId: string, promotionId: string) => {
  const progress = await prisma.userPromotion.findFirst({
    where: {
      promotionId,
      userId,
      isCompleted: false,
    },
    include: {
      stamps: true,
    },
  });

  const progressCount = progress?.stamps.length;

  return {
    progressCount,
    userPromotionId: progress?.id,
  };
};
