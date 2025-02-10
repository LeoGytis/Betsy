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
  const [filters, setFilters] = useState<FiltersProps>({
    type: "bet", // Example type
    status: "win", // Example status
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.MyBets);

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
              <Filter />
            </div>
            <ListView
              activeTab={activeTab}
              onTabChange={handleTabChange}
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
