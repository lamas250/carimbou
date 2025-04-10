"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { Promotion, Company } from "@prisma/client";
import PromotionForm from "./promotion-form";

type EditPromotionDialogProps = {
  promotion: Promotion & { company: Company };
};

export default function EditPromotionDialog({ promotion }: EditPromotionDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-2">Editar promoção</DialogTitle>
          <PromotionForm
            company={promotion.company}
            promotion={promotion}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
