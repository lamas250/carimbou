"use server";

import prisma from "@/lib/prisma";

type CreateCompanyType = {
  logoUrl: string | null;
  name: string;
  description: string | null;
};

export const createCompany = async (company: CreateCompanyType, userId: string) => {
  const result = await prisma.company.create({ data: company });

  await prisma.companyUser.create({
    data: {
      companyId: result.id,
      userId,
    },
  });

  return result;
};
