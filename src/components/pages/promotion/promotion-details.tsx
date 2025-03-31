import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Promotion } from "@prisma/client";
import Image from "next/image";
import { Calendar, ScrollText, Users, TrendingUp } from "lucide-react";

export default function PromotionDetails({ promotion }: { promotion: Promotion }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  return (
    <Card>
      {/* <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          {promotion.imageUrl ? (
            <Image
              src={promotion.imageUrl}
              alt={promotion.name}
              width={100}
              height={100}
              className="rounded-md"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-md" />
          )}
          <div>
            <CardTitle className="text-2xl">{promotion.name}</CardTitle>
            <CardDescription>{promotion.description}</CardDescription>
          </div>
        </div>
      </CardHeader> */}
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
            {/* <div>
              <span className="text-muted-foreground">Término:</span>
              <p>{formatDate(promotion.)}</p>
            </div> */}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <ScrollText className="h-4 w-4" /> Regras
          </h3>
          <p className="text-sm text-muted-foreground">Criar regras no schema</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Estatísticas</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> 23 participantes
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> 11% taxa de conclusão
              </span>
            </div>
            <Progress value={11} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
