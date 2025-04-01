"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Como funciona o Carimbou?",
    answer:
      "O Carimbou é uma plataforma digital de cartões de fidelidade. Os clientes podem coletar carimbos digitais através de um QR code gerado pelo estabelecimento. Ao completar o cartão, eles podem resgatar recompensas.",
  },
  {
    question: "Quanto custa para usar o Carimbou?",
    answer:
      "Oferecemos diferentes planos para atender às necessidades de cada negócio. Todos os planos são pagos, mas oferecemos um período de teste gratuito. Entre em contato conosco para mais detalhes.",
  },
  {
    question: "Preciso de algum equipamento especial?",
    answer:
      "Não! Você só precisa de um smartphone ou computador com acesso à internet. Nossa plataforma é totalmente baseada na nuvem, sem necessidade de hardware adicional.",
  },
  {
    question: "Como os clientes acessam seus cartões de fidelidade?",
    answer:
      "Os clientes podem acessar seus cartões de fidelidade através do navegador web, acessando nosso site.",
  },
  {
    question: "É possível personalizar o cartão de fidelidade?",
    answer:
      "Sim! Você pode personalizar completamente o design do seu cartão de fidelidade digital, incluindo cores, logotipo, número de carimbos necessários e tipos de recompensas oferecidas.",
  },
];

export function Faq() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Encontre respostas para as perguntas mais comuns sobre o Carimbou
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleExpand(index)}
                className="flex w-full items-start justify-between text-left"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <span className="ml-6 flex h-7 items-center">
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </span>
              </button>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
