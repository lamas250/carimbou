"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function gerenciarAssinatura(subscriptionId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const billingPortalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.customer as string,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura`,
  });

  return billingPortalSession.url;
}
