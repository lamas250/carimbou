"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CompanyType } from "@/features/companies/types";
import { upsertPromotion } from "@/features/promotions/actions/create-promotion";
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
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { uploadImage } from "@/actions/upload-image";
import { Promotion, Company } from "@prisma/client";
import { useRouter } from "next/navigation";
type PromotionFormProps = {
  company: Company;
  onCancel?: () => void;
  promotion?: Promotion;
};

const PromotionForm = ({ company, onCancel, promotion }: PromotionFormProps) => {
  const { addPromotion, updatePromotion } = usePromotionStore();
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createPromotionSchema>>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: {
      id: promotion?.id ?? undefined,
      companyId: company.id,
      name: promotion?.name ?? "",
      description: promotion?.description ?? "",
      requiredStamps: promotion?.requiredStamps.toString() ?? "0",
      reward: promotion?.reward ?? "",
      image: promotion?.imageUrl ?? undefined,
      cardDuration: promotion?.cardDuration?.toString() ?? "0",
      rule: promotion?.rule ?? "",
    },
  });
  const { handleSubmit } = form;

  const handleAddPromotion = async (promotion: z.infer<typeof createPromotionSchema>) => {
    if (!company) return;

    setIsPending(true);

    try {
      let imageUrl = promotion?.imageUrl ?? null;
      if (promotion.image && promotion.image instanceof File) {
        const url = await uploadImage(promotion.image, {
          name: promotion.name,
        });
        imageUrl = url;
      }
      const { image, ...data } = promotion;

      const result = await upsertPromotion({
        ...data,
        imageUrl: imageUrl ?? undefined,
      });

      if (promotion?.id) {
        updatePromotion(result);
        toast.success("Promoção atualizada com sucesso", {
          description: `${promotion.name} foi atualizada com sucesso.`,
          duration: 3000,
        });
      } else {
        addPromotion(result);
        toast.success("Promoção adicionada com sucesso", {
          description: `${promotion.name} foi adicionada com sucesso.`,
          duration: 3000,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Erro ao adicionar promoção", {
        description: error.message,
        duration: 3000,
      });
    } finally {
      form.reset();
      onCancel?.();
      setIsPending(false);
      router.refresh();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
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
                  <FormLabel>Nome da promoção*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome da promoção" className="text-xs" />
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
                    <Textarea
                      {...field}
                      className="text-xs"
                      placeholder="Descrição da promoção. Ex. Compre 10 coisas para ganhar algo."
                    />
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
                    <FormLabel>Recompensa</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Recompensa" className="text-sm" />
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

          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedSettings((prev) => !prev)}
              className="mb-4"
            >
              {showAdvancedSettings ? (
                <div className="flex items-center gap-x-2 text-sm">
                  <ChevronUp className="size-4" />
                  Esconder Configurações Avançadas
                </div>
              ) : (
                <div className="flex items-center gap-x-2 text-sm">
                  <ChevronDown className="size-4" />
                  Mostrar Configurações Avançadas
                </div>
              )}
            </Button>

            {showAdvancedSettings && (
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="cardDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Validade dos cartões (dias)*</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-xs text-muted-foreground">
                    Número de dias que o cartão será válido Ex. 30, 90 dias, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="rule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regras</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Não é obrigatório preencher. Ex. A recompensa so pode ser resgatada aos finais de semana. Válido apenas para o prato pequeno. "
                            className="text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-xs text-muted-foreground">
                    Caso haja requisitos para resgatar ou detalhes sobre a recompensa
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="flex flex-col gap-y-2 mt-4">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <div className="size-[72px] relative rounded-md overflow-hidden">
                        <Image
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="Workspace image"
                          className="object-cover"
                          width={72}
                          height={72}
                        />
                      </div>
                    ) : (
                      <Avatar className="size-[72px]">
                        <AvatarFallback>
                          <ImageIcon className="size-[36px] text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">Imagem da promoção</p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG, SVG or JPEG, max 2mb
                      </p>
                      <input
                        type="file"
                        accept=".jpg, .png, .svg, .jpeg"
                        className="hidden"
                        onChange={handleImageChange}
                        ref={inputRef}
                        // disabled={isPending}
                      />
                      <Button
                        variant="outline"
                        onClick={() => inputRef.current?.click()}
                        // disabled={isPending}
                        type="button"
                        className="w-fit mt-2"
                        size="sm"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {promotion ? "Atualizar" : "Criar"} Promoção
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PromotionForm;
