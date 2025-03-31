import BackToCompaniesButton from "@/components/back-to-companies-button";
import Container from "@/components/container";
import CompanyPage from "@/components/pages/company/company-page";
import CompanyEditDialog from "@/components/pages/company/company-edit-dialog";
import { getCompany } from "@/features/companies/actions/get-comany";
import { Building, Store } from "lucide-react";
import { getPromotions } from "@/features/promotions/actions/get-promotions";
import { usePromotionStore } from "@/store/promotions";
type Params = Promise<{ companyId: string }>;

export default async function EmpresaPage({ params }: { params: Params }) {
  const { companyId } = await params;
  const company = await getCompany(companyId);
  const promotions = await getPromotions(companyId);

  if (!company) {
    return <div>Empresa não encontrada</div>;
  }

  return (
    <Container
      title={company.name}
      description={company.description ?? undefined}
      image={
        company.logoUrl ? company.logoUrl : <Store className="w-10 h-10 text-muted-foreground" />
      }
      leftButton={<CompanyEditDialog />}
      button={<BackToCompaniesButton />}
    >
      <CompanyPage company={company} promotions={promotions} />
    </Container>
  );
}
