import {
  Calendar,
  Coffee,
  Gift,
  Award,
  Users,
  TrendingUp,
  ScrollText,
  Edit,
  Pause,
  Coins,
} from "lucide-react";
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

export function PromotionCard({ promotion, company }: { promotion: Promotion; company: Company }) {
  const router = useRouter();

  const handleDeletePromotion = async (promotionId: string) => {
    // await deletePromotion(promotionId);
    // router.push("/promocoes");
    console.log(promotionId);
  };

  return (
    <Card key={promotion.id} className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {promotion.imageUrl ? (
              <Image
                src={promotion.imageUrl}
                alt={promotion.name}
                width={50}
                height={50}
                className="rounded-md"
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
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> 39 participantes
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> 11% taxa de conclusão
              </span>
            </div>
            <Progress value={11} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-3">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => handleDeletePromotion(promotion.id)}
          >
            <Pause className="h-4 w-4 mr-1" />
            Pausar
          </Button>
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
