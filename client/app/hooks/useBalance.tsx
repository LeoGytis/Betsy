import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/transiactionsService";

export const useBalance = () => {
  return useQuery({
    queryKey: ["playerBalance"],
    queryFn: fetchTransactions,
    staleTime: 60 * 1000, // Cache for 1 minute
    refetchInterval: 30 * 1000, // Auto-refresh every 30s
  });
};
