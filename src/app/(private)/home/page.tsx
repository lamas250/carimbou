import Container from "@/components/container";
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
