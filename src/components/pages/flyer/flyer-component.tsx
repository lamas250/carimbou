"use client";

import { Phone, Instagram, Facebook, Printer, Share, Share2, Store } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import QRCode from "qrcode";
import { Promotion, Company } from "@prisma/client";

interface DigitalFlyerProps {
  promotion: Promotion & { company: Company };
  promotionId: string;
}

const generateQR = async (url: string) => {
  try {
    return QRCode.toDataURL(url);
  } catch (err) {
    console.error(err);
  }
};

export default function FlyerComponent({ promotion, promotionId }: DigitalFlyerProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQrCode = async () => {
      const qrImage = await generateQR(
        `${process.env.NEXT_PUBLIC_APP_URL}/participar/${promotionId}`
      );
      setQrCodeUrl(qrImage || "");
    };

    generateQrCode();
  }, [promotionId]);

  return (
    <div id="flyer-promotion" className="w-full">
      <Card className="max-w-md overflow-hidden border-2 shadow-lg p-0 mt-8 min-w-[300px]">
        <div className="bg-gradient-to-br from-primary/90 to-primary/70 text-white p-6">
          <div className="flex items-center gap-4">
            {promotion.company.logoUrl ? (
              <div className=" rounded-md shadow-md min-w-18 min-h-18">
                <Image
                  src={promotion.company.logoUrl || "/placeholder.svg"}
                  alt={`${promotion.company.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="rounded-md shadow-md min-w-18 min-h-18 flex items-center justify-center bg-muted">
                <Store className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{promotion.company.name}</h1>
              <p className="text-sm opacity-90">{promotion.company.description}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-center text-rose-600">{promotion.name}</h2>
            <p className="text-center">{promotion.description}</p>
          </div>

          <div className="flex justify-center">
            {qrCodeUrl && (
              <div className="flex flex-col items-center">
                <div className="border-2 border-primary p-1 rounded-lg min-w-20 min-h-20">
                  <Image
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="QR Code para a promoção"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-center mt-2 text-gray-600">Escaneie para participar</p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 p-4 flex flex-col space-y-2">
          {promotion.company.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-rose-600" />
              <span className="text-sm">{promotion.company.phone}</span>
            </div>
          )}
          {promotion.company.instagram && (
            <div className="flex items-center gap-2">
              <Instagram size={16} className="text-rose-600" />
              <span className="text-sm">{promotion.company.instagram}</span>
            </div>
          )}
          {promotion.company.facebook && (
            <div className="flex items-center gap-2">
              <Facebook size={16} className="text-rose-600" />
              <span className="text-sm">{promotion.company.facebook}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
