"use client";

import { QrCode } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCodeGenerator } from "./qrcode-generate";
import Link from "next/link";

interface PromotionQrCodesProps {
  promotionId: string;
}

export function PromotionQrCodes({ promotionId }: PromotionQrCodesProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Convide para esta promoção
        </CardTitle>
        <CardDescription>
          Gere um QR Code para que os clientes possam ingressar nesta promoção.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <QrCodeGenerator promotionId={promotionId} type={"promotion-redirect"} />
        <Link href={`/flyer/${promotionId}`} target="_blank">
          <Button variant="outline" className="w-full text-lg font-medium py-6" size="lg">
            <ExternalLink className="mr-2 h-5 w-5" />
            Folheto da promoção
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
