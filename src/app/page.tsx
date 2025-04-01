// import LandingPage from "@/components/landing-page/page";

// export default function Home() {
//   return (
//     <div>
//       <LandingPage />
//     </div>
//   );
// }

import { LoyaltyCardDemo } from "@/components/new-landing-page/loyalt-card-demo";
import { HowItWorks } from "@/components/new-landing-page/how-it-works";
import { Testimonials } from "@/components/new-landing-page/testimonials";
import { Faq } from "@/components/new-landing-page/faq";
import { Benefits } from "@/components/new-landing-page/benefits";
// import { Header } from "@/components/new-landing-page/header"
import { Footer } from "@/components/new-landing-page/footer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="flex flex-col space-y-6">
                <div className="flex w-full items-start md:mt-0 mt-4">
                  <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                    Aumente sua retenção de clientes
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Cartão Fidelidade Digital <span className="text-red-600">Simples e Elegante</span>
                </h1>
                <p className="max-w-lg text-lg text-gray-600 md:text-xl">
                  Transformando cartões de fidelidade tradicionais em uma experiência digital
                  perfeita. Colete carimbos e resgate sua recompensa com apenas alguns cliques.
                </p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Começar agora
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Ver demonstração
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      className="mr-1 h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Configure seu programa de fidelidade em 5 minutos
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
                <span className="mt-2 text-sm text-gray-600">Empresas</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">+2.000</span>
                <span className="mt-2 text-sm text-gray-600">Usuários</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">+10.000</span>
                <span className="mt-2 text-sm text-gray-600">Carimbos coletados</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-red-600 md:text-4xl">100%</span>
                <span className="mt-2 text-sm text-gray-600">Satisfação</span>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <HowItWorks />

        {/* Benefícios */}
        <Benefits />

        {/* Depoimentos */}
        {/* <Testimonials /> */}

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
              <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Começar agora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-red-600 hover:bg-red-700"
                >
                  Falar com um consultor
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
