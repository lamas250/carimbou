"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleIcon, Loader2 } from "lucide-react";
import { signIn, signUp, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BetterAuthError } from "better-auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Email é obrigatório" }),
  password: z.string().min(8, { message: "Senha é obrigatória" }),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

const errorMessage = (code: string) => {
  switch (code) {
    case "INVALID_CREDENTIALS":
      return "Email ou senha inválidos";
    case "USER_NOT_FOUND":
      return "Usuário não encontrado";
    case "INVALID_PASSWORD":
      return "Email ou senha inválidos";
    case "EMAIL_ALREADY_EXISTS":
      return "Email já cadastrado";
    case "INVALID_TOKEN":
      return "Token inválido";
    case "TOKEN_EXPIRED":
      return "Token expirado";
    case "USER_ALREADY_EXISTS":
      return "Usuário já cadastrado";
    case "INVALID_SIGNUP_METHOD":
      return "Método de cadastro inválido";
    case "INVALID_SIGNIN_METHOD":
      return "Método de login inválido";
    case "INVALID_REQUEST":
      return "Requisição inválida";
    case "INVALID_STATE":
      return "Estado inválido";
    case "INVALID_EMAIL_OR_PASSWORD":
      return "Email ou senha inválidos";
    default:
      return "Erro ao fazer login";
  }
};

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema | typeof signupSchema>>({
    resolver: zodResolver(mode === "signup" ? signupSchema : loginSchema),
    defaultValues: {
      ...(mode === "signup" && {
        name: "",
      }),
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (mode === "signin") {
      await onSubmitSignIn(data);
    } else {
      await onSubmitSignUp(data);
    }
  };

  const onSubmitSignIn = async (data: z.infer<typeof loginSchema>) => {
    setIsPending(true);
    if (mode === "signin") {
      await signIn.email({
        email: data.email,
        password: data.password,
        // callbackURL: "/home",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login realizado com sucesso");
            router.push("/home");
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            toast.error(errorMessage(error.error.code));
            setIsPending(false);
            setError(errorMessage(error.error.code));
          },
        },
      });
    }
  };

  const onSubmitSignUp = async (data: z.infer<typeof signupSchema>) => {
    setIsPending(true);
    await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      // callbackURL: "/home",
      fetchOptions: {
        onSuccess: () => {
          toast.success("Conta criada com sucesso");
          router.push("/home");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toast.error(errorMessage(error.error.code));
          setIsPending(false);
          setError(errorMessage(error.error.code));
        },
      },
    });
    setIsPending(false);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image src="/logo-icone.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === "signin" ? "Entrar na sua conta" : "Criar sua conta"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Digite seu nome" className="text-xs" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu email" className="text-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Digite sua senha"
                          className="text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end mt-1">
                  <Link href="/forgot-password" className="text-xs underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Carregando...
                    </>
                  ) : mode === "signin" ? (
                    "Entrar"
                  ) : (
                    "Criar conta"
                  )}
                </Button>

                {/* <Button
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                });
              }}
              disabled={isPending}
              className="w-full mt-2 flex justify-center items-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51z"
                ></path>
              </svg>
              Continue with Google
            </Button> */}
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {mode === "signin" ? "Novo por aqui?" : "Já tem uma conta?"}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }${priceId ? `&priceId=${priceId}` : ""}`}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-sm shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {mode === "signin" ? "Criar conta" : "Entrar"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
