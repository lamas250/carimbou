"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  ArrowUpToLine,
  Award,
  CalendarDays,
  Check,
  Coffee,
  Gift,
  PartyPopper,
  Plus,
  Share2,
  Stamp as StampIcon,
  Star,
  Trophy,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import SuccessRedeemModal from "@/components/success-redeem-modal";
interface CalimStampProps {
  stampData: Stamp & {
    promotion: Promotion & { company: Company };
  };
  progressCount: number;
  userPromotionId: string;
}

export function CalimStamp({ stampData, progressCount, userPromotionId }: CalimStampProps) {
  const { data: session } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [userProgress, setUserProgress] = useState(progressCount);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const { promotion } = stampData;

  const progress = (userProgress / promotion.requiredStamps) * 100;

  const handleClaim = async () => {
    setLoading(true);

    try {
      await claimStamp(stampData.id, session?.user.id ?? "");
      setUserProgress(userProgress + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao resgatar o selo", {
        description: error.message,
      });
      setLoading(false);
      return;
    }
    if (userProgress + 1 === promotion.requiredStamps) {
      setHasCompleted(true);
      // triggerConfetti();
      setOpenSuccessModal(true);
    }
    setLoading(false);
    setClaimed(true);
    return;
  };

  const onShareCard = () => {
    console.log("share card");
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
              <CardTitle>Carimbo já resgatado!</CardTitle>
              <CardDescription>
                Esse carimbo já foi utilizado. Não é possível resgatar novamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userPromotionId && (
                <Button
                  className="w-full py-6 mt-4"
                  variant="default"
                  onClick={() => router.push(`/home/${userPromotionId}`)}
                >
                  Acesse o seu cartão
                </Button>
              )}
              <Button
                className="w-full py-6 mt-4"
                variant="outline"
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
    <div className="md:pt-6 pt-16 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <SuccessRedeemModal
        isOpen={openSuccessModal}
        onOpenChange={setOpenSuccessModal}
        onClaim={handleClaim}
        userPromotionId={userPromotionId}
      />
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-2 min-h-24 min-w-24">
              <Image
                src={stampData.promotion.imageUrl || stampData.promotion.company.logoUrl || ""}
                alt={stampData.promotion.name}
                className="rounded-sm shadow-md"
                width={80}
                height={80}
              />
            </div>
            {/* <CardTitle className="text-2xl">{promotionData.company.name}</CardTitle> */}
            <CardTitle className="text-2xl">{stampData.promotion.company.name}</CardTitle>
            <CardDescription>Programa de Fidelidade</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="px-4 -mt-2 -mb-1">
              <Separator />
            </div>
            <div className=" p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg">{stampData.promotion.name}</h3>
              </div>
              <p className="text-sm mb-2">{stampData.promotion.description}</p>

              {stampData.promotion.reward && (
                <div className="flex items-center gap-1 border-primary border rounded-md p-2">
                  <span className="text-sm">Recompensa: {stampData.promotion.reward}</span>
                </div>
              )}
            </div>
            <div className="px-4 -mt-6">
              <Separator />
            </div>

            <div className="space-y-2 px-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Progresso</h4>
                <span className="text-sm font-medium">
                  {String(userProgress)} de {stampData.promotion.requiredStamps} carimbos
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            {hasCompleted && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
                      <PartyPopper className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-emerald-700">Parabéns!</h4>
                    <p className="text-sm text-emerald-600">Você completou o seu cartão!</p>
                    <p className="text-xs text-emerald-600">
                      Clique no botão abaixo para ver seu cartão.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              // <div className="flex flex-col gap-2 justify-between items-center bg-green-100 rounded-lg p-4 border border-green-400">
              //   <h4 className="font-medium">Parabéns!</h4>
              //   <span className="text-sm font-medium">Você completou o seu cartão!</span>
              //   <span className="text-sm font-medium">
              //     Clique no botão abaixo para ver seu cartão.
              //   </span>
              // </div>
            )}
          </CardContent>

          <CardFooter className="px-8">
            {!hasCompleted && !claimed && (
              <>
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
                    "Adicionar Carimbo"
                  )}
                </Button>
              </>
            )}

            {hasCompleted && (
              <div className="flex flex-col gap-2 w-full">
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
                  size="lg"
                  onClick={() => router.push(`/home/${userPromotionId}`)}
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  Acesse o seu cartão
                </Button>
              </div>
            )}

            {claimed && !hasCompleted && (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Carimbo adicionado com sucesso!
                  </span>
                </div>
                <Button
                  className="w-full py-6 text-lg"
                  variant="outline"
                  onClick={() => router.push(`/home/${userPromotionId}`)}
                >
                  Acesse o seu cartão
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">ID: {stampData.id}</p>
      </div>
    </div>
  );
}
