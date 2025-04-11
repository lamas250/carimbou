"use server";

import prisma from "@/lib/prisma";
import { checkPlanType, stripe } from "@/lib/stripe";

type CreateCompanyType = {
  id?: string;
  logoUrl: string | null;
  name: string;
  description: string | null;
  phone: string | null;
  instagram: string | null;
  facebook: string | null;
};

export const upsertCompany = async (company: CreateCompanyType, userId: string) => {
  if (company.id) {
    const result = await prisma.company.update({
      where: { id: company.id },
      data: company,
    });
    return result;
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error("Usuário não encontrado");

  if (!user?.isAdmin) {
    const customer = await stripe.customers.list({ email: user?.email || "", limit: 1 });

    if (!customer.data.length) throw new Error("Nenhum cliente encontrado");

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0]?.id,
      expand: ["data.items.data.plan"],
    });

    if (!subscriptions.data.length) throw new Error("Nenhuma assinatura encontrada");

    const planId = subscriptions.data[0]?.items.data[0].plan.product;
    const plan = await prisma.carimbouPlan.findFirst({ where: { stripeId: planId as string } });

    if (!plan) throw new Error("Nenhum plano encontrado");

    const companies = await prisma.companyUser.findMany({ where: { userId } });

    if (companies.length >= plan.allowedCompanies)
      throw new Error("Você atingiu o limite de empresas");
  }

  const result = await prisma.company.create({ data: company });
  await prisma.companyUser.create({
    data: {
      companyId: result.id,
      userId,
    },
  });

  return result;
};
