"use client";
import { useEffect, useState } from "react";
import BetForm from "./components/BetForm";
import Filter from "./components/Filter";
import ListView from "./components/ListView";
import NavBar from "./components/NavBar";
import { getBetsList } from "./services/bettingService";
import { ActiveTab, ErrorResponse, FiltersProps } from "./utils/constants";
import { getUserName } from "./utils/utils";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.MyBets);
  console.log("🔥 :: activeTab ::", activeTab);
  const [filters, setFilters] = useState<FiltersProps>({});

  useEffect(() => {
    getBetsList()
      .then(() => {
        setUserName(getUserName());
      })
      .catch((error: ErrorResponse) => {
        // If the user is not authenticated, remove the token and user name from local storage
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
        }
      });
  }, []);

  const handleFilterChange = (newFilters: FiltersProps) => {
    // Set the new filters state here
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, // Update filters based on the new changes
    }));
  };

  const handleTabChange = (newActiveTab: ActiveTab) => {
    setActiveTab(newActiveTab);
    console.log("Active Tab changed to:", newActiveTab);
  };

  return (
    <>
      <NavBar userName={userName} />
      <div className="w-full flex gap-8 mt-6">
        {userName ? (
          <>
            <div className="w-full flex flex-col gap-4">
              <BetForm />
              {/* Pass activeTab here to make sure the Filter component knows which tab is active */}
              <Filter
                activeTab={activeTab}
                onChange={handleFilterChange}
                filters={filters} // Ensure the latest filters are passed to Filter
              />
            </div>
            <ListView
              activeTab={activeTab}
              onTabChange={handleTabChange}
              filters={filters} // Ensure the latest filters are passed to ListView
            />
          </>
        ) : (
          <div>Welcome to Betsy!</div>
        )}
      </div>
    </>
  );
};

export default HomePage;
