import React, { useEffect, useState } from "react";
import { GiCrownedHeart } from "react-icons/gi";
import ReactPaginate from "react-paginate";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const page = currentPage + 1;

    getMyTransactions(page, filters.type)
      .then((data) => {
        setTransactions(data.data);
        setTotalPages(Math.ceil(data.total / data.limit));
        setLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
        setLoading(false);
      });
  }, [filters, currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {transactions.length === 0 ? (
        <div>No transactions available</div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="w-full flex justify-between items-center bg-secondary border border-primary rounded p-4"
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
            <GiCrownedHeart className="w-16 h-16 text-primary text-opacity-40" />
          </div>
        ))
      )}
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"self-center flex gap-3 text-lg text-primary mt-2"}
        activeClassName={"border-b-2 bg-primary text-foreground px-2 rounded"}
        pageClassName={"text-primary"}
        previousLabel={<span>{"<"}</span>}
        nextLabel={<span>{">"}</span>}
        previousClassName={"mr-2"}
        nextClassName={"ml-2"}
      />
    </div>
  );
};

export default MyTransactions;
