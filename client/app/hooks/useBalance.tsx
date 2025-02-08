import { useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";

const BalanceContext = createContext<((balance: number) => void) | null>(null);

export const useBalance = () => {
  const queryClient = useQueryClient();

  const setBalance = (newBalance: number) => {
    queryClient.setQueryData(["balance"], newBalance);
  };

  return { setBalance, balance: queryClient.getQueryData<number>(["balance"]) };
};

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setBalance } = useBalance();

  return (
    <BalanceContext.Provider value={setBalance}>
      {children}
    </BalanceContext.Provider>
  );
};
