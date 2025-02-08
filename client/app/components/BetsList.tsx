import moment from "moment";
import React, { useEffect, useState } from "react";
import { deleteBet, getBetsList } from "../services/bettingService";
import { BetStatus, statusColor } from "../utils/constants";
interface Bet {
  id: string;
  status: BetStatus;
  amount: number;
  date: string;
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
    <div className="w-2/3 flex flex-col space-y-4 p-4 border border-violet-800 rounded">
      <h1 className="text-xl font-semibold mb-4">Bets List</h1>
      {bets.length === 0 ? (
        <div>No bets available</div>
      ) : (
        bets.map((bet) => (
          <div
            key={bet.id}
            className="flex justify-between items-center bg-gray-900 border border-violet-500 rounded p-4"
          >
            <div>
              <span
                className={`border rounded p-2 py-0 ${statusColor[bet.status]}`}
              >
                {bet.status}
              </span>
              <p>Amount: ${bet.amount}</p>
              <p> Date: {moment(bet.date).format("HH:mm:ss")}</p>
            </div>
            <button
              onClick={() => handleDelete(bet.id)}
              className="mt-2 text-red-500 px-4 py-2 border border-red-500 rounded hover:text-red-300 hover:border-red-300"
            >
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BetsList;
