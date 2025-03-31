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
  const [qrCodes, setQrCodes] = useState<QrCodeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando o carregamento de dados da API
    const loadQrCodes = () => {
      setIsLoading(true);

      // Em um sistema real, você buscaria esses dados de uma API
      setTimeout(() => {
        const mockQrCodes: QrCodeItem[] = [
          {
            id: "qr-1234567890",
            timestamp: "2023-05-15T10:30:00Z",
            points: "1",
            status: "used",
            usedBy: "João Silva",
            usedAt: "2023-05-15T14:22:00Z",
          },
          {
            id: "qr-2345678901",
            timestamp: "2023-05-15T11:45:00Z",
            points: "2",
            status: "used",
            usedBy: "Maria Oliveira",
            usedAt: "2023-05-15T16:05:00Z",
          },
          {
            id: "qr-3456789012",
            timestamp: "2023-05-16T09:15:00Z",
            points: "5",
            status: "pending",
          },
          {
            id: "qr-4567890123",
            timestamp: "2023-05-16T14:30:00Z",
            points: "1",
            status: "pending",
          },
          {
            id: "qr-5678901234",
            timestamp: "2023-05-14T16:20:00Z",
            points: "10",
            status: "expired",
          },
        ];

        setQrCodes(mockQrCodes);
        setIsLoading(false);
      }, 1000);
    };

    loadQrCodes();
  }, [promotionId]);

  // Filtrar QR codes com base no termo de pesquisa
  const filteredQrCodes = qrCodes.filter(
    (qrCode) =>
      qrCode.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (qrCode.usedBy && qrCode.usedBy.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Formatar data e hora
  const formatDateTime = (dateString: string) => {
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
      case "used":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
          >
            <Check className="h-3 w-3" />
            Utilizado
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Pendente
          </Badge>
        );
      case "expired":
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
        <CardTitle className="text-xl">QR Codes Gerados</CardTitle>
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
                  <TableHead>Pontos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Utilizado por</TableHead>
                  <TableHead>Utilizado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQrCodes.map((qrCode) => (
                  <TableRow key={qrCode.id}>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <QrCode className="h-4 w-4 text-muted-foreground" />
                        {qrCode.id}
                      </div>
                    </TableCell>
                    <TableCell>{formatDateTime(qrCode.timestamp)}</TableCell>
                    <TableCell>{qrCode.points}</TableCell>
                    <TableCell>{renderStatus(qrCode.status)}</TableCell>
                    <TableCell>{qrCode.usedBy || "-"}</TableCell>
                    <TableCell>{qrCode.usedAt ? formatDateTime(qrCode.usedAt) : "-"}</TableCell>
                  </TableRow>
                ))}
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
