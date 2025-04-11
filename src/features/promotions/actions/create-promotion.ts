"use server";

import prisma from "@/lib/prisma";
import { CreatePromotionType } from "../types";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const upsertPromotion = async (data: CreatePromotionType) => {
  if (data.id) {
    const promotion = await prisma.promotion.update({
      where: { id: data.id },
      data: {
        ...data,
        cardDuration: Number(data.cardDuration),
        requiredStamps: Number(data.requiredStamps),
        imageUrl: data.imageUrl ?? undefined,
      },
    });
    return promotion;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) throw new Error("Usuário não encontrado");
  const userDb = await prisma.user.findUnique({ where: { id: user.id } });

  if (!userDb?.isAdmin) {
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

    const companies = await prisma.companyUser.findMany({
      where: { userId: user.id },
      include: { company: { include: { promotions: true } } },
    });

    const totalPromotions = companies.reduce(
      (acc, company) => acc + company.company.promotions.length,
      0
    );

    if (totalPromotions >= plan.allowedPromotions)
      throw new Error("Você atingiu o limite de promoções");
  }

  const promotion = await prisma.promotion.create({
    data: {
      ...data,
      cardDuration: Number(data.cardDuration),
      requiredStamps: Number(data.requiredStamps),
      imageUrl: data.imageUrl ?? undefined,
    },
  });

  return promotion;
};
