"use client";
import { useEffect, useState } from "react";
import { ActiveTab } from "../utils/constants";
import MyBets from "./BetsList";
import MyTransactions from "./MyTransactions";

export interface FiltersProps {
  type?: string;
  status?: string;
}

interface ListViewProps {
  onTabChange: (activeTab: "myBets" | "myTransactions") => void;
  filters: FiltersProps;
}
const ListView: React.FC<ListViewProps> = ({ filters }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.MyBets);
  const [appliedFilters, setAppliedFilters] = useState<FiltersProps>(filters);

  useEffect(() => {
    setAppliedFilters(filters);
  }, [filters]);

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="w-full flex justify-end gap-2">
        <button
          className={`text-white border border-violet-500 rounded px-6 py-2 ${
            activeTab === "myBets"
              ? "bg-violet-500"
              : "text-opacity-50 border-violet-800"
          } hover:bg-violet-600`}
          onClick={() => setActiveTab(ActiveTab.MyBets)}
        >
          Bets
        </button>
        <button
          className={`text-white border border-violet-500 rounded px-6 py-2  ${
            activeTab === "myTransactions"
              ? "bg-violet-500"
              : "text-opacity-50 border-violet-800 "
          } hover:bg-violet-600`}
          onClick={() => setActiveTab(ActiveTab.MyTransactions)}
        >
          Transactions
        </button>
      </div>

      {activeTab === "myBets" && <MyBets />}
      {activeTab === "myTransactions" && <MyTransactions />}

      {/* {activeTab === "myBets" && <MyBets filters={appliedFilters} />} */}
      {/* {activeTab === "myTransactions" && <MyTransactions filters={appliedFilters} />} */}
    </div>
  );
};

export default ListView;
