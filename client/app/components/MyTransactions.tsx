import moment from "moment";
import React, { useEffect, useState } from "react";
import { getBetsList } from "../services/bettingService";
import { BetStatus, statusToColorMap } from "../utils/constants";
interface Bet {
  id: string;
  // status: string;
  amount: number;
  date: string;
  status: BetStatus;
}

const MyTransactions: React.FC = () => {
  const [bets, setTransactions] = useState<Bet[]>([]);
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
    <div className="flex flex-col space-y-4 p-4 border border-violet-500 rounded">
      <h1 className="text-xl font-semibold mb-4">Bets List</h1>
      {bets.length === 0 ? (
        <div>No bets available</div>
      ) : (
        bets.map((bet) => (
          <div
            key={bet.id}
            className="flex justify-between items-center p-4 bg-black rounded-md shadow-md"
          >
            <div>
              <div className="flex gap-2">
                <span>Status:</span>
                <span className={`${statusToColorMap[bet.status]}`}>
                  {bet.status}
                </span>
              </div>
              <p>Amount: ${bet.amount}</p>
              <p> Date: {moment(bet.date).format("HH:mm:ss")}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyTransactions;
