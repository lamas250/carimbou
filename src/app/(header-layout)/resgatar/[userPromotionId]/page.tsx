import { getStampOnClaim } from "@/features/stamp/actions/get-stamp-on-claim";
import { CalimStamp } from "@/components/pages/calim/calim-stamp";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserProgress } from "@/features/stamp/actions/get-user-progress";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { redeemCard } from "@/features/companies/actions/redeem-card";
import { RedeemCard } from "@/components/pages/redeem-card";

interface RedeemPageProps {
  params: Promise<{ userPromotionId: string }>;
}

export default async function RedeemPage({ params }: RedeemPageProps) {
  const { userPromotionId } = await params;
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Error getting session", error);
      throw redirect("/sign-in");
    });

  const userPromotion = await redeemCard(userPromotionId, session?.user.id ?? "");

  if (!userPromotion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Cartão não encontrado!</h1>
          <p className="text-sm text-muted-foreground">
            Esse cartão não existe. Por favor, verifique o código do cartão.
          </p>
        </div>
        <Link href="/empresas">
          <Button className="w-full py-6 mt-4" variant="default">
            Voltar para a Página de Empresas
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Container>
      <RedeemCard userId={session?.user.id ?? ""} userPromotion={userPromotion} />
    </Container>
  );
}
