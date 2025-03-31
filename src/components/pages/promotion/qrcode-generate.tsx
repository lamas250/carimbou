"use client";

import { useState } from "react";
import { QrCode, RefreshCw, Plus, Download, Printer, Copy, QrCodeIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import QRCode from "qrcode";
import { createStamp } from "@/features/stamp/actions/create-stamp";
import Image from "next/image";
interface QrCodeGeneratorProps {
  promotionId: string;
}

const generateQR = async (url: string) => {
  try {
    return QRCode.toDataURL(url);
  } catch (err) {
    console.error(err);
  }
};

export function QrCodeGenerator({ promotionId }: QrCodeGeneratorProps) {
  const [pointValue, setPointValue] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [qrId, setQrId] = useState("");
  const [showResultDialog, setShowResultDialog] = useState(false);

  const generateQrCode = async () => {
    setIsGenerating(true);

    const { stamp, url } = await createStamp(promotionId);
    const qrImage = await generateQR(url);

    setQrId(stamp.id);
    setQrImage(qrImage || "");
    setIsGenerating(false);
    setShowResultDialog(true);
  };

  const handleCopyQrId = () => {
    navigator.clipboard.writeText(qrId);
    toast.success("ID do QR Code copiado para a área de transferência");
  };

  const handleGenerateNew = () => {
    setShowResultDialog(false);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Geração de QR Code
          </CardTitle>
          <CardDescription>
            Gere QR codes para que os clientes possam coletar pontos nesta promoção.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
            <DialogTrigger asChild>
              <Button
                onClick={generateQrCode}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <QrCode className="mr-2 h-5 w-5" />
                Gerar QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>QR Code Gerado</DialogTitle>
                <DialogDescription>
                  QR Code gerado com sucesso! Valor: {pointValue}{" "}
                  {Number.parseInt(pointValue) > 1 ? "pontos" : "ponto"}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <Image
                    src={qrImage || "/placeholder.svg"}
                    alt="QR Code gerado"
                    className="mx-auto"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="w-full bg-muted p-2 rounded-md flex items-center justify-between">
                  <code className="text-xs font-mono truncate">{qrId}</code>
                  <Button variant="ghost" size="sm" onClick={handleCopyQrId}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {/* <Button variant="outline" className="sm:flex-1" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
                <Button
                  variant="outline"
                  className="sm:flex-1"
                  onClick={() => alert("QR Code baixado")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar
                </Button> */}
                <Button onClick={handleGenerateNew} className="sm:flex-1">
                  <QrCode className="mr-2 h-4 w-4" />
                  Gerar Novo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}
