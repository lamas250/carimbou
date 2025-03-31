"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CompanyType } from "@/features/companies/types";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema } from "@/features/companies/types";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { createCompany } from "@/features/companies/actions/create-company";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useCompanyStore } from "@/store/companies";
import { uploadImage } from "@/actions/upload-image";

type CompanyFormProps = {
  company?: Partial<CompanyType>;
  onCancel: () => void;
};

const CompanyForm = ({ company, onCancel }: CompanyFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const { addCompany } = useCompanyStore();

  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: company?.name ?? "",
      description: company?.description ?? "",
      logoUrl: company?.logoUrl ?? undefined,
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof createCompanySchema>) => {
    setIsPending(true);
    form.clearErrors();

    if (!session?.user.id) {
      toast.error("Você precisa estar autenticado para criar uma empresa");
      return;
    }

    let imageUrl = null;
    if (data.logoUrl && data.logoUrl instanceof File) {
      const url = await uploadImage(data.logoUrl, {
        name: data.name,
      });
      imageUrl = url;
    }

    const company = await createCompany(
      {
        name: data.name,
        description: data.description ?? null,
        logoUrl: imageUrl,
      },
      session?.user.id
    );

    addCompany({ ...company, promotions: [] });

    toast.success("Empresa criada com sucesso");

    setIsPending(false);
    onCancel();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("logoUrl", file);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <Textarea {...field} placeholder="Descrição da empresa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="logoUrl"
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
                      <p className="text-sm font-medium">Logo da empresa</p>
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
          <div className="mt-4">
            <Separator />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {company ? "Atualizar" : "Criar"} Empresa
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyForm;
