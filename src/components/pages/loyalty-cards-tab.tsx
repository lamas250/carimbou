import Container from "../container";
import { LoyaltyCardGrid } from "./loyalty-card-grid";
import { UserPromotion } from "@prisma/client";
import { UserPromotionWithStamps } from "@/features/user/actions/get-my-cards";

export default function LoyaltyCardsTab({
  userPromotions,
}: {
  userPromotions: UserPromotionWithStamps[];
}) {
  return <LoyaltyCardGrid userPromotions={userPromotions} />;
}
