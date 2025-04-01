import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PromotionForm from "./promotion-form";
import { CompanyType } from "@/features/companies/types";
import { useState } from "react";

export default function CreatePromotionDialog({ company }: { company: CompanyType }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Adicionar Promoção
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Promoção</DialogTitle>
        </DialogHeader>
        <PromotionForm company={company} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
