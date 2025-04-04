import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPlan = (id: string, billingCycle: string) => {
  if (id === "basic" && billingCycle === "monthly") {
    return process.env.STRIPE_PRICE_BASIC_MONTHLY;
  }
  if (id === "basic" && billingCycle === "annually") {
    return process.env.STRIPE_PRICE_BASIC_ANNUALLY;
  }
  if (id === "advanced" && billingCycle === "monthly") {
    return process.env.STRIPE_PRICE_ADVANCED_MONTHLY;
  }
  if (id === "advanced" && billingCycle === "annually") {
    return process.env.STRIPE_PRICE_ADVANCED_ANNUALLY;
  }
  return null;
};
