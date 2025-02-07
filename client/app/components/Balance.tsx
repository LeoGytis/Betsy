import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

// Async function to fetch balance data
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
      .catch((error: { message: string }) => {
        setError(error.message);
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className="balance-container flex items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : balance !== null ? (
        <div className="balance-display">
          <span className="font-bold text-lg">€{balance.toFixed(2)}</span>
        </div>
      ) : (
        <div className="spinner">Loading...</div> // You can use a spinner here for loading state
      )}
    </div>
  );
};

export default Balance;
