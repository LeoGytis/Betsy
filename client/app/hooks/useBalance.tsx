import { getBalance } from "@/services/playerService";
import { useQuery } from "@tanstack/react-query";

export const usePlayerBalance = () => {
  return useQuery({
    queryKey: ["playerBalance"],
    queryFn: getBalance,
    staleTime: 60 * 1000, // Cache for 1 minute
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
  });
};
