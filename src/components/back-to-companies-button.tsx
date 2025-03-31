"use client";

import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToCompaniesButton() {
  return (
    <Button variant="ghost" onClick={() => redirect("/empresas")}>
      <ArrowLeft className="h-4 w-4" />
      Voltar para Empresas
    </Button>
  );
}
