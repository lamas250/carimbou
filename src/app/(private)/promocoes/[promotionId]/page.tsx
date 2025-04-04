import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building, ChevronLeft, Info, QrCode, Users } from "lucide-react";
import PromotionDetails from "@/components/pages/promotion/promotion-details";
import { getPromotion } from "@/features/promotions/actions/get-promotion";
import Container from "@/components/container";
import { QR_CODE_TYPES, QrCodeGenerator } from "@/components/pages/promotion/qrcode-generate";
import { QrCodeList } from "@/components/pages/promotion/qrcode-list";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Params = Promise<{ promotionId: string }>;

export default async function PromotionPage({ params }: { params: Params }) {
  const { promotionId } = await params;
  const { promotion, userPromotions } = await getPromotion(promotionId);

  if (!promotion) {
    return null;
  }

  return (
    <Container
      title={promotion.name}
      description={promotion.description ?? undefined}
      image={promotion.imageUrl ? promotion.imageUrl : promotion.company.logoUrl}
      button={
        <Link href={`/empresas/${promotion.companyId}`}>
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para Promoções
          </Button>
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 order-2 lg:order-1 space-y-2">
          <PromotionDetails promotion={promotion} userPromotions={userPromotions} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cartões Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground text-sm">
                  Está funcionalidade ainda está em desenvolvimento.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-2 order-1 lg:order-2">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Convide clientes para esta promoção
              </CardTitle>
              <CardDescription>
                Gere um QR Code para que os clientes possam ingressar nesta promoção.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QrCodeGenerator promotionId={promotion.id} type={"promotion-redirect"} />
            </CardContent>
          </Card>

          <div className="lg:col-span-3 hidden lg:block">
            <QrCodeList promotionId={promotion.id} />
          </div>
        </div>
        <div className="lg:hidden order-3 lg:order-3">
          <QrCodeList promotionId={promotion.id} />
        </div>
      </div>
    </Container>
  );
}
