import { z } from "zod";

export const createPromotionSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().optional(),
  image: z
    .union([
      z.string().transform((value) => (value === "" ? undefined : value)),
      z.instanceof(File),
    ])
    .optional(),
  requiredStamps: z.string().min(1, { message: "Carimbos necessários é obrigatório" }),
  reward: z.string().optional(),
  companyId: z.string().min(1, { message: "Empresa é obrigatório" }),
});

export type CreatePromotionType = z.infer<typeof createPromotionSchema>;
