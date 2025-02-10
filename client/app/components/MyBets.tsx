import React, { useEffect, useState } from "react";
import { FaDice } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { deleteBet, getBetsList } from "../services/bettingService";
import {
  BetProps,
  BetStatus,
  ErrorResponse,
  statusColor,
} from "../utils/constants";
import { formatDate } from "../utils/utils";

interface MyBetsProps {
  filters: { status?: string };
}

const MyBets: React.FC<MyBetsProps> = ({ filters }) => {
  const [bets, setBets] = useState<BetProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const page = currentPage + 1; // react-paginate uses zero-based index
    getBetsList(filters.status, page, 2) // Assuming you want 2 bets per page
      .then((data) => {
        setBets(data.data);
        setTotalPages(Math.ceil(data.total / 2)); // Total pages based on the total count and limit
        setLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
        setLoading(false);
      });
  }, [filters, currentPage]);

  const handleDelete = (betId: string) => {
    deleteBet(betId)
      .then(() => {
        setBets((prevBets) =>
          prevBets.map((bet) =>
            bet.id === betId ? { ...bet, status: BetStatus.Canceled } : bet
          )
        );
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
      });
  };

  const filteredBets = filters.status
    ? bets.filter((bet) => bet.status === filters.status)
    : bets;

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {filteredBets.length === 0 ? (
        <div>No bets available</div>
      ) : (
        filteredBets.map((bet) => (
          <div
            key={bet.id}
            className="relative flex justify-between items-center bg-secondary border border-primary rounded p-4"
          >
            <div className="flex flex-col gap-2">
              <div
                className={`w-fit flex gap-2 capitalize border rounded p-2 py-0 ${
                  statusColor[bet.status]
                }`}
              >
                {bet.status}

                {bet.status === BetStatus.Win ? <p>€{bet.winAmount}!</p> : null}
              </div>
              <p>Bet: €{bet.amount}</p>
              <p>Date: {formatDate(bet.createdAt)}</p>
              <p>ID: {bet.id}</p>
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-center">
              <FaDice className="w-12 h-12 text-primary text-opacity-40" />
              {bet.status !== BetStatus.Canceled &&
                bet.status !== BetStatus.Win && (
                  <button
                    onClick={() => handleDelete(bet.id)}
                    className="mt-auto text-red-500 border border-red-500 rounded hover:text-red-800 hover:border-red-800 px-3 py-1"
                  >
                    Cancel
                  </button>
                )}
            </div>
          </div>
        ))
      )}
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"self-center flex gap-3 text-primary mt-2"}
        activeClassName={"border-b-2 bg-primary text-foreground px-2 rounded"}
        pageClassName={"text-primary"}
        previousLabel={<span>&#60;</span>}
        nextLabel={<span>&#62;</span>}
        previousClassName={"mr-2"}
        nextClassName={"ml-2"}
      />
    </div>
  );
};

export default MyBets;
