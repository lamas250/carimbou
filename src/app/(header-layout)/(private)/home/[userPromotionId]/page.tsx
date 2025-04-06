import { getUserPromotion } from "@/features/user/actions/get-user-promotion";
import Container from "@/components/container";
import LoyaltyCard from "@/components/pages/loyalty-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Params = Promise<{ userPromotionId: string }>;

export default async function UserPromotionPage({ params }: { params: Params }) {
  const { userPromotionId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userPromotion = await getUserPromotion(userPromotionId);

  if (!userPromotion) {
    return (
      <Container title="Promoção não encontrada">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Promoção não encontrada</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <LoyaltyCard card={userPromotion} user={session?.user} />
    </Container>
  );
}
