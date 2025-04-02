import { useQuery } from "@tanstack/react-query";

export const useGetPromotionStats = (companyId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["promotion-stats", companyId],
    queryFn: () =>
      fetch(`/api/promotion-stats${companyId ? `?companyId=${companyId}` : ""}`).then((res) =>
        res.json()
      ),
  });

  return { data, isLoading, error };
};
