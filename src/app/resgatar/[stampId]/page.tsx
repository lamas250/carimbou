import { getStampOnClaim } from "@/features/stamp/actions/get-stamp-on-claim";
import { CalimStamp } from "@/components/pages/calim/calim-stamp";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClaimPageProps {
  params: Promise<{ stampId: string }>;
}

export default async function ClaimPage({ params }: ClaimPageProps) {
  const { stampId } = await params;
  const stamp = await getStampOnClaim(stampId);

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
      <CalimStamp stampData={stamp} />
    </Container>
  );
}
