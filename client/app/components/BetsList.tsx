import React, { useEffect, useState } from "react";
import { deleteBet, getBetsList } from "../services/bettingService";
import { BetStatus, statusColor } from "../utils/constants";
import { formatDateToTime } from "../utils/utils";

import { FaDice } from "react-icons/fa6";

interface Bet {
  id: string;
  status: BetStatus;
  amount: number;
  winAmount: number;
  createdAt: Date;
}

const BetsList: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBetsList()
      .then((data) => {
        setBets(data);
        setLoading(false);
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (betId: string) => {
    deleteBet(betId)
      .then(() => {
        setBets((prevBets) => prevBets.filter((bet) => bet.id !== betId));
      })
      .catch((error: { message: string }) => {
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col space-y-4 p-4 border border-violet-800 rounded">
      <h1 className="text-xl font-semibold">My Bets</h1>
      {bets.length === 0 ? (
        <div>No bets available</div>
      ) : (
        bets.map((bet) => (
          <div
            key={bet.id}
            className="flex justify-between items-center bg-gray-900 border border-violet-500 rounded p-4"
          >
            <div className="flex flex-col gap-2">
              <span
                className={`w-fit border rounded p-2 py-0 ${
                  statusColor[bet.status]
                }`}
              >
                {bet.status}
              </span>
              <p>Bet: ${bet.amount}</p>
              {bet.status === "win" ? (
                <p>Win Amount: ${bet.winAmount}</p>
              ) : null}
              <p>Time: {formatDateToTime(bet.createdAt)}</p>
              <p>ID: {bet.id}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <FaDice className="w-12 h-12 text-violet-500 text-opacity-40" />
              <button
                onClick={() => handleDelete(bet.id)}
                className="mt-auto text-red-500 border border-red-500 rounded hover:text-red-800 hover:border-red-800 px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BetsList;
