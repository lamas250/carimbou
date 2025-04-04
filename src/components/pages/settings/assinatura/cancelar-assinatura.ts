"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function cancelarAssinatura(subscriptionId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await stripe.subscriptions.cancel(subscription.id);

  return { success: "Assinatura cancelada com sucesso" };
}
