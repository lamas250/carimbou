"use client";

import { Button } from "@/components/ui/button";
import { Edit, Pencil } from "lucide-react";
import { Company } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import CompanyForm from "./company-form";
import { useState } from "react";

export default function CompanyEditDialog({ company }: { company: Company }) {
  const [showEditCompany, setShowEditCompany] = useState(false);
  return (
    <Dialog open={showEditCompany} onOpenChange={setShowEditCompany}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <CompanyForm company={company} onCancel={() => setShowEditCompany(false)} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
