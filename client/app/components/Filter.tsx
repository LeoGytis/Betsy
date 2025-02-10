import React, { useState } from "react";
import { BetStatus, TransactionType } from "../utils/constants";

interface FilterProps {
  activeTab: "myBets" | "myTransactions";
  onChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ activeTab, onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const filterOptions = activeTab === "myBets" ? BetStatus : TransactionType;

  const handleButtonClick = (value: string) => {
    if (selectedFilter === value) {
      setSelectedFilter(null); // Deselect if it's already selected
      onChange(""); // Clear the filter
    } else {
      setSelectedFilter(value); // Set the new filter
      onChange(value); // Pass the selected filter to the parent
    }
  };

  return (
    <div>
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
