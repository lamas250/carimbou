"use client";

import { useState } from "react";
import { CreditCard, Settings, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelarAssinatura } from "./cancelar-assinatura";
import { toast } from "sonner";
import { gerenciarAssinatura } from "./gerenciar-assinatura";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
export interface AssinaturaProps {
  plano: {
    id: string;
    nome: string;
    preco: number;
    ciclo: string;
    dataRenovacao: string;
    status: string;
  };
}

export function AssinaturaStripe({ plano }: AssinaturaProps) {
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const router = useRouter();

  const formatarPreco = (valor: number) => {
    const realValue = valor / 100;
    return realValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleCancelarAssinatura = async () => {
    const response = await cancelarAssinatura(plano.id);
    if (response.success) {
      toast.success(response.success);
    }
    router.push("/");
  };

  const handleGerenciarAssinatura = async () => {
    return redirect(
      `https://billing.stripe.com/p/login/${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_KEY}`
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sua Assinatura</CardTitle>
          <Badge variant={plano.status === "active" ? "default" : "destructive"}>
            {plano.status === "active"
              ? "Ativa"
              : plano.status === "canceled"
              ? "Cancelada"
              : "Pendente"}
          </Badge>
        </div>
        <CardDescription>Detalhes do seu plano atual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <CreditCard className="h-10 w-10 text-muted-foreground" />
          <div>
            <h3 className="font-medium text-lg">{plano.nome}</h3>
            <p className="text-muted-foreground">
              {formatarPreco(plano.preco)}/{plano.ciclo === "month" ? "mês" : "ano"}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            Próxima renovação em:{" "}
            <span className="font-medium text-foreground">{plano.dataRenovacao}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-y-2 w-full">
          <Button className="w-full" variant="outline" onClick={handleGerenciarAssinatura}>
            <Settings className="mr-2 h-4 w-4" />
            Gerenciar Assinatura
          </Button>

          <Dialog open={confirmacaoAberta} onOpenChange={setConfirmacaoAberta}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Cancelar Assinatura
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancelar assinatura</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos recursos
                  premium após o término do período atual.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button variant="outline" onClick={() => setConfirmacaoAberta(false)}>
                  Voltar
                </Button>
                <Button variant="destructive" onClick={handleCancelarAssinatura}>
                  Confirmar Cancelamento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
