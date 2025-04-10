"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Coffee,
  Pizza,
  ShoppingBag,
  Gift,
  Search,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  QrCode,
  Info,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPromotionWithStamps } from "@/features/user/actions/get-my-cards";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function LoyaltyCardGrid({
  userPromotions,
  searchQuery,
  setSearchQuery,
}: {
  userPromotions: UserPromotionWithStamps[];
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("todos");
  const [cards, setCards] = useState<UserPromotionWithStamps[]>(userPromotions);

  useEffect(() => {
    const newFilteredCards = userPromotions.filter((card) => {
      const matchesSearchQuery =
        searchQuery === "" || card.promotion.name.toLowerCase().includes(searchQuery.toLowerCase());
      // const matchesCategory =
      //   activeTab === "todos" || card.promotion.company.category.toLowerCase().includes(activeTab.toLowerCase());
      return matchesSearchQuery;
    });
    setCards(newFilteredCards);
  }, [searchQuery, activeTab, userPromotions]);

  return (
    <div className="space-y-6">
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <LoyaltyCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
          <RefreshCw className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-700">Nenhum cartão encontrado</h3>
          <p className="mt-2 text-gray-500">Tente uma busca diferente ou limpe o filtro</p>
          {searchQuery && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Limpar busca
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function LoyaltyCard({ card }: { card: UserPromotionWithStamps }) {
  const isComplete = card.stamps >= card.promotion.requiredStamps;
  const progressPercentage = (card.stamps / card.promotion.requiredStamps) * 100;
  const router = useRouter();

  // Limitar a exibição de carimbos para evitar cards muito grandes
  const maxVisibleStamps = 10;
  const shouldLimitStamps = card.stamps > maxVisibleStamps;
  const visibleStamps = shouldLimitStamps ? maxVisibleStamps : card.stamps;
  const cardDuration = card.promotion.cardDuration
    ? new Date(card.createdAt).getTime() + card.promotion.cardDuration
    : null;

  return (
    <Card className="relative flex h-full flex-col border shadow-sm transition-all hover:shadow-md">
      {isComplete && (
        <Badge className="overflow-hidden absolute right-8 top-0 translate-y-[-50%] bg-emerald-500 px-3 py-1 text-xs font-semibold hover:bg-emerald-600">
          Completo
        </Badge>
      )}

      <CardHeader className="bg-white pb-2 border-b">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 min-h-12 min-w-12">
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
          <div>
            <h3 className="font-semibold text-gray-800">{card.promotion.name}</h3>
            <p className="text-sm text-gray-500">{card.promotion.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Progresso: {card.stamps}/{card.promotion.requiredStamps}
            </span>
            {cardDuration && <span>Expira: {new Date(cardDuration).toLocaleDateString()}</span>}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {shouldLimitStamps ? (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: visibleStamps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    index < card.stamps
                      ? "bg-blue-100 border-blue-200 text-blue-600"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  {index < card.stamps ? <Check size={16} /> : index + 1}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">
              + {card.promotion.requiredStamps - maxVisibleStamps} carimbos adicionais
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: card.promotion.requiredStamps }).map((_, index) => (
              <div
                key={index}
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  index < card.stamps
                    ? "bg-red-100 border-red-300 text-red-600"
                    : "bg-gray-50 border-gray-200 text-gray-400"
                }`}
              >
                {index < card.stamps ? <Check size={16} /> : index + 1}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto border-t px-6 py-3 w-full">
        <div className=" gap-2 w-full">
          <Button
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={() => router.push(`/home/${card.id}`)}
          >
            <Info className="mr-2 h-4 w-4" />
            Ver detalhes
          </Button>
          {/* <Button variant="outline" className="w-full">
              <QrCode className="mr-2 h-4 w-4" />
              Escanear QR Code
            </Button> */}
          <div className="flex items-center gap-2 mt-2 justify-between px-1">
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
            {card.promotion.endDate && (
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
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
