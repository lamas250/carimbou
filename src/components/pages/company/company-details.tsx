import { useState } from "react";
import { Button } from "@/components/ui/button";
import CompanyForm from "@/components/pages/company/company-form";
import { CompanyType } from "@/features/companies/types";
import Image from "next/image";
import { Company } from "@prisma/client";
import { Eye, EyeOff } from "lucide-react";
import CompanyEditDialog from "./company-edit-dialog";

type CompanyDetailsProps = {
  company: Company;
  onUpdate: (company: Company) => void;
};

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  if (isEditing) {
    return <CompanyForm company={company} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">Detalhes da Empresa</h3>
        </div>
        <div className="flex gap-2">
          <CompanyEditDialog company={company} />
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <Button size="sm" variant="ghost" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {isVisible ? "Esconder Dados" : "Mostrar Dados"}
        </Button>
      </div>

      {isVisible && (
        <div className="grid gap-2 pt-4">
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

          {company.instagram && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Instagram</h4>
              <p>{company.instagram}</p>
            </div>
          )}

          {company.facebook && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Facebook</h4>
              <p>{company.facebook}</p>
            </div>
          )}

          {company.phone && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Telefone</h4>
              <p>{company.phone}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Logo da Empresa</h4>
            {company.logoUrl ? (
              <div className="w-24 h-24 border rounded-md overflow-hidden min-w-18 min-h-18">
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
      )}
    </div>
  );
};

export default CompanyDetails;
