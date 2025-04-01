import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building, ChevronLeft, Info } from "lucide-react";
import PromotionDetails from "@/components/pages/promotion/promotion-details";
import { getPromotion } from "@/features/promotions/actions/get-promotion";
import Container from "@/components/container";
import { QrCodeGenerator } from "@/components/pages/promotion/qrcode-generate";
import { QrCodeList } from "@/components/pages/promotion/qrcode-list";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Params = Promise<{ promotionId: string }>;

export default async function PromotionPage({ params }: { params: Params }) {
  const { promotionId } = await params;
  const promotion = await getPromotion(promotionId);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (!promotion) {
    return null;
  }

  // const getInitials = (name: string) => {
  //   const names = name.split(" ");
  //   if (names.length === 1) {
  //     return names[0].slice(0, 2).toUpperCase();
  //   }
  // };

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
        <div className="lg:col-span-1 order-2 lg:order-1">
          <PromotionDetails promotion={promotion} />
        </div>

        <div className="lg:col-span-2 space-y-2 order-1 lg:order-2">
          <QrCodeGenerator promotionId={promotion.id} />
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
