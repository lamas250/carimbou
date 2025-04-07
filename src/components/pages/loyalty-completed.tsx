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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserPromotion, Promotion, Company } from "@prisma/client";
import { Badge } from "../ui/badge";

export function LoyaltyCompleted({
  userPromotions,
  searchQuery,
  setSearchQuery,
}: {
  userPromotions: UserPromotion & { promotion: Promotion & { company: Company } }[];
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("todos");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cards, setCards] = useState<any>(userPromotions);

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
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {cards.map((card: any) => (
            <LoyaltyCard key={card.promotion.id} card={card} />
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

function LoyaltyCard({
  card,
}: {
  card: UserPromotion & { promotion: Promotion & { company: Company } };
}) {
  const router = useRouter();

  return (
    <Card className="relative flex h-full flex-col border shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-white pb-2 border-b">
        {card.isClaimed && (
          <Badge className="overflow-hidden absolute right-8 top-0 translate-y-[-50%] bg-secondary px-3 py-1 text-xs font-semibold">
            Resgatado
          </Badge>
        )}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12">
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
                src={card.promotion.company.logoUrl || "/placeholder.svg"}
                alt={card.promotion.company.name}
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

      <CardContent className="mt-auto px-6 py-3 w-full">
        <div className=" gap-2 w-full">
          <Button
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={() => router.push(`/home/${card.id}`)}
          >
            <Info className="mr-2 h-4 w-4" />
            Ver detalhes
          </Button>
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
        </div>
      </CardContent>
    </Card>
  );
}
