"use client";

import { useEffect, useState } from "react";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompanyList from "@/components/pages/company/company-list";
import CompanyDetails from "@/components/pages/company/company-details";
import { toast } from "sonner";
import { useCompanyStore } from "@/store/companies";
import { Company } from "@prisma/client";
import { CompanyType } from "@/features/companies/types";

export type PromotionType = {
  id: string;
  name: string;
  description: string;
  requiredStamps: number;
  reward: string;
};

const MyCompaniesPage = ({ companies }: { companies: CompanyType[] }) => {
  const { setCompanies } = useCompanyStore();

  useEffect(() => {
    if (companies.length > 0) {
      setCompanies(companies);
    }
  }, [companies, setCompanies]);

  if (!companies) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">Nenhuma empresa cadastrada</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="py-8 sm:py-12">
        {companies.length > 0 ? (
          <div className="space-y-6">
            <CompanyList />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">Nenhuma empresa cadastrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCompaniesPage;
