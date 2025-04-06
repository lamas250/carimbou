import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Promotion, UserPromotion } from "@prisma/client";
import { Calendar, ScrollText, Users, TrendingUp } from "lucide-react";

export default function PromotionDetails({
  promotion,
  userPromotions,
}: {
  promotion: Promotion;
  userPromotions: {
    total: number;
    active: number;
    completed: number;
  };
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  const progress = ((userPromotions.completed / userPromotions.total) * 100).toFixed(2);

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Carimbos necessários:</span>
            <Badge variant="outline" className="font-bold text-lg">
              {promotion.requiredStamps}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Recompensa:</span>
            <span className="text-sm font-semibold">{promotion.reward}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Período da Promoção
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Início:</span>
              <p>{formatDate(promotion.createdAt.toISOString())}</p>
            </div>
            {promotion.endDate && (
              <div>
                <span className="text-muted-foreground">Término:</span>
                <p>{formatDate(promotion.endDate.toISOString())}</p>
              </div>
            )}
          </div>
        </div>

        {promotion.rule && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <ScrollText className="h-4 w-4" /> Regras
            </h3>
            <p className="text-sm text-muted-foreground">{promotion.rule}</p>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Estatísticas</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {userPromotions.active}/{userPromotions.total}{" "}
                {userPromotions.active === 1 ? "cartão ativo" : "cartões ativos"}
              </span>
              {progress && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {progress}% taxa de conclusão
                </span>
              )}
            </div>
            <Progress value={Number(progress)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
