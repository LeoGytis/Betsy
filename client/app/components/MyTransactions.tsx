import React, { useEffect, useState } from "react";
import { GiCrownedHeart } from "react-icons/gi";
import { getMyTransactions } from "../services/transiactionsService";
import { ErrorResponse, TransactionProps, typeColor } from "../utils/constants";
import { formatDate } from "../utils/utils";

interface MyTransactionsProps {
  filters: { type?: string };
}

const MyTransactions: React.FC<MyTransactionsProps> = ({ filters }) => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyTransactions(filters.type)
      .then((data) => {
        setTransactions(data.data);
        setLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
        setLoading(false);
      });
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col space-y-4 p-4 border border-violet-800 rounded">
      {transactions.length === 0 ? (
        <div>No bets available</div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="w-full flex justify-between items-center bg-gray-900 border border-violet-500 rounded p-4"
          >
            <div className="flex flex-col gap-2">
              <span
                className={`w-fit capitalize border rounded p-2 py-0 ${
                  typeColor[transaction.type]
                }`}
              >
                {transaction.type}
              </span>
              <p>Amount: €{transaction.amount}</p>
              <p>Date: {formatDate(transaction.createdAt)}</p>
              <p>ID: {transaction.id}</p>
            </div>
            <GiCrownedHeart className="w-16 h-16 text-violet-500 text-opacity-40" />
          </div>
        ))
      )}
    </div>
  );
};

export default MyTransactions;
