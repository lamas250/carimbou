import { Users, TrendingUp, Edit, Pause, Fullscreen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Promotion, Company } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PausePromotionDialog } from "./pause-promotion-dialog";

export function PromotionCard({
  promotion,
  company,
  stats,
}: {
  promotion: Promotion;
  company: Company;
  stats: {
    totalUserPromotions: number;
    activeUserPromotions: number;
    completedUserPromotions: number;
  };
}) {
  const handleDeletePromotion = async (promotionId: string) => {
    // await deletePromotion(promotionId);
    // router.push("/promocoes");
    console.log(promotionId);
  };

  const router = useRouter();

  return (
    <Card key={promotion.id} className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {!promotion.imageUrl && !company.logoUrl ? (
              <div className="h-14 w-14 bg-muted rounded-md flex items-center justify-center">
                <Fullscreen className="h-10 w-10 text-muted-foreground/80" />
              </div>
            ) : (
              <div className="h-14 w-14 min-h-14 min-w-14">
                {promotion.imageUrl ? (
                  <Image
                    src={promotion.imageUrl}
                    alt={promotion.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={company.logoUrl || "/placeholder.svg"}
                    alt={company.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                )}
              </div>
            )}
            <div>
              <CardTitle className="text-xl">{promotion.name}</CardTitle>
              <CardDescription>{promotion.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Carimbos necessários:</span>
            <Badge variant="outline" className="font-bold">
              {promotion.requiredStamps}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Recompensa:</span>
            <span className="text-sm">{promotion.reward}</span>
          </div>
          {stats ? (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {stats?.activeUserPromotions}{" "}
                  {stats?.activeUserPromotions === 1 ? "cartão ativo" : "cartões ativos"}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />{" "}
                  {stats?.completedUserPromotions === 0
                    ? 0
                    : ((stats?.completedUserPromotions / stats?.totalUserPromotions) * 100).toFixed(
                        2
                      )}
                  % taxa de conclusão
                </span>
              </div>
              <Progress
                value={
                  stats?.completedUserPromotions === 0
                    ? 0
                    : (stats?.completedUserPromotions / stats?.totalUserPromotions) * 100
                }
                className="h-2"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <Skeleton className="w-20 h-3" />
                <Skeleton className="w-20 h-3" />
              </div>
              <Skeleton className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-3">
        <div className="grid grid-cols-2 gap-2 w-full">
          <PausePromotionDialog promotion={promotion} />
          <Button
            variant="default"
            className="w-full"
            onClick={() => router.push(`/promocoes/${promotion.id}`)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Gerenciar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
