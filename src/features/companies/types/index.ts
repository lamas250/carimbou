import { Company, Promotion } from "@prisma/client";
import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().optional(),
  logoUrl: z
    .union([
      z.string().transform((value) => (value === "" ? undefined : value)),
      z.instanceof(File),
    ])
    .optional(),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

export type CreateCompanyType = z.infer<typeof createCompanySchema>;

export type CompanyType = Company & {
  promotions: Promotion[];
};
