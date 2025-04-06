"use client";

import { printWithTailwind } from "react-tailwind-printer";
import FlyerComponent from "./flyer-component";
import { Promotion, Company } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Printer, Share2 } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function FlyerPrinterWrapper({
  promotion,
  promotionId,
}: {
  promotion: Promotion & { company: Company };
  promotionId: string;
}) {
  const handlePrint = () => {
    const flyerPromotion = document.getElementById("flyer-promotion");
    if (flyerPromotion) {
      const printWindow = window.open("", "", "height=400,width=600");
      printWindow?.document.write(`
            <html>
              <head>
                <title>Print</title>
                <link rel="stylesheet" href="${document.styleSheets[0].href}">
                <link rel="stylesheet" href="/global.css">
              </head>
              <body style="print-color-adjust: exact; -webkit-print-color-adjust: exact;">${flyerPromotion.innerHTML}</body>
            </html>
          `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const handleShare = async () => {
    const flyerPromotion = document.getElementById("flyer-promotion");
    if (flyerPromotion) {
      const canvas = await html2canvas(flyerPromotion, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297],
      });

      // Tamanho da imagem (em px)
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      // DPI padrão do PDF é 96px = 25.4mm
      const pxToMm = (px: number) => (px * 25.4) / 96;

      const imgWidthMm = pxToMm(imgWidthPx);
      const imgHeightMm = pxToMm(imgHeightPx);

      // Definir o tamanho máximo da imagem dentro do PDF
      const pageWidth = 210;
      const pageHeight = 297;

      // Ajustar escala para caber no PDF
      const scale = Math.min(pageWidth / imgWidthMm, pageHeight / imgHeightMm);

      const finalWidth = imgWidthMm * scale;
      const finalHeight = imgHeightMm * scale;

      // Centralizar
      const marginX = (pageWidth - finalWidth) / 2;
      const marginY = (pageHeight - finalHeight) / 2;

      // Adicionar imagem centralizada
      pdf.addImage(imgData, "PNG", marginX, marginY, finalWidth, finalHeight);

      pdf.save(`${promotion.name}.pdf`);
    }
  };

  return (
    <div className="overflow-y-auto h-full">
      <div id="flyer-promotion" className="flex justify-center">
        <div className="flex justify-center">
          <FlyerComponent promotion={promotion} promotionId={promotionId} />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center mt-4">
        <Button onClick={handlePrint} variant={"outline"}>
          <Printer size={16} className="mr-2" />
          Imprimir
        </Button>
        <Button onClick={handleShare} variant={"outline"}>
          <Share2 size={16} className="mr-2" />
          Compartilhar
        </Button>
      </div>
    </div>
  );
}
