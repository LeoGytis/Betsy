"use client";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

const BalanceContext = createContext<{
  balance: number;
  setBalance: (balance: number) => void;
} | null>(null);

// Legacy code
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const [balance, setBalanceState] = useState<number>(
    queryClient.getQueryData<number>(["balance"]) || 0
  );

  const setBalance = (newBalance: number) => {
    setBalanceState(newBalance);
    queryClient.setQueryData(["balance"], newBalance);
  };

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
