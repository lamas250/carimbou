"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CompanyForm from "@/components/pages/company/company-form";
import { useState } from "react";

export default function CreateCompanyDialog() {
  const [showAddCompany, setShowAddCompany] = useState(false);

  return (
    <Dialog open={showAddCompany} onOpenChange={setShowAddCompany}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          <span>Cadastrar Empresa</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Empresa</DialogTitle>
        </DialogHeader>
        <CompanyForm onCancel={() => setShowAddCompany(false)} />
      </DialogContent>
    </Dialog>
  );
}
