import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getPlan } from "@/lib/utils";

export async function POST(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const plan = searchParams.get("plan");
  const billingCycle = searchParams.get("billingCycle");
  const price = getPlan(plan as string, billingCycle as string);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price: price as string,
        },
      ],
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento-efetuado?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: session.user.email,
    });

    return NextResponse.json({
      id: checkoutSession.id,
      clientSecret: checkoutSession.client_secret,
    });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return new Response("Erro ao criar sessão de checkout", { status: 500 });
  }
}
