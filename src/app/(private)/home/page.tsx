import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "@/components/sign-out";
import LoyaltyCard from "@/components/pages/loyalty-card";
import { LoyaltyCardGrid } from "@/components/pages/loyalty-card-grid";
import Container from "@/components/container";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoyaltyCardsTab from "@/components/pages/loyalty-cards-tab";
import { getMyCards } from "@/features/user/actions/get-my-cards";

export default async function HomePage() {
  const userPromotions = await getMyCards();

  return (
    <Container
      title="Meus Cartões de Fidelidade"
      description="Acompanhe seus progressos e resgate suas recompensas"
    >
      <Tabs defaultValue="cards" className="w-full">
        <div className="flex justify-center">
          <TabsList className="mb-6 text-primary-foreground">
            <TabsTrigger value="cards">Meus Cartões</TabsTrigger>
            <TabsTrigger value="redemptions">Meus Resgates</TabsTrigger>
            <TabsTrigger value="rewards">Expirados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="cards" className="mt-0">
          <LoyaltyCardsTab userPromotions={userPromotions} />
        </TabsContent>

        <TabsContent value="redemptions" className="mt-0">
          <div className="rounded-lg border border-dashed border-gray-300 bg-white text-center">
            <h3 className="text-lg font-medium text-gray-700">Nenhum resgate disponível</h3>
            <p className="mt-2 text-gray-500">
              Complete seus cartões de fidelidade para resgatar recompensas
            </p>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="mt-0">
          <div className="rounded-lg border border-dashed border-gray-300 bg-white text-center">
            <h3 className="text-lg font-medium text-gray-700">Nenhum resgate disponível</h3>
            <p className="mt-2 text-gray-500">
              Complete seus cartões de fidelidade para resgatar recompensas
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
