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

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CircleIcon className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === "signin" ? "Entrar na sua conta" : "Criar sua conta"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="space-y-6">
          {mode === "signup" && (
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nome
              </Label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e) => setName(e.currentTarget.value)}
                  value={name}
                  required
                  maxLength={50}
                  className="appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Digite seu nome"
                />
              </div>
            </div>
          )}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                autoComplete="email"
                required
                maxLength={50}
                placeholder="Digite seu email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Link href="/forgot-password" className="text-xs underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={8}
                maxLength={100}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isPending}
              onClick={async () => {
                setIsPending(true);
                if (mode === "signin") {
                  await signIn.email({
                    email,
                    password,
                    callbackURL: "/home",
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("Login realizado com sucesso");
                      },
                      onError: () => {
                        toast.error("Erro ao fazer login");
                        setIsPending(false);
                      },
                    },
                  });
                } else {
                  await signUp.email({
                    email,
                    password,
                    name,
                    callbackURL: "/home",
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("Conta criada com sucesso");
                      },
                      onError: () => {
                        toast.error("Erro ao criar conta");
                        setIsPending(false);
                      },
                    },
                  });
                }
              }}
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
