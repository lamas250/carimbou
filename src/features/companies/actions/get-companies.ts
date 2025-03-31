import prisma from "@/lib/prisma";
import { CompanyType } from "@/features/companies/types";

export const getCompanies = async (userId: string): Promise<CompanyType[]> => {
  const companies = await prisma.company.findMany({
    where: {
      companyUsers: {
        some: {
          userId,
        },
      },
    },
    include: {
      promotions: true,
    },
  });
  return companies;
};
