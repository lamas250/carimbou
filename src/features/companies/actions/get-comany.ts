"use server";

import prisma from "@/lib/prisma";

export const getCompany = async (companyId: string) => {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      promotions: true,
    },
  });

  return company;
};
