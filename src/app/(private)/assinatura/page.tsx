import Container from "@/components/container";
import {
  AssinaturaProps,
  AssinaturaStripe,
} from "@/components/pages/settings/assinatura/assinatura-stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Assinatura() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const subscription = await fetchSubscriptionByEmail(session?.user?.email || "");

  const plano: AssinaturaProps = {
    plano: {
      id: subscription?.id || "",
      nome: subscription?.items.data[0].plan.nickname || "",
      preco: subscription?.items.data[0].plan.amount || 0,
      ciclo: subscription?.items.data[0].plan.interval || "",
      dataRenovacao: "15/05/2025",
      status: subscription?.status || "",
    },
  };
  return (
    <Container>
      {subscription && <AssinaturaStripe {...plano} />}

      {!subscription && (
        <Card className="max-w-lg mt-10 text-center justify-center items-center mx-auto">
          <CardContent>
            <CardHeader>
              <CardTitle>Nenhuma assinatura encontrada</CardTitle>
              <CardDescription>Você não possui nenhuma assinatura ativa.</CardDescription>
            </CardHeader>
            <div className="text-sm text-muted-foreground mb-4 px-4 mt-4">
              Veja nossos planos e assine um plano e comece a criar seu programa de fidelidade.
            </div>

            <Link href="/#pricing" className={cn(buttonVariants({ variant: "default" }), "mt-4")}>
              Ver planos
            </Link>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
