import { getStampOnClaim } from "@/features/stamp/actions/get-stamp-on-claim";
import { CalimStamp } from "@/components/pages/calim/calim-stamp";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserProgress } from "@/features/stamp/actions/get-user-progress";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
interface ClaimPageProps {
  params: Promise<{ stampId: string }>;
}

export default async function ClaimPage({ params }: ClaimPageProps) {
  const { stampId } = await params;
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Error getting session", error);
      throw redirect("/sign-in");
    });
  const stamp = await getStampOnClaim(stampId);
  const progressCount = await getUserProgress(session?.user.id ?? "", stamp?.promotionId ?? "");

  if (!stamp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Carimbo não encontrado!</h1>
          <p className="text-sm text-muted-foreground">
            Esse carimbo não existe. Por favor, verifique o código do carimbo.
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
      <CalimStamp
        stampData={stamp}
        progressCount={progressCount.progressCount ?? 0}
        userPromotionId={progressCount.userPromotionId ?? ""}
      />
    </Container>
  );
}
