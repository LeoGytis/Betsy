"use client";
import { useState } from "react";
import BetsList from "./BetsList";
import Transactions from "./Transactions";

const Toggler = () => {
  const [activeTab, setActiveTab] = useState<"myBets" | "myTransactions">(
    "myBets"
  );

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="w-full flex justify-end gap-2">
        <button
          className={`text-white border border-violet-500 rounded px-6 py-2 ${
            activeTab === "myBets"
              ? "bg-violet-500"
              : "text-opacity-50 border-violet-800"
          } hover:bg-violet-600`}
          onClick={() => setActiveTab("myBets")}
        >
          Bets
        </button>
        <button
          className={`text-white border border-violet-500 rounded px-6 py-2  ${
            activeTab === "myTransactions"
              ? "bg-violet-500"
              : "text-opacity-50 border-violet-800 "
          } hover:bg-violet-600`}
          onClick={() => setActiveTab("myTransactions")}
        >
          Transactions
        </button>
      </div>

      {activeTab === "myBets" && <BetsList />}
      {activeTab === "myTransactions" && <Transactions />}
    </div>
  );
};

export default Toggler;
