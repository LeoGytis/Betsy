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
  console.log("🔥 :: activeTab ::", activeTab);

  // Reset selected filter when activeTab changes
  useEffect(() => {
    setSelectedFilter(null); // Reset selected filter on tab change
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
    <div>
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
