"use client";

import { useState } from "react";
import { Check, Sparkles, X, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PaymentButton } from "../payment-button";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const pricingTiers = [
    {
      id: "basic",
      name: "Plano Básico",
      emoji: "📦",
      description: "Ideal para pequenos comércios que querem fidelizar clientes sem complicação.",
      price: {
        monthly: 19.9,
        annually: 16.7,
      },
      currency: "R$",
      features: [
        { text: "Criação de até 2 programas de fidelidade.", included: true },
        { text: "Limite de 1500 carimbos por mês.", included: true },
        { text: "Uma única empresa por conta.", included: true },
        { text: "Relatórios básicos de uso.", included: true },
      ],
      limitations: ["Sem personalização de design ou marca."],
      buttonText: "Começar agora",
      buttonVariant: "outline" as const,
    },
    {
      id: "advanced",
      name: "Plano Avançado",
      emoji: "🚀",
      description:
        "Para negócios que querem crescer e ter mais controle sobre seu programa de fidelidade.",
      price: {
        monthly: 39.9,
        annually: 33.3,
      },
      currency: "R$",
      features: [
        { text: "Pode criar programas de fidelidade ilimitados.", included: true },
        { text: "Limite de 6000 carimbos por mês.", included: true },
        { text: "Limite de 5 empresas por conta.", included: true },
        { text: "Personalização com logo e cores da marca.", included: true },
        { text: "Relatórios detalhados com insights sobre clientes fiéis.", included: true },
        { text: "Suporte prioritário.", included: true },
      ],
      highlighted: true,
      badge: "Recomendado",
      buttonText: "Escolher este plano",
      buttonVariant: "default" as const,
      // noSurprises: true,
    },
    {
      id: "custom ",
      name: "Plano Personalizado",
      emoji: "💼",
      description:
        "Para negócios que querem um programa de fidelidade personalizado e para alta demanda.",
      price: {
        monthly: 0,
        annually: 0,
      },
      currency: "R$",
      features: [
        { text: "Quantidade de QR Codes personalizada.", included: true },
        { text: "Personalização com logo e cores da marca.", included: true },
        { text: "Até 10 empresas por conta.", included: true },
        { text: "Suporte prioritário.", included: true },
      ],
      // highlighted: true,
      buttonText: "Fale conosco",
      buttonVariant: "default" as const,
      isCustom: true,
    },
  ];

  const getDiscountPercentage = (monthly: number, annually: number) => {
    const annualTotal = annually * 12;
    const monthlyTotal = monthly * 12;
    const savings = monthlyTotal - annualTotal;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return percentage;
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-red-600/20 bg-red-50 text-red-600 px-4 py-1 text-sm rounded-full"
            >
              Experimente grátis por 7 dias
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Escolha o plano ideal para o seu negócio
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl">
              Sem contratos longos, sem taxas ocultas. Cancele quando quiser.
            </p>
          </div>

          <div className="flex flex-col items-center space-x-2 mt-6 gap-2">
            <div className="flex flex-row items-center space-x-2">
              <span
                className={`text-sm ${
                  billingCycle === "monthly" ? "text-slate-900 font-medium" : "text-slate-500"
                }`}
              >
                Mensal
              </span>
              <Switch
                checked={billingCycle === "annually"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
              />
              <span
                className={`text-sm ${
                  billingCycle === "annually" ? "text-slate-900 font-medium" : "text-slate-500"
                }`}
              >
                Anual
              </span>
            </div>
            {/* {billingCycle === "annually" && (
              <Badge
                variant="outline"
                className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
              >
                Economize até 15%
              </Badge>
            )} */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const price = billingCycle === "monthly" ? tier.price.monthly : tier.price.annually;
            const discount = getDiscountPercentage(tier.price.monthly, tier.price.annually);

            return (
              <Card
                key={tier.name}
                className={`flex flex-col relative overflow-hidden ${
                  tier.highlighted
                    ? "border-red-500 shadow-lg shadow-red-500/10 shadow-xl ring-1 ring-red-500/20"
                    : "border-slate-200"
                } ${tier.highlighted ? "bg-gradient-to-b from-red-50 to-transparent" : ""}`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="h-20 w-20 overflow-hidden">
                      <div className="absolute top-0 right-0 h-20 w-20">
                        <div className="absolute transform rotate-45 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium py-1 right-[-40px] top-[32px] w-[170px] text-center text-xs">
                          {tier.badge}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tier.emoji}</span>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-slate-500 pt-1.5">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-4 flex items-baseline text-slate-900">
                    <div className="flex flex-col">
                      {!tier.isCustom ? (
                        <>
                          <div>
                            <span className="text-4xl font-extrabold tracking-tight">
                              {tier.currency}
                              {price?.toFixed(2).replace(".", ",")}
                            </span>
                            <span className="ml-1 text-xl font-semibold">/mês</span>
                          </div>
                          <span className="text-sm text-slate-500">Teste grátis por 7 dias*</span>
                        </>
                      ) : (
                        <span className="text-4xl font-extrabold tracking-tight mb-4">
                          Personalizado
                        </span>
                      )}
                    </div>

                    {billingCycle === "annually" && !tier.isCustom && (
                      <div className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 border border-red-700">
                        Economize {discount}%
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <h4 className="font-medium text-sm flex items-center mb-3">Inclui:</h4>
                  <ul className="space-y-3 text-sm mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center">
                          <Check className="h-4 w-4 text-emerald-500" />
                        </div>
                        <span className="ml-3 text-slate-700">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.limitations && tier.limitations.length > 0 && (
                    <>
                      <h4 className="font-medium text-sm flex items-center mb-3 text-amber-700">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Limitações:
                      </h4>
                      <ul className="space-y-3 text-sm mb-6">
                        {tier.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center">
                              <X className="h-4 w-4 text-amber-500" />
                            </div>
                            <span className="ml-3 text-slate-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* {tier.noSurprises && (
                    <div className="mt-2 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <p className="text-sm text-emerald-700 flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-emerald-500" />
                        Promoções e carimbos ilimitados.
                      </p>
                    </div>
                  )} */}
                </CardContent>

                <CardFooter className="pt-6">
                  <PaymentButton tier={tier} billingCycle={billingCycle} />
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center w-full md:w-auto rounded-full border border-slate-200 bg-white px-6 py-3 shadow-sm">
            <span className="text-sm font-medium text-slate-700">
              Precisa de um plano personalizado para sua rede?
            </span>
            <Link href="#" className="ml-3 text-sm font-medium text-red-600 hover:text-red-700">
              Entre em contato conosco →
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-500 max-w-2xl mx-auto">
            Todos os planos incluem acesso ao painel administrativo, atualizações gratuitas e
            suporte básico por email. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}
