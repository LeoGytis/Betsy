import React, { useEffect, useState } from "react";
import { GiCrownedHeart } from "react-icons/gi";
import { getBetsList } from "../services/bettingService";
import { BetStatus, statusColor } from "../utils/constants";
import { formatDateToTime } from "../utils/utils";

interface Bet {
  id: string;
  status: BetStatus;
  amount: number;
  createdAt: Date;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Bet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBetsList()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-4 p-4 border border-violet-800 rounded">
      <h1 className="text-xl font-semibold mb-4">My Transactions</h1>
      {transactions.length === 0 ? (
        <div>No bets available</div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center bg-gray-900 border border-violet-500 rounded p-4"
          >
            <div className="flex flex-col gap-2">
              <span
                className={`w-fit border rounded p-2 py-0 ${
                  statusColor[transaction.status]
                }`}
              >
                {transaction.status}
              </span>
              <p>Amount: ${transaction.amount}</p>
              <p>Time: {formatDateToTime(transaction.createdAt)}</p>
            </div>
            <GiCrownedHeart className="w-16 h-16 text-violet-500 text-opacity-50" />
          </div>
        ))
      )}
    </div>
  );
};

export default Transactions;
