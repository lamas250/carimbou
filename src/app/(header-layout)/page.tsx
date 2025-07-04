"use client";

import { LoyaltyCardDemo } from "@/components/new-landing-page/loyalt-card-demo";
import { HowItWorks } from "@/components/new-landing-page/how-it-works";
import { Faq } from "@/components/new-landing-page/faq";
import { Benefits } from "@/components/new-landing-page/benefits";
import { Footer } from "@/components/new-landing-page/footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Pricing from "@/components/new-landing-page/pricing";
import Link from "next/link";
import BusinessTypes from "@/components/new-landing-page/para-quem";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center md:mt-0 mt-4">
              <div className="flex flex-col space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    id="badge"
                    className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600"
                  >
                    Aumente sua retenção de clientes
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  id="heading"
                  className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-7xl"
                >
                  Chega de perder clientes! <span className="text-red-600">Fidelize</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  id="subtitle"
                  className="max-w-lg text-lg text-gray-600 md:text-xl"
                >
                  Fidelize de verdade com um cartão digital moderno. Comece agora seu programa de
                  fidelidade digital e veja seus clientes voltando mais vezes e gastando mais.
                </motion.p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link href="/#pricing">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">
                      Teste grátis por 7 dias
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  {/* <Button variant="outline" size="lg">
                    Ver demonstração
                  </Button> */}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Acesse gratuitamente e crie sua promoção em 5 minutos.
                  </div>
                </div>
              </div>
              <div className="relative">
                <LoyaltyCardDemo />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              />
            </svg>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">+40</span>
                <span className="mt-2 text-sm text-gray-600">Empresas atendidas</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">+900</span>
                <span className="mt-2 text-sm text-gray-600">Clientes atendidos</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">+10.000</span>
                <span className="mt-2 text-sm text-gray-600">Carimbos aplicados</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">100%</span>
                <span className="mt-2 text-sm text-gray-600">Satisfação</span>
              </div>
            </div>
          </div>
        </section>

        <BusinessTypes />

        {/* Como funciona */}
        <HowItWorks />

        {/* Benefícios */}
        <Benefits />

        {/* Depoimentos */}
        {/* <Testimonials /> */}

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <Faq />

        {/* CTA */}
        <section className="bg-red-600 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Pronto para o digital?</h2>
              <p className="mt-4 text-lg text-red-100">
                Comece a digitalizar os carimbos de seu cartão de fidelidade hoje e simplifique seu
                programa de retenção de clientes.
              </p>
              <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full">
                <div className="w-full">
                  <Link href="/#pricing">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-red-600 hover:bg-gray-100 w-full"
                    >
                      Começar agora
                    </Button>
                  </Link>
                </div>
                <div className="w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white bg-red-600 hover:bg-red-700 w-full"
                    onClick={() => {
                      window.open("mailto:contato@carimbou.com", "_blank");
                    }}
                  >
                    Falar com um consultor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
