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
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <>
      <NavBar userName={userName} />
      <div className="w-full flex gap-8 mt-6">
        {userName ? (
          <>
            <div className="w-full flex flex-col gap-4">
              <BetForm />
              <Filter
                activeTab={activeTab}
                onChange={handleFilterChange}
                filters={filters}
              />
            </div>
            <ListView
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
              filters={filters}
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
