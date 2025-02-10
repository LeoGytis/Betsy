"use client";
import { useState } from "react";
import { ActiveTab, FiltersProps } from "../utils/constants";
import Filter from "./Filter";
import MyBets from "./MyBets";
import MyTransactions from "./MyTransactions";

const ListView: React.FC = () => {
  const [filters, setFilters] = useState<FiltersProps>({});
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.MyBets);

  const handleFilterChange = (newFilters: FiltersProps) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const renderTabs = (
    activeTab: ActiveTab,
    onTabChange: (tab: ActiveTab) => void
  ) => (
    <div className="flex gap-2">
      <button
        className={`border rounded hover:bg-violet-600 hover:text-white px-6 py-2 ${
          activeTab === ActiveTab.MyBets ? "bg-secondary" : "text-opacity-50 "
        }`}
        onClick={() => onTabChange(ActiveTab.MyBets)}
      >
        Bets
      </button>
      <button
        className={`border rounded hover:bg-violet-600 hover:text-white px-6 py-2 ${
          activeTab === ActiveTab.MyTransactions
            ? "bg-secondary"
            : "text-opacity-50 "
        } `}
        onClick={() => onTabChange(ActiveTab.MyTransactions)}
      >
        Transactions
      </button>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="w-full flex justify-between">
        {renderTabs(activeTab, setActiveTab)}
        <Filter
          activeTab={activeTab}
          onChange={handleFilterChange}
          filters={filters}
        />
      </div>

      {activeTab === ActiveTab.MyBets && <MyBets filters={filters} />}
      {activeTab === ActiveTab.MyTransactions && (
        <MyTransactions filters={filters} />
      )}
    </div>
  );
};

export default ListView;
