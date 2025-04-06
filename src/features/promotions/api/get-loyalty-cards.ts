import { useQuery } from "@tanstack/react-query";

export const useGetLoyaltyCards = (promotionId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["loyalty-cards", promotionId],
    queryFn: async () => {
      const response = await fetch(`/api/promotion/loyalty-cards?promotionId=${promotionId}`);
      return response.json();
    },
  });

  return { data, isLoading, error };
};
