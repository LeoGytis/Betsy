import React, { useEffect, useState } from "react";
import {
  ActiveTab,
  BetStatus,
  FiltersProps,
  TransactionType,
} from "../utils/constants";

interface FilterProps {
  activeTab: ActiveTab;
  filters: FiltersProps;
  onChange: (filters: FiltersProps) => void;
}

const Filter: React.FC<FilterProps> = ({ activeTab, filters, onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const filterOptions =
    activeTab === ActiveTab.MyBets ? BetStatus : TransactionType;

  useEffect(() => {
    setSelectedFilter(null);
  }, [activeTab]);

  const handleButtonClick = (value: string) => {
    const newFilters: FiltersProps = { ...filters };

    if (activeTab === ActiveTab.MyBets) {
      newFilters.status = value;
    } else {
      newFilters.type = value;
    }

    if (selectedFilter === value) {
      setSelectedFilter(null);
      newFilters.status = undefined;
      newFilters.type = undefined;
    } else {
      setSelectedFilter(value);
    }

    onChange(newFilters);
  };

  return (
    <div className="flex justify-center items-end gap-2 borde border-red-5">
      <h3 className="text-md text-violet-500 mb-1">Filter by:</h3>
      <div className="flex gap-2">
        {Object.values(filterOptions).map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => handleButtonClick(filterValue)}
            className={`text-sm text-white border border-violet-500 rounded transition-colors px-2 py-1 hover:bg-violet-600 hover:text-white ${
              selectedFilter === filterValue
                ? "bg-violet-500"
                : "text-opacity-50 border-violet-800"
            }`}
          >
            {filterValue}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
