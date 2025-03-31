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
      <LoyaltyCardsTab userPromotions={userPromotions} />
    </Container>
  );
}
