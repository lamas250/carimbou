import { Building, ChevronRight, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { CompanyType } from "@/features/companies/types";
import { useCompanyStore } from "@/store/companies";
import Image from "next/image";

// type CompanyListProps = {
//   companies: CompanyType[];
//   isEmpty?: boolean;
// };

const CompanyList = () => {
  const router = useRouter();

  const { companies } = useCompanyStore();

  if (companies.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center bg-card shadow-sm">
        <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
          <Building className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold mt-2">Nenhuma Empresa Cadastrada</h3>
          <p className="text-muted-foreground">
            Adicione sua primeira empresa para começar a criar programas de fidelidade.
          </p>
        </div>
      </div>
    );
  }

  const handleSelectCompany = (company: CompanyType) => {
    router.push(`/empresas/${company.id}`);
  };

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <div
          key={company.id}
          className="border rounded-lg p-4 flex justify-between items-center bg-card hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleSelectCompany(company)}
        >
          <div className="flex items-center gap-3">
            {company.logoUrl ? (
              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Store className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <h3 className="font-medium">{company.name}</h3>
              {company.description && (
                <p className="text-sm text-muted-foreground line-clamp-1 -mt-1">
                  {company.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {company.promotions?.length || 0} promoções
            </span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
