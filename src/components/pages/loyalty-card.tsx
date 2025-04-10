"use client";

import { useState, useEffect } from "react";
import {
  CalendarCheck,
  ChevronLeft,
  Fullscreen,
  History,
  Link,
  QrCode,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserPromotionWithStamps } from "@/features/user/actions/get-my-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoyaltyStamp from "../loyalty-stamp";
import { StampStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { QR_CODE_TYPES, QrCodeGenerator } from "./promotion/qrcode-generate";
import { motion } from "framer-motion";
import { participatePromotion } from "@/features/user/actions/participate-promotion";
type LoyaltyCardProps = {
  card: UserPromotionWithStamps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

const LoyaltyCard = ({ card, user }: LoyaltyCardProps) => {
  const [isCardCompleted, setIsCardCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsCardCompleted(card.isCompleted && card.history.length === card.promotion.requiredStamps);
  }, [card]);

  const createNewCard = async () => {
    const newCard = await participatePromotion(card.promotion.id, user.id);
    if (newCard) {
      router.push(`/home/${newCard.id}`);
    }
  };

  return (
    <div className="min-h-screen mt-4 md:mt-0 pb-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="py-8 sm:py-12">
          <div className="flex flex-col md:flex-row lg:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {!card.promotion.imageUrl && !card.company.logoUrl ? (
                <div className="h-14 w-14 bg-muted rounded-md flex items-center justify-center">
                  <Fullscreen className="h-10 w-10 text-muted-foreground/80" />
                </div>
              ) : (
                <div className="h-14 w-14 min-h-14 min-w-14">
                  {card.promotion.imageUrl ? (
                    <Image
                      src={card.promotion.imageUrl}
                      alt={card.promotion.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={card.company.logoUrl || "/placeholder.svg"}
                      alt={card.company.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  )}
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{card.promotion.name}</h1>
                <p className="text-muted-foreground">
                  {card.promotion.description
                    ? card.promotion.description
                    : `Colete {card.promotion.requiredStamps} carimbos para ganhar uma recompensa`}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 mb-4 w-full md:w-auto text-right">
              <Button variant="ghost" size="sm" onClick={() => router.push("/home")}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar para Meus Cartões
              </Button>
            </div>
          </div>

          <Card
            className={`loyalty-card mb-8 ${
              isCardCompleted && !card.isClaimed
                ? "border-emerald-500"
                : card.isClaimed
                  ? "border-secondary"
                  : ""
            } relative`}
          >
            {isCardCompleted && !card.isClaimed && (
              <Badge className="absolute right-8 top-0 translate-y-[-50%] bg-emerald-500 px-3 py-1 text-xs font-semibold">
                Completo
              </Badge>
            )}
            {isCardCompleted && card.isClaimed && (
              <Badge className="absolute right-8 top-0 translate-y-[-50%] bg-secondary px-3 py-1 text-xs font-semibold">
                Resgatado
              </Badge>
            )}
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <CardTitle>{card.company.name}</CardTitle>
                  <CardDescription>
                    {card.stamps}/{card.promotion.requiredStamps} carimbos coletados
                  </CardDescription>
                </div>
                <div className="text-right md:block hidden">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {card.history.map((isStamped, index) => (
                  <LoyaltyStamp
                    key={index}
                    isStamped={isStamped.status === StampStatus.CLAIMED}
                    index={index}
                    delay={index}
                    isCompleted={card.isCompleted}
                  />
                ))}
                {Array.from({ length: card.promotion.requiredStamps - card.history.length }).map(
                  (_, index) => (
                    <LoyaltyStamp
                      key={index}
                      isStamped={false}
                      index={index + card.history.length}
                      delay={index}
                    />
                  )
                )}
              </div>
            </CardContent>
            {/* <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <QRScanner onSuccess={handleAddStamp} />
                </CardFooter> */}
          </Card>
          <div className="flex items-center gap-2 justify-between -mt-7 mb-4 mr-4">
            <span className="text-xs text-muted-foreground">
              Iniciado: <br />
              {new Date(card.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {card.promotion.endDate && !card.isClaimed && (
              <span className="text-xs text-muted-foreground">
                Expira: <br />
                {new Date(card.promotion.endDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            {card.isClaimedAt && (
              <span className="text-xs text-muted-foreground">
                Resgatado: <br />
                {new Date(card.isClaimedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          {!card.isClaimed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center items-center mb-4"
            >
              <Card
                className={`${
                  !isCardCompleted
                    ? "bg-primary/10 border-primary/20"
                    : "bg-emerald-500/10 border-emerald-500/20"
                } w-full`}
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <QrCode className={"h-5 w-5"} />
                    Receba um carimbo
                  </CardTitle>
                  <CardDescription>
                    Gere um QR Code para que o comerciante possa te dar um carimbo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QrCodeGenerator
                    promotionId={card.promotion.id}
                    type={isCardCompleted ? QR_CODE_TYPES.REDEEM_REDIRECT : QR_CODE_TYPES.STAMP}
                    userPromotionId={card.id}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {card.isClaimed && (!card.promotion.endDate || card.promotion.endDate < new Date()) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center items-center mb-4"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Inicie um novo cartão da promoção</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="secondary" onClick={createNewCard}>
                    Iniciar novo cartão
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                <span>Histórico de carimbos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {card.history.length > 0 ? (
                <div className="space-y-4">
                  {card.history.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-3 border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                        <span>Carimbo {index + 1}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.createdAt.toLocaleDateString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                  {card.isClaimedAt && (
                    <div className="flex justify-between items-center border-b pb-3 border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                        <span>Resgatado</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {card.isClaimedAt.toLocaleDateString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">Nenhum carimbo ainda</p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end -mt-7 mb-4 mr-4">
          <span className="text-muted-foreground text-xs">Card ID: {card.id}</span>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
