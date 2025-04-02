import { getStampOnClaim } from "@/features/stamp/actions/get-stamp-on-claim";
import { CalimStamp } from "@/components/pages/calim/calim-stamp";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserProgress } from "@/features/stamp/actions/get-user-progress";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPromotionOnParticipate } from "@/features/user/actions/get-promotion-on-participate";
import { ParticipatePromotion } from "@/components/pages/participate/participate-promotion";

interface ParticipatePageProps {
  params: Promise<{ promotionId: string }>;
}

export default async function ParticipatePage({ params }: ParticipatePageProps) {
  const { promotionId } = await params;
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Error getting session", error);
      throw redirect("/sign-in");
    });

  const { promotion, userPromotion } = await getPromotionOnParticipate(
    promotionId,
    session?.user.id ?? ""
  );
  const progressCount = await getUserProgress(session?.user.id ?? "", promotionId);

  if (!promotion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Promoção não encontrada!</h1>
          <p className="text-sm text-muted-foreground">
            Essa promoção não existe. Por favor, verifique o código da promoção.
          </p>
        </div>
        <Link href="/home">
          <Button className="w-full py-6 mt-4 text-lg" variant="default">
            Voltar para a Página Inicial
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Container>
      <ParticipatePromotion
        promotion={promotion}
        userPromotion={userPromotion || null}
        userId={session?.user.id ?? ""}
      />
    </Container>
  );
}
