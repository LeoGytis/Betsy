import React, { useEffect, useState } from "react";
import { getBetsList } from "../services/bettingService";

interface Bet {
  id: string;
  status: string;
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-xl font-semibold mb-4">Bets List</h1>
      {bets.length === 0 ? (
        <div>No bets available</div>
      ) : (
        bets.map((bet) => (
          <div
            key={bet.id}
            className="flex flex-col p-4 bg-gray-100 rounded-md shadow-md"
          >
            <p className="font-bold">Bet ID: {bet.id}</p>
            <p>Status: {bet.status}</p>
            <p>Amount: ${bet.amount}</p>
            <p>Date: {new Date(bet.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BetsList;
