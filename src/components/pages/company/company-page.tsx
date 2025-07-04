"use client";

import { useEffect } from "react";
import { Building, Plus, Image as ImageIcon, Edit, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreatePromotionDialog from "@/components/pages/promotion/create-promotion-dialog";
import { CompanyType } from "@/features/companies/types";
import { usePromotionStore } from "@/store/promotions";
import { Company, Promotion } from "@prisma/client";
import { PromotionCard } from "../promotion/promotion-card";
import { useGetPromotionStats } from "@/features/promotions/api/get-promotion-stats";
import CompanyDetails from "./company-details";

const CompanyPage = ({
  company,
  promotions,
}: {
  company: CompanyType;
  promotions: Promotion[];
}) => {
  const { setPromotions, promotions: promotionsStore } = usePromotionStore();
  const { data, isLoading, error } = useGetPromotionStats(company.id);

  useEffect(() => {
    if (promotions.length > 0) {
      setPromotions(promotions);
    }
  }, [promotions, setPromotions]);

  return (
    <div className="min-h-screen pb-16">
      <div className="py-2 sm:py-4">
        <>
          <CompanyDetails company={company} />

          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Promoções Ativas</h3>
              <CreatePromotionDialog company={company} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promotionsStore && promotionsStore.length > 0 ? (
                promotionsStore.map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    company={company}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    stats={data?.find((stat: any) => stat.promotionId === promotion.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">
                    Nenhuma promoção ainda. Adicione sua primeira promoção acima.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default CompanyPage;
