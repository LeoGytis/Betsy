import React, { useEffect, useState } from "react";
import { deleteBet, getBetsList } from "../services/bettingService";

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
    <div className="flex flex-col space-y-4 p-4 border border-violet-500 rounded">
      <h1 className="text-xl font-semibold mb-4">Bets List</h1>
      {bets.length === 0 ? (
        <div>No bets available</div>
      ) : (
        bets.map((bet) => (
          <div
            key={bet.id}
            className="flex flex-col p-4 bg-black rounded-md shadow-md"
          >
            <p className="font-bold">Bet ID: {bet.id}</p>
            <p>Status: {bet.status}</p>
            <p>Amount: ${bet.amount}</p>
            <p>Date: {new Date(bet.date).toLocaleDateString()}</p>
            <button
              onClick={() => handleDelete(bet.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BetsList;
