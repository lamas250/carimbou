"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Clock, BarChart4, Gift } from "lucide-react";

export function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="beneficios" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Benefícios para seu negócio
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Descubra como o Carimbou pode transformar seu programa de fidelidade
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-100">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Aumente a retenção</h3>
            <p className="text-gray-600">
              Clientes com cartões de fidelidade têm 82% mais chances de retornar ao seu
              estabelecimento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-100">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Construa relacionamentos</h3>
            <p className="text-gray-600">
              Colete dados valiosos sobre seus clientes e personalize suas ofertas para aumentar o
              engajamento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-100">
              <Gift className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Aumente a satisfação do cliente
            </h3>
            <p className="text-gray-600">
              Ofereça recompensas personalizadas que encantam seus clientes e aumentam a lealdade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-100">
              <BarChart4 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Analise resultados</h3>
            <p className="text-gray-600">
              Acesse relatórios detalhados sobre o desempenho do seu programa de fidelidade e tome
              decisões baseadas em dados.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
