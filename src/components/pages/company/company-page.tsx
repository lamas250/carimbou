"use client";

import { useEffect } from "react";
import { Building, Plus, Image as ImageIcon, Edit, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreatePromotionDialog from "@/components/pages/promotion/create-promotion-dialog";
import { CompanyType } from "@/features/companies/types";
import { usePromotionStore } from "@/store/promotions";
import { Promotion } from "@prisma/client";
import { PromotionCard } from "../promotion/promotion-card";
const CompanyPage = ({
  company,
  promotions,
}: {
  company: CompanyType;
  promotions: Promotion[];
}) => {
  const { setPromotions } = usePromotionStore();

  useEffect(() => {
    if (promotions.length > 0) {
      setPromotions(promotions);
    }
  }, [promotions, setPromotions]);

  return (
    <div className="min-h-screen pb-16">
      <div className="py-8 sm:py-12">
        <>
          {/* <CompanyDetails company={selectedCompany} onUpdate={handleUpdateCompany} /> */}

          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Promoções Ativas</h3>
              <CreatePromotionDialog company={company} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promotions && promotions.length > 0 ? (
                promotions.map((promotion) => (
                  <PromotionCard key={promotion.id} promotion={promotion} company={company} />
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
