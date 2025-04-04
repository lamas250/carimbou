"use client";

import { useState, useEffect } from "react";
import {
  QrCode,
  RefreshCw,
  Plus,
  Download,
  Printer,
  Copy,
  QrCodeIcon,
  Loader2,
} from "lucide-react";
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

export const QR_CODE_TYPES = {
  STAMP: "stamp",
  PROMOTION_REDIRECT: "promotion-redirect",
  REDEEM_REDIRECT: "redeem-redirect",
} as const;

export type QrCodeType = (typeof QR_CODE_TYPES)[keyof typeof QR_CODE_TYPES];

interface QrCodeGeneratorProps {
  promotionId?: string;
  userPromotionId?: string;
  type: QrCodeType;
}

const generateQR = async (url: string) => {
  try {
    return QRCode.toDataURL(url);
  } catch (err) {
    console.error(err);
  }
};

export function QrCodeGenerator({ promotionId, type, userPromotionId }: QrCodeGeneratorProps) {
  const [qrImage, setQrImage] = useState("");
  const [qrId, setQrId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateQrCode = async () => {
    let id = "";
    let urlGenerated = "";

    if (type === QR_CODE_TYPES.STAMP && promotionId && userPromotionId) {
      const { stamp, url } = await createStamp(promotionId, userPromotionId);
      id = stamp.id;
      urlGenerated = url;
    }

    if (type === QR_CODE_TYPES.PROMOTION_REDIRECT && promotionId) {
      id = promotionId;
      urlGenerated = `${process.env.NEXT_PUBLIC_APP_URL}/participar/${promotionId}`;
    }

    if (type === QR_CODE_TYPES.REDEEM_REDIRECT && promotionId && userPromotionId) {
      urlGenerated = `${process.env.NEXT_PUBLIC_APP_URL}/promocoes/${promotionId}`;
      id = userPromotionId;
    }

    const qrImage = await generateQR(urlGenerated);

    setQrId(id);
    setQrImage(qrImage || "");
  };

  useEffect(() => {
    if (!isOpen) return;

    if (type === QR_CODE_TYPES.STAMP && promotionId && userPromotionId) {
      generateQrCode();
    }

    if (type === QR_CODE_TYPES.PROMOTION_REDIRECT && promotionId) {
      generateQrCode();
    }

    if (type === QR_CODE_TYPES.REDEEM_REDIRECT && promotionId) {
      generateQrCode();
    }
  }, [type, promotionId, isOpen, userPromotionId, generateQrCode]);

  const handleCopyQrId = () => {
    navigator.clipboard.writeText(qrId);
    toast.success("ID do QR Code copiado para a área de transferência");
  };

  // const handleGenerateNew = async () => {
  //   setIsGenerating(true);

  //   let id = "";
  //   let urlGenerated = "";

  //   if (promotionId) {
  //     const { stamp, url } = await createStamp(promotionId);
  //     id = stamp.id;
  //     urlGenerated = url;
  //   }

  //   const qrImage = await generateQR(urlGenerated);

  //   setQrId(id);
  //   setQrImage(qrImage || "");
  //   setIsGenerating(false);
  //   setShowResultDialog(true);
  // };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className={`w-full ${
              type === QR_CODE_TYPES.REDEEM_REDIRECT
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-primary hover:bg-primary/90"
            } ${
              type === QR_CODE_TYPES.REDEEM_REDIRECT ? "text-white" : "text-black"
            } font-medium py-6 text-lg shadow-lg hover:shadow-xl transition-all`}
          >
            <QrCode className="mr-2 h-5 w-5" />
            {type === QR_CODE_TYPES.REDEEM_REDIRECT ? "Resgatar" : "Gerar QR Code"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {type === QR_CODE_TYPES.REDEEM_REDIRECT
                ? "Resgatar Recompensa"
                : type === QR_CODE_TYPES.STAMP
                ? "Carimbar Cartão"
                : "Acessar Promoção"}
            </DialogTitle>
            <DialogDescription>
              {type === QR_CODE_TYPES.REDEEM_REDIRECT
                ? "Escaneie o QR Code para resgatar sua recompensa"
                : type === QR_CODE_TYPES.STAMP
                ? "Escaneie o QR Code para coletar seu carimbo"
                : "Escaneie o QR Code para acessar a promoção"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4 ">
            <div
              className={`bg-white p-4 rounded-lg shadow-lg mb-4 border ${
                type === QR_CODE_TYPES.REDEEM_REDIRECT ? "border-emerald-500" : "border-primary"
              }`}
            >
              {qrImage ? (
                <Image
                  src={qrImage}
                  alt="QR Code gerado"
                  className="mx-auto"
                  width={300}
                  height={300}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {type === QR_CODE_TYPES.STAMP
                ? "ID do Carimbo"
                : type === QR_CODE_TYPES.PROMOTION_REDIRECT
                ? "ID da Promoção"
                : "ID do Cartão"}
            </span>
            <div className="w-full bg-muted p-2 rounded-md flex items-center justify-between">
              <code className="text-xs font-mono truncate">{qrId}</code>
              <Button variant="ghost" size="sm" onClick={handleCopyQrId}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleGenerateNew} className="sm:flex-1">
                  <QrCode className="mr-2 h-4 w-4" />
                  {isGenerating ? "Gerando..." : "Gerar Novo"}
                </Button>
              </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
