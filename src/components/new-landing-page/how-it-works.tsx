"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User, QrCode, Gift } from "lucide-react";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="como-funciona" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Três passos simples para transformar sua experiência de fidelidade
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <User className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Experiência do Cliente</h3>
            <p className="mt-2 text-gray-600">
              Contabilize os carimbos de seu cartão de fidelidade digital e resgate sua recompensa.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <QrCode className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Aprovado pelo colaborador</h3>
            <p className="mt-2 text-gray-600">
              O colaborador gera um QR code, que é escaneado pelo cliente para coletar o carimbo.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Gift className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Resgate sua recompensa</h3>
            <p className="mt-2 text-gray-600">
              Depois de coletar o número necessário de carimbos, resgate sua recompensa com apenas
              um clique.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
