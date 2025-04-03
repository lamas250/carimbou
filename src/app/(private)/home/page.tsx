import Container from "@/components/container";
import LoyaltyCardsTab from "@/components/pages/loyalty-cards-tab";
import { getCompletedAndExpiredPromotions } from "@/features/user/actions/get-completed-and expired";
import { getMyCards } from "@/features/user/actions/get-my-cards";

export default async function HomePage() {
  const userPromotions = await getMyCards();
  const { completedCards, expiredCards } = await getCompletedAndExpiredPromotions();

  return (
    <Container
      title="Meus Cartões de Fidelidade"
      description="Acompanhe seus progressos e resgate suas recompensas"
    >
      <LoyaltyCardsTab
        userPromotions={userPromotions}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        completedCards={completedCards as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expiredCards={expiredCards as any}
      />
    </Container>
  );
}
