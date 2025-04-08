"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const TermsOfUse: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md pt-10">
      <h1 className="text-2xl font-bold mb-4">Termos de Uso</h1>
      <p className="text-sm text-gray-500 mb-4">Atualizado em: 08/04/2025</p>
      <p>
        Bem-vindo ao Carimbou! Ao utilizar nosso serviço, você concorda com os seguintes termos. Por
        favor, leia-os cuidadosamente antes de prosseguir.
      </p>

      <h2 className="text-lg font-semibold mb-2">1. Aceitação de Termos</h2>
      <p>
        Ao acessar e usar nosso site, você concorda em cumprir estes Termos de Uso. Se você não
        concorda, não use o serviço.
      </p>

      <h2 className="text-lg font-semibold mb-2">2. Registro e Acesso</h2>
      <p>O registro é feito através de autenticação via Google ou login com e-mail e senha.</p>
      <p>Você é responsável por manter a segurança de sua conta.</p>

      <h2 className="text-lg font-semibold mb-2">3. Uso do Serviço</h2>
      <p>
        Nosso serviço permite que comerciantes criem programas de fidelidade e gerenciem cartões de
        fidelidade para seus clientes. Você concorda em não usar o serviço para atividades ilegais
        ou que violem os direitos de terceiros.
      </p>

      <h2 className="text-lg font-semibold mb-2">4. Responsabilidades</h2>
      <p>
        Nós nos esforçamos para proteger seus dados, mas não garantimos que o serviço seja livre de
        falhas.
      </p>
      <p>Não nos responsabilizamos por danos resultantes do uso indevido do serviço.</p>

      <h2 className="text-lg font-semibold mb-2">5. Modificações</h2>
      <p>
        Podemos modificar estes Termos a qualquer momento. Notificaremos os usuários sobre mudanças
        significativas.
      </p>

      <h2 className="text-lg font-semibold mb-2">6. Contato</h2>
      <p>Para dúvidas, entre em contato conosco em: igor@carimbou.com.</p>

      <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
        Voltar para a página inicial
      </Button>
    </div>
  );
};

export default TermsOfUse;
