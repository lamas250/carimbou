"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, Meh, Sparkles } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface PaymentButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tier: any;
  billingCycle: string;
}

export function PaymentButton({ tier, billingCycle }: PaymentButtonProps) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/checkout?plan=" + tier.id + "&billingCycle=" + billingCycle, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [tier, billingCycle]);

  const options = { fetchClientSecret };

  const handlePayment = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handlePayment}
          variant={tier.buttonVariant}
          className={`w-full ${
            tier.highlighted
              ? "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-md"
              : ""
          }`}
          size="lg"
        >
          {tier.highlighted && <Sparkles className="mr-2 h-4 w-4" />}
          {tier.buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className={`overflow-y-auto ${session.data?.user ? "h-full" : ""}`}>
        <DialogTitle>{""}</DialogTitle>
        {session.data?.user ? (
          <div id="checkout">
            <EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <div className="w-full">
            <Card className="max-w-lg text-center justify-center items-center border-none shadow-none">
              <CardHeader className="w-full">
                <Meh className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Opsss!</CardTitle>
                <CardDescription>Para continuar, entre na sua conta.</CardDescription>
              </CardHeader>

              <CardContent className="w-full">
                <Link
                  href="/sign-in"
                  className={cn(buttonVariants({ variant: "default" }), "w-full")}
                >
                  Entrar
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
