import { useQuery } from "@tanstack/react-query";

export const useGetPromotionStamps = (promotionId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["promotion-stamps", promotionId],
    queryFn: async () => {
      const response = await fetch(`/api/stamps?promotionId=${promotionId}`);
      return response.json();
    },
  });

  return { data, isLoading, error };
};
