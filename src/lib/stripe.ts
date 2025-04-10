import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function fetchSubscriptionByEmail(email: string) {
  const customer = await stripe.customers.list({
    email,
    limit: 1,
    expand: ["data.subscriptions"],
  });

  if (customer.data.length === 0) {
    return null;
  }

  const customerData = customer.data[0];

  if (!customerData.subscriptions?.data[0]) {
    return null;
  }

  const subscription = customerData.subscriptions.data[0];

  return subscription;
}

export async function checkPlanType(email: string) {
  const subscription = await fetchSubscriptionByEmail(email);
  console.log("subscription", subscription);
  return subscription?.items.data[0].plan.nickname;
}
