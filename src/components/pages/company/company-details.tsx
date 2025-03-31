import { useState } from "react";
import { Button } from "@/components/ui/button";
import CompanyForm from "@/components/pages/company/company-form";
import { CompanyType } from "@/features/companies/types";
import Image from "next/image";

type CompanyDetailsProps = {
  company: CompanyType;
  onUpdate: (company: CompanyType) => void;
};

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <CompanyForm company={company} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">Detalhes da Empresa</h3>
          <p className="text-sm text-muted-foreground">
            Visualize e gerencie as informações da sua empresa
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Editar Detalhes</Button>
      </div>

      <div className="grid gap-6 pt-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Nome da Empresa</h4>
          <p className="font-medium">{company.name}</p>
        </div>

        {company.description && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h4>
            <p>{company.description}</p>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Logo da Empresa</h4>
          {company.logoUrl ? (
            <div className="w-24 h-24 border rounded-md overflow-hidden">
              <Image
                src={company.logoUrl}
                alt={`${company.name} logo`}
                className="w-full h-full object-cover"
                width={96}
                height={96}
              />
            </div>
          ) : (
            <div className="bg-muted border rounded-md p-3 inline-block">No logo uploaded</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
