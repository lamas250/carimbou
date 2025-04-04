"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

import { redeemCard } from "@/features/companies/actions/redeem-card-action";
interface RedeemCardProps {
  userId: string;
  userPromotion: UserPromotion & {
    promotion: Promotion & {
      company: Company;
    };
    user: User;
  };
}

export function RedeemCard({ userId, userPromotion }: RedeemCardProps) {
  const { data: session } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const { promotion, user } = userPromotion;

  const handleRedeem = async () => {
    setLoading(true);

    try {
      await redeemCard(userPromotion.id, session?.user.id ?? "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao resgatar o cartão", {
        description: error.message,
      });
      setLoading(false);
      return;
    }

    setOpenSuccessModal(true);
    setLoading(false);
    setClaimed(true);
    tiggerConfetti();
    return;
  };

  const tiggerConfetti = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "999999";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 4000);
  };

  if (userPromotion.isClaimed) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Cartão já resgatado!</CardTitle>
              <CardDescription>
                Esse cartão já foi utilizado. Não é possível resgatar novamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full py-6 mt-4"
                variant="default"
                onClick={() => router.push(`/empresas/${promotion.id}`)}
              >
                Acesse a página da promoção
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="md:pt-6 pt-16 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg border border-emerald-500">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-2">
              <Image
                src={promotion.imageUrl || promotion.company.logoUrl || ""}
                alt={promotion.name}
                className="rounded-sm shadow-md"
                width={80}
                height={80}
              />
            </div>
            {/* <CardTitle className="text-2xl">{promotionData.company.name}</CardTitle> */}
            <CardTitle className="text-2xl">{promotion.company.name}</CardTitle>
            <CardDescription>{promotion.company.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="px-4 -mt-2 -mb-1">
              <Separator />
            </div>
            <div className=" p-4">
              <span className="text-sm text-muted-foreground">Resgate da Promoção:</span>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg">{promotion.name}</h3>
              </div>
              <p className="text-sm mb-2">{promotion.description}</p>

              {promotion.reward && (
                <div className="flex items-center gap-1 border-emerald-500 border rounded-md p-2">
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
          </CardContent>

          <CardFooter className="px-8">
            {!claimed && (
              <>
                <Button
                  className="w-full py-6 bg-emerald-500 hover:bg-emerald-600"
                  onClick={handleRedeem}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    "Resgatar Recompensa"
                  )}
                </Button>
              </>
            )}

            {claimed && (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Recompensa resgatada com sucesso!
                  </span>
                </div>
                <Button
                  className="w-full py-6"
                  variant="default"
                  onClick={() => router.push(`/promocoes/${promotion.id}`)}
                >
                  Acesse a página da promoção
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          ID do Cartão: {userPromotion.id}
        </p>
      </div>
    </div>
  );
}
