"use client";

import { useState, useEffect } from "react";
import { Check, Clock, QrCode, Search, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetPromotionStamps } from "@/features/stamp/api/get-promotion-stamps";
import { Stamp, StampStatus } from "@prisma/client";
interface QrCodeListProps {
  promotionId: string;
}

interface QrCodeItem {
  id: string;
  timestamp: string;
  points: string;
  status: "used" | "pending" | "expired";
  usedBy?: string;
  usedAt?: string;
}

export function QrCodeList({ promotionId }: QrCodeListProps) {
  // const [qrCodes, setQrCodes] = useState<QrCodeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetPromotionStamps(promotionId);

  // Filtrar QR codes com base no termo de pesquisa
  const filteredQrCodes = data?.filter(
    (qrCode: Stamp & { userPromotion: { user: { name: string } } }) =>
      qrCode.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (qrCode.userPromotionId &&
        qrCode.userPromotionId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      qrCode.userPromotion?.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatar data e hora
  const formatDateTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Renderizar o status com ícone e cor apropriados
  const renderStatus = (status: string) => {
    switch (status) {
      case StampStatus.CLAIMED:
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
          >
            <Check className="h-3 w-3" />
            Utilizado
          </Badge>
        );
      case StampStatus.PENDING:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Pendente
          </Badge>
        );
      case StampStatus.EXPIRED:
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Expirado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">QR Codes Gerados</CardTitle>
        <CardDescription>
          Histórico de QR codes gerados para esta promoção e seu status de utilização.
        </CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por ID ou cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredQrCodes.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Gerado em</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Utilizado por</TableHead>
                  <TableHead>Utilizado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQrCodes.map(
                  (qrCode: Stamp & { userPromotion: { user: { name: string } } }) => (
                    <TableRow key={qrCode.id}>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <QrCode className="h-4 w-4 text-muted-foreground" />
                          {qrCode.id}
                        </div>
                      </TableCell>
                      <TableCell>{formatDateTime(qrCode.createdAt)}</TableCell>
                      <TableCell>{renderStatus(qrCode.status)}</TableCell>
                      <TableCell>
                        {qrCode.userPromotion?.user?.name || qrCode.userPromotionId || "-"}
                      </TableCell>
                      <TableCell>{qrCode.usedAt ? formatDateTime(qrCode.usedAt) : "-"}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <QrCode className="mx-auto h-12 w-12 opacity-20" />
            <p className="mt-2">Nenhum QR code encontrado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
