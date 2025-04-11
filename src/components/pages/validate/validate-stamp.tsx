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
  Store,
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
import { Promotion, Stamp, StampStatus, Company, UserPromotion, User } from "@prisma/client";
import { claimStamp } from "@/features/stamp/actions/claim-stmap";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import SuccessRedeemModal from "@/components/success-redeem-modal";

interface ValidateStampProps {
  //   stampData: Stamp & {
  //     userPromotion: UserPromotion & {
  //       user: User;
  //       promotion: Promotion & {
  //         company: Company;
  //       };
  //     };
  //   };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stampData: any;
  progressCount: number;
}

export function ValidateStamp({ stampData, progressCount }: ValidateStampProps) {
  const { data: session } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [userProgress, setUserProgress] = useState(progressCount);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const { userPromotion } = stampData;
  const { promotion, user } = userPromotion;
  const { company } = promotion;

  const progress = (userProgress / promotion.requiredStamps) * 100;

  const handleClaim = async () => {
    setLoading(true);

    try {
      await claimStamp(stampData.id, session?.user.id ?? "");
      setUserProgress(userProgress + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Erro ao resgatar o selo", {
        description: error.message,
      });
      setLoading(false);
      return;
    }
    if (userProgress + 1 === promotion.requiredStamps) {
      setHasCompleted(true);
    }
    setLoading(false);
    setClaimed(true);
    return;
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
              {userPromotion.id && (
                <Button
                  className="w-full py-6 mt-4"
                  variant="default"
                  onClick={() => router.push(`/promocoes/${promotion.id}`)}
                >
                  Ir para página da promoção
                </Button>
              )}
              <Button
                className="w-full py-6 mt-4"
                variant="outline"
                onClick={() => router.push(`/empresas/${company.id}`)}
              >
                Minhas promoções
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
        userPromotionId={userPromotion.id}
      />
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex items-center justify-center gap-2">
              {company.logoUrl ? (
                <div className="flex justify-center mb-2">
                  <Image
                    src={company.logoUrl || ""}
                    alt={company.name}
                    className="rounded-sm shadow-md"
                    width={80}
                    height={80}
                  />
                </div>
              ) : (
                <div className="flex justify-center mb-2 min-w-16 min-h-16 bg-muted rounded-md flex items-center justify-center">
                  <Store className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">{company.name}</CardTitle>
            <CardDescription>{company.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="px-4 -mt-2 -mb-1">
              <Separator />
            </div>
            <div className="p-4">
              <span className="text-sm text-muted-foreground">Promoção:</span>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg">{promotion.name}</h3>
              </div>
              <p className="text-sm mb-2">{promotion.description}</p>

              {promotion.reward && (
                <div className="flex items-center gap-1 border-primary/50 bg-primary/5 border rounded-md p-2">
                  <span className="text-sm">Recompensa: {promotion.reward}</span>
                </div>
              )}
            </div>
            <div className="px-4 -mt-6">
              <Separator />
            </div>

            <div className="p-4 -mt-6">
              <span className="text-sm text-muted-foreground">Usuário:</span>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg">{user.name}</h3>
              </div>
              <p className="text-sm mb-2">{user.email}</p>
            </div>

            <div className="px-4 -mt-6">
              <Separator />
            </div>

            <div className="space-y-2 px-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Progresso</h4>
                <span className="text-sm font-medium">
                  {String(userProgress)} de {promotion.requiredStamps} carimbos
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
                    <p className="text-sm text-emerald-600">Esse usuário completou o cartão!</p>
                  </div>
                </motion.div>
              </AnimatePresence>
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

            {claimed && (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Carimbo adicionado com sucesso!
                  </span>
                </div>
                <Button
                  className="w-full py-6 text-lg"
                  variant="outline"
                  onClick={() => router.push(`/promocoes/${promotion.id}`)}
                >
                  Ir para página da promoção
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
