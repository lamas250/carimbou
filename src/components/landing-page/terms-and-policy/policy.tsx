"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md pt-10">
      <h1 className="text-2xl font-bold mb-4">Carimbou - Política de privacidade</h1>
      <p className="text-sm text-gray-500 mb-4">Atualizado em: 08/04/2025</p>
      <p className="text-sm mb-4">
        Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações.
      </p>

      <h2 className="text-lg font-semibold mb-2">1. Informações Coletadas</h2>
      <p className="text-sm mb-4">
        Coletamos dados fornecidos através do login com Google, incluindo nome e e-mail. Também
        armazenamos dados criptografados que você registra no serviço, incluindo informações sobre
        programas de fidelidade criados por comerciantes.
      </p>

      <h2 className="text-lg font-semibold mb-2">2. Uso das Informações</h2>
      <ul className="list-disc pl-5 mb-4">
        <li className="text-sm mb-2">Fornecer acesso ao serviço;</li>
        <li className="text-sm mb-2">
          Permitir que comerciantes criem e gerenciem programas de fidelidade;
        </li>
        <li className="text-sm mb-2">Melhorar a experiência do usuário;</li>
        <li className="text-sm mb-2">Manter a segurança e integridade do sistema.</li>
      </ul>

      <h2 className="text-lg font-semibold mb-2">3. Proteção de Dados</h2>
      <p className="text-sm mb-4">
        Usamos criptografia para armazenar suas senhas e garantir sua privacidade.
      </p>
      <p className="text-sm mb-4">
        Seus dados não são vendidos ou compartilhados com terceiros sem o seu consentimento.
      </p>

      <h2 className="text-lg font-semibold mb-2">4. Cookies e Tecnologias de Rastreamento</h2>
      <p className="text-sm mb-4">Podemos usar cookies para melhorar sua experiência no site.</p>

      <h2 className="text-lg font-semibold mb-2">5. Alterações na Política</h2>
      <p className="text-sm mb-4">
        Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças
        significativas.
      </p>

      <h2 className="text-lg font-semibold mb-2">6. Contato</h2>
      <p className="text-sm mb-4">
        Para mais informações, entre em contato conosco em: igor@carimbou.com.
      </p>
      <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
        Voltar para a página inicial
      </Button>
    </div>
  );
};

export default PrivacyPolicy;
