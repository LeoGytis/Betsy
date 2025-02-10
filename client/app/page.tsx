"use client";
import { useEffect, useState } from "react";
import BetForm from "./components/BetForm";
import ListView from "./components/ListView";
import NavBar from "./components/NavBar";
import { getBetsList } from "./services/bettingService";
import { ErrorResponse } from "./utils/constants";
import { getUserName } from "./utils/utils";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    getBetsList()
      .then(() => {
        setUserName(getUserName());
      })
      .catch((error: ErrorResponse) => {
        // Basic authentication, remove the token and user name from local storage
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
        }
      });
  }, []);

  return (
    <>
      <NavBar userName={userName} />
      <div className="w-full flex gap-8 mt-6">
        {userName ? (
          <>
            <div className="w-1/2 flex flex-col gap-4">
              <BetForm />
            </div>
            <ListView />
          </>
        ) : (
          <div>Welcome to Betsy!</div>
        )}
      </div>
    </>
  );
};

export default HomePage;
