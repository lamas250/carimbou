import Container from "@/components/container";
import { ValidateStamp } from "@/components/pages/validate/validate-stamp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { StampStatus } from "@prisma/client";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ValidateStampPageProps {
  params: Promise<{ stampId: string }>;
}

export default async function ValidateStampPage({ params }: ValidateStampPageProps) {
  const { stampId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const stamp = await prisma.stamp.findUnique({
    where: {
      id: stampId,
    },
    include: {
      userPromotion: {
        include: {
          user: true,
          promotion: {
            include: {
              company: true,
            },
          },
        },
      },
    },
  });

  const userProgress = await prisma.stamp.count({
    where: {
      userPromotionId: stamp?.userPromotionId,
      status: StampStatus.CLAIMED,
    },
  });

  if (!stamp) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Carimbo não encontrado!</CardTitle>
              <CardDescription>
                Esse carimbo não foi encontrado. Por favor, tente novamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/empresas">
                <Button className="w-full py-6 mt-4" variant="outline">
                  Minhas empresas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <ValidateStamp stampData={stamp} progressCount={userProgress} />
    </Container>
  );
}
