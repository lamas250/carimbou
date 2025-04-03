"use client";

import Container from "../container";
import { LoyaltyCardGrid } from "./loyalty-card-grid";
import { UserPromotion, Promotion, Company } from "@prisma/client";
import { UserPromotionWithStamps } from "@/features/user/actions/get-my-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { LoyaltyCompleted } from "./loyalty-completed";
export default function LoyaltyCardsTab({
  userPromotions,
  completedCards,
  expiredCards,
}: {
  userPromotions: UserPromotionWithStamps[];
  completedCards: UserPromotion & { promotion: Promotion & { company: Company } }[];
  expiredCards: UserPromotion & { promotion: Promotion & { company: Company } }[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Tabs defaultValue="cards" className="w-full">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <TabsList className="mb-6 text-primary-foreground">
            <TabsTrigger value="cards">Cartões Ativos</TabsTrigger>
            <TabsTrigger value="redemptions">Resgates</TabsTrigger>
            <TabsTrigger value="expired">Finalizados</TabsTrigger>
          </TabsList>
          <div className="flex flex-row flex-wrap justify-end items-center gap-4">
            <div className="mb-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Buscar cartão por nome"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="cards" className="mt-0">
          <LoyaltyCardGrid
            userPromotions={userPromotions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>

        <TabsContent value="redemptions" className="mt-0">
          <LoyaltyCompleted
            userPromotions={completedCards}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>

        <TabsContent value="expired" className="mt-0">
          <div className="rounded-lg border border-dashed border-gray-300 bg-white text-center p-8">
            <h3 className="text-lg font-medium text-gray-700">Nenhum cartão finalizado</h3>
            <p className="mt-2 text-gray-500">
              Complete seus cartões de fidelidade para resgatar recompensas
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
