import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowBigRightDash,
  Building,
  ChevronLeft,
  ExternalLink,
  Info,
  QrCode,
  Users,
} from "lucide-react";
import PromotionDetails from "@/components/pages/promotion/promotion-details";
import { getPromotion } from "@/features/promotions/actions/get-promotion";
import Container from "@/components/container";
import { QrCodeList } from "@/components/pages/promotion/qrcode-list";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PromotionLoyaltyCards } from "@/components/pages/promotion/promotion-loyalty-cards";
import { PromotionQrCodes } from "@/components/pages/promotion/promotion-qr-codes";
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
        <div className="lg:col-span-1 order-1 lg:order-1 space-y-2">
          <PromotionQrCodes promotionId={promotion.id} />
          <PromotionDetails promotion={promotion} userPromotions={userPromotions} />
        </div>

        <div className="lg:col-span-2 order-2 lg:order-2 space-y-2">
          <PromotionLoyaltyCards promotionId={promotion.id} />
          <QrCodeList promotionId={promotion.id} />
        </div>
      </div>
    </Container>
  );
}
