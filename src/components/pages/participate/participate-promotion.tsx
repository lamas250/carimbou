"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
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
import Image from "next/image";
import { Promotion, Stamp, StampStatus, Company, UserPromotion } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import SuccessRedeemModal from "@/components/success-redeem-modal";
import { participatePromotion } from "@/features/user/actions/participate-promotion";
import { toast } from "sonner";

interface ParticipatePromotionProps {
  promotion: Promotion & { company: Company };
  userPromotion: UserPromotion | null;
  userId: string;
}

export function ParticipatePromotion({
  promotion,
  userPromotion,
  userId,
}: ParticipatePromotionProps) {
  const router = useRouter();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [userPromotionId, setUserPromotionId] = useState("");

  const handleParticipate = async () => {
    try {
      const userPromotion = await participatePromotion(promotion.id, userId);

      if (userPromotion) {
        setUserPromotionId(userPromotion.id);
      }
    } catch (error) {
      toast.error("Erro ao participar da promoção");
    }
  };

  return (
    <div className="md:pt-6 pt-16 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <SuccessRedeemModal
        isOpen={openSuccessModal}
        onOpenChange={setOpenSuccessModal}
        userPromotionId={userPromotionId}
      />
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex items-center justify-center gap-2">
              {promotion.company.logoUrl ? (
                <div className="flex justify-center mb-2 min-w-18 min-h-18">
                  <Image
                    src={promotion.company.logoUrl || ""}
                    alt={promotion.name}
                    className="rounded-sm shadow-md"
                    width={80}
                    height={80}
                  />
                </div>
              ) : (
                <div className="rounded-md shadow-md min-w-18 min-h-18 flex items-center justify-center bg-muted">
                  <Store className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">{promotion.company.name}</CardTitle>
            <CardDescription>{promotion.company.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="px-4 -mt-2 -mb-1">
              <Separator />
            </div>
            <div className="flex flex-row items-center justify-start gap-2 px-4 mt-8">
              {promotion.imageUrl && (
                <div className="flex justify-center mb-2 min-w-18 min-h-18">
                  <Image
                    src={promotion.imageUrl}
                    alt={promotion.name}
                    className="rounded-sm shadow-md"
                    width={60}
                    height={60}
                  />
                </div>
              )}
              <div className="flex items-center justify-center">
                <h3 className="font-semibold text-lg">{promotion.name}</h3>
              </div>
            </div>

            <div className="px-4">
              <p className="text-sm mb-2">{promotion.description}</p>
              {promotion.reward && (
                <div className="flex items-center gap-1 border-primary/60 border rounded-md p-2">
                  <span className="text-sm">
                    Recompensa:{" "}
                    <span className="font-bold text-primary capitalize">{promotion.reward}</span>
                  </span>
                </div>
              )}
            </div>
            <div className="px-4 ">
              <span className="text-sm text-muted-foreground">{promotion.rule}</span>
            </div>
            <div className="px-4">
              <Separator />
            </div>

            {userPromotionId && (
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
                    <p className="text-sm text-emerald-600">Você está participando da promoção!</p>
                    <p className="text-xs text-emerald-600">
                      Clique no botão abaixo para ver seu cartão.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {userPromotion && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gradient-to-r from-red-50 to-red-50 rounded-xl p-4 border border-red-100"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                      <ArrowDown className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="font-bold text-red-700">
                      Você já tem um cartão dessa promoção!
                    </h4>
                    <p className="text-sm text-red-600">
                      Clique no botão abaixo para ver seu cartão.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>

          <CardFooter className="px-8">
            {userPromotionId && (
              <Button
                className="w-full py-6 bg-primary hover:bg-primary/90"
                onClick={() => router.push(`/home/${userPromotionId}`)}
              >
                Ver cartão
              </Button>
            )}
            {!userPromotionId && !userPromotion && (
              <>
                <Button
                  className="w-full py-6 bg-primary hover:bg-primary/90"
                  onClick={handleParticipate}
                >
                  Participar da promoção
                </Button>
              </>
            )}
            {userPromotion && (
              <Button
                className="w-full py-6 bg-primary hover:bg-primary/90"
                onClick={() => router.push(`/home/${userPromotion.id}`)}
              >
                Ver cartão
              </Button>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          ID promoção: {promotion.id}
        </p>
      </div>
    </div>
  );
}
