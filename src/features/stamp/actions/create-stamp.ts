"use server";

import prisma from "@/lib/prisma";
import { StampStatus } from "@prisma/client";
export const createStamp = async (promotionId: string) => {
  const stamp = await prisma.stamp.create({
    data: {
      promotionId,
      status: StampStatus.PENDING,
    },
  });
  return {
    stamp: {
      id: stamp.id,
      status: stamp.status,
      promotionId: stamp.promotionId,
    },
    url: `${process.env.NEXT_PUBLIC_APP_URL}/claim/${stamp.id}`,
  };
};
