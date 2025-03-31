import prisma from "@/lib/prisma";

export const getStampOnClaim = async (stampId: string) => {
  const stamp = await prisma.stamp.findFirst({
    where: { id: stampId },
    include: { promotion: { include: { company: true } } },
  });

  return stamp;
};
