"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarCheck, User, QrCode, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const showDemoToast = () => {
    toast("It's that simple!");
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="container px-4 mx-auto">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div
              className={`transition-all duration-1000 delay-300 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Cartão de Fidelidade Digital
                <br />
                <span className="text-primary">Simples e Elegante</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Transformando cartões de fidelidade tradicionais em uma experiência digital
                perfeita. Colete 10 carimbos e ganhe uma refeição grátis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/card">Meus Cartões</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/restaurant">Login</Link>
                </Button>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="loyalty-card aspect-[4/3] mx-auto max-w-md">
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Cartão de Fidelidade</h3>
                    <span className="text-sm text-muted-foreground">3/10 carimbos</span>
                  </div>

                  {/* Preview stamps */}
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-full border bg-white/80 dark:bg-white/5 flex items-center justify-center shadow-sm"
                      >
                        {index < 3 ? (
                          <Check className="w-5 h-5 text-primary" />
                        ) : (
                          <span className="text-muted-foreground text-xs">{index + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Como funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="h-8 w-8" />,
                title: "Experiência do Cliente",
                description:
                  "Comtabilize os carimbos de seu cartão de fidelidade digital e resgate sua refeição grátis.",
              },
              {
                icon: <QrCode className="h-8 w-8" />,
                title: "Aprovado pelo colaborador",
                description:
                  "O colaborador gera um QR code para cada cliente, que é escaneado pelo cliente para coletar o carimbo.",
              },
              {
                icon: <CalendarCheck className="h-8 w-8" />,
                title: "Resgate sua recompensa",
                description:
                  "Depois de coletar o número necessário de carimbos, resgate sua recompensa.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`glass-card p-6 transition-all duration-700 ${
                  loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + index * 200}ms` }}
              >
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={showDemoToast}
              variant="outline"
              size="lg"
              className={`transition-all duration-700 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              Experimente
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para ir digital?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Comece a coletar carimbos digitais hoje e simplifique seu programa de fidelidade.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/card">Começar</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/restaurant">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
