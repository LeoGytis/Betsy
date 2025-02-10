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
  const filterOptions = activeTab === "myBets" ? BetStatus : TransactionType;

  useEffect(() => {
    setSelectedFilter(null);
  }, [activeTab]);

  const handleButtonClick = (value: string) => {
    const newFilters: FiltersProps = { ...filters };

    if (activeTab === "myBets") {
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
    <div className="h-fit flex justify-center items-center border border-violet-800 rounded p-6">
      <h3>{activeTab === "myBets" ? "Filter by Status" : "Filter by Type"}</h3>
      {Object.values(filterOptions).map((filterValue) => (
        <button
          key={filterValue}
          onClick={() => handleButtonClick(filterValue)}
          style={{
            backgroundColor:
              selectedFilter === filterValue ? "lightblue" : "transparent",
            border: "1px solid #ccc",
            padding: "8px 16px",
            margin: "5px",
            cursor: "pointer",
          }}
        >
          {filterValue}
        </button>
      ))}
    </div>
  );
};

export default Filter;
