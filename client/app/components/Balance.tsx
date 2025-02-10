import React, { useEffect, useState } from "react";
import { BASE_URL, ErrorResponse } from "../utils/constants";

const fetchBalance = async () => {
  const response = await fetch(`${BASE_URL}/my-transactions`);
  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }
  return response.json();
};

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBalance()
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="balance-container flex items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : balance !== null ? (
        <div className="balance-display">
          <span className="font-bold text-lg">€{balance.toFixed(2)}</span>
        </div>
      ) : (
        <div className="spinner">Loading...</div>
      )}
    </div>
  );
};

export default Balance;
