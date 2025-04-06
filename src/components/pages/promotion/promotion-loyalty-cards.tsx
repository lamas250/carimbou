"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetLoyaltyCards } from "@/features/promotions/api/get-loyalty-cards";
import { Promotion, Stamp, User, UserPromotion } from "@prisma/client";
import { Archive, Check, CreditCardIcon, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

interface PromotionLoyaltyCardsProps {
  promotionId: string;
}

type UserPromotionWithStamps = UserPromotion & {
  stamps: Stamp[];
  user: User;
  promotion: Promotion;
};

export function PromotionLoyaltyCards({ promotionId }: PromotionLoyaltyCardsProps) {
  const { data, isLoading, error } = useGetLoyaltyCards(promotionId);
  const [activeTab, setActiveTab] = useState("ativos");
  const [listData, setListData] = useState<UserPromotionWithStamps[]>([]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (data) {
      setListData(
        activeTab === "ativos"
          ? data.activeUserPromotions
          : activeTab === "regatados"
          ? data.claimedUserPromotions
          : activeTab === "expirados"
          ? data.expiredUserPromotions
          : []
      );
    }
  }, [data, activeTab]);

  const statusBadge = ({
    isClaimed,
    createdAt,
    endDate,
  }: {
    isClaimed: boolean;
    createdAt: Date;
    endDate: Date | null;
  }) => {
    if (isClaimed) {
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
        >
          <RefreshCcw className="h-3 w-3" />
          Resgatado
        </Badge>
      );
    } else if (endDate && createdAt > endDate) {
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Expirado
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
        >
          <Check className="h-3 w-3" />
          Ativo
        </Badge>
      );
    }
  };

  const progressBar = ({ progress, total }: { progress: number; total: number }) => {
    const percentage = (progress / total) * 100;
    let barColor = "bg-green-500";

    if (percentage === 100) {
      barColor = "bg-blue-500";
    }

    return (
      <div className="flex items-center gap-2">
        <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
          <div className={`${barColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="text-xs whitespace-nowrap">
          {progress}/{total}
        </span>
      </div>
    );
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Não utilizado";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cartões Ativos</CardTitle>
        <CardDescription>Veja os cartões da promoção.</CardDescription>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="ativos">Ativos</TabsTrigger>
            <TabsTrigger value="regatados">Regatados</TabsTrigger>
            <TabsTrigger value="expirados">Expirados</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : listData.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Última utilização</TableHead>
                  <TableHead>Data de criação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.user.name}</TableCell>
                    <TableCell>
                      {statusBadge({
                        isClaimed: item.isClaimed,
                        createdAt: item.createdAt,
                        endDate: item.promotion.endDate,
                      })}
                    </TableCell>
                    <TableCell>
                      {progressBar({
                        progress: item.stamps.length,
                        total: item.promotion.requiredStamps,
                      })}
                    </TableCell>
                    <TableCell>
                      {item.stamps.length > 0 && item.stamps[item.stamps.length - 1].usedAt
                        ? formatDate(item.stamps[item.stamps.length - 1].usedAt)
                        : "Não utilizado"}
                    </TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CreditCardIcon className="mx-auto h-12 w-12 opacity-20" />
            <p className="mt-2">
              Nenhum cartão{" "}
              {activeTab === "ativos"
                ? "ativo"
                : activeTab === "regatados"
                ? "regatado"
                : "expirado"}{" "}
              encontrado
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
