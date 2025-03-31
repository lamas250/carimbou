"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPassword } from "@/lib/auth-client";
import { AlertCircle, ArrowLeft, CheckCircle2, CircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const res = await forgetPassword({
      email,
      redirectTo: "/reset-password",
    });
    if (res.data) {
      setIsSubmitted(true);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Verifique seu email</CardTitle>
            <CardDescription>
              Enviamos um link de redefinição de senha para seu email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Se não ver o email, verifique sua pasta de spam.</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para redefinição de senha
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] gap-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CircleIcon className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Esqueceu sua senha?
        </h2>
      </div>
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Card className="border-none shadow-none bg-transparent sm:mx-auto sm:w-full sm:max-w-md">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-sm"
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button className="w-full mt-4 rounded-sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/sign-in">
            <Button variant="link" className="px-0">
              Voltar para o login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
