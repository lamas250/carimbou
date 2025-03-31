"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowUpToLine, Award, Check, Coffee, Gift, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Promotion, Stamp, StampStatus, Company } from "@prisma/client";
import { claimStamp } from "@/features/stamp/actions/claim-stmap";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface CalimStampProps {
  stampData: Stamp & { promotion: Promotion & { company: Company } };
}

export function CalimStamp({ stampData }: CalimStampProps) {
  const { data: session } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const pointsToAdd = 1;

  const handleClaim = async () => {
    setLoading(true);

    try {
      await claimStamp(stampData.id, session?.user.id ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao reivindicar o selo");
      setLoading(false);
      return;
    }

    setClaimed(true);
    setLoading(false);
    triggerConfetti();
    return;
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti em posições aleatórias
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  if (stampData.status === StampStatus.CLAIMED) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Carimbo já reivindicado!</CardTitle>
              <CardDescription>
                Esse carimbo já foi utilizado. Não é possível reivindicar novamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full py-6 mt-4"
                variant="default"
                onClick={() => router.push("/home")}
              >
                Voltar para a Página Inicial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-2">
              <Image
                src={stampData.promotion.imageUrl || stampData.promotion.company.logoUrl || ""}
                alt={stampData.promotion.name}
                className="rounded-sm border-4 border-background shadow-md"
                width={80}
                height={80}
              />
            </div>
            {/* <CardTitle className="text-2xl">{promotionData.company.name}</CardTitle> */}
            <CardTitle className="text-2xl">{stampData.promotion.company.name}</CardTitle>
            <CardDescription>Programa de Fidelidade</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-sm border border-primary/20">
              <div>
                <h3 className="font-semibold text-lg">{stampData.promotion.name}</h3>
                <p className="text-sm text-muted-foreground">{stampData.promotion.description}</p>
              </div>
            </div>

            {claimed ? (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-green-700">Pontos Adicionados!</h3>
                <p className="text-sm text-green-600">
                  Você acumulou {pointsToAdd} {pointsToAdd > 1 ? "carimbos" : "carimbo"}
                </p>
              </div>
            ) : (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-primary">Você acumulou</h3>
                <div className="flex items-center justify-center gap-1 my-2">
                  <Plus className="h-5 w-5 text-primary fill-primary" />
                  <span className="text-2xl font-bold text-primary">{pointsToAdd}</span>
                  <span className="text-primary">{pointsToAdd > 1 ? "carimbos" : "carimbo"}</span>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            {claimed ? (
              <Button
                className="w-full py-6 text-lg"
                variant="outline"
                onClick={() => router.push("/home")}
              >
                Voltar para a Página Inicial
              </Button>
            ) : (
              <Button
                className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
                onClick={handleClaim}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  "Adicionar Pontos"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">QR Code ID: {stampData.id}</p>
      </div>
    </div>
  );
}
