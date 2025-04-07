"use client";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Promotion } from "@prisma/client";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { pausePromotion } from "@/features/promotions/actions/pause-promotion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PausePromotionDialog({ promotion }: { promotion: Promotion }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handlePausePromotion = async () => {
    setIsLoading(true);
    await pausePromotion(promotion.id);
    setIsLoading(false);
    toast.success("Promoção pausada com sucesso");
    router.refresh();
    setIsOpen(false);
  };

  const handleReactivatePromotion = async () => {
    setIsLoading(true);
    await pausePromotion(promotion.id, true);
    setIsLoading(false);
    toast.success("Promoção reativada com sucesso");
    router.refresh();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {promotion.pausedAt ? (
          <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => setIsOpen(true)}>
            <Play className="h-4 w-4 mr-1" />
            Reativar
          </Button>
        ) : (
          <Button variant="secondary70" onClick={() => setIsOpen(true)}>
            <Pause className="h-4 w-4 mr-1" />
            Pausar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {promotion.pausedAt ? "Reativar promoção" : "Pausar promoção"} {promotion.name}
          </DialogTitle>
        </DialogHeader>
        {promotion.pausedAt ? (
          <DialogDescription>
            Ao reativar a promoção, os usuários poderão criar novos cartões.
          </DialogDescription>
        ) : (
          <DialogDescription>
            Ao pausar a promoção, os usuários não poderão criar novos cartões. No entanto, os
            carimbos dos cartões ativos continuarão a ser contabilizados.
          </DialogDescription>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          {promotion.pausedAt ? (
            <Button onClick={handleReactivatePromotion} disabled={isLoading}>
              {isLoading ? "Reativando..." : "Reativar"}
            </Button>
          ) : (
            <Button onClick={handlePausePromotion} disabled={isLoading}>
              {isLoading ? "Pausando..." : "Pausar"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
