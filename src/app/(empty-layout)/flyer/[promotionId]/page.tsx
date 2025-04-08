import FlyerPrinterWrapper from "@/components/pages/flyer/flyer-printer-wrapper";
import { getPromotionForFlyer } from "@/features/promotions/actions/get-promotion-for-flyer";

type FlyerPageProps = {
  params: Promise<{
    promotionId: string;
  }>;
};

export default async function FlyerPage({ params }: FlyerPageProps) {
  const { promotionId } = await params;
  const promotion = await getPromotionForFlyer(promotionId);

  if (!promotion) {
    return <div>Promoção não encontrada</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FlyerPrinterWrapper promotion={promotion} promotionId={promotionId} />
    </div>
  );
}
