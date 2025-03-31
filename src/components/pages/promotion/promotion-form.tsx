import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CompanyType } from "@/features/companies/types";
import { createPromotion } from "@/features/promotions/actions/create-promotion";
import { usePromotionStore } from "@/store/promotions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPromotionSchema } from "@/features/promotions/types";
import { toast } from "sonner";
import {
  Form,
  FormMessage,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
} from "@/components/ui/form";

type PromotionFormProps = {
  company: CompanyType;
  onCancel?: () => void;
};

const PromotionForm = ({ company, onCancel }: PromotionFormProps) => {
  const { addPromotion } = usePromotionStore();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof createPromotionSchema>>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: {
      companyId: company.id,
      name: "",
      description: "",
      requiredStamps: "0",
      reward: "",
    },
  });
  const { handleSubmit } = form;

  const handleAddPromotion = async (promotion: z.infer<typeof createPromotionSchema>) => {
    if (!company) return;

    setIsPending(true);

    try {
      const result = await createPromotion(promotion);
      addPromotion(result);

      toast.success("Promoção adicionada com sucesso", {
        description: `${promotion.name} foi adicionada com sucesso.`,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Erro ao adicionar promoção", {
        description: "Ocorreu um erro ao adicionar a promoção. Por favor, tente novamente.",
        duration: 3000,
      });
    } finally {
      form.reset();
      onCancel?.();
      setIsPending(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleAddPromotion)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome da empresa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descrição da promoção" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="requiredStamps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carimbos necessários*</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground">
                Número de carimbos necessários para ganhar um prêmio
              </p>
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Recompensa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground">
                O que os clientes receberão após completar o cartão
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Criando..." : "Criar"} Promoção
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PromotionForm;
