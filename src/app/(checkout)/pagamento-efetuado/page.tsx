import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function PagamentoEfetuado() {
  return (
    <Card className="max-w-lg mt-10 text-center justify-center items-center">
      <CardContent>
        <CardHeader>
          <ShoppingBag className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <CardTitle>Assinatura Confirmada</CardTitle>
          <CardDescription>Obrigado por contratar o nosso serviço.</CardDescription>
        </CardHeader>
        <div className="text-sm text-muted-foreground mb-4 px-4 mt-4">
          Sua assinatura foi efetuada com sucesso e sua conta está ativa para criar seu primeiro
          programa de fidelidade.
        </div>

        <Link href="/empresas" className={cn(buttonVariants({ variant: "default" }), "mt-4")}>
          Ir para o painel de empresas
        </Link>
      </CardContent>
    </Card>
  );
}
