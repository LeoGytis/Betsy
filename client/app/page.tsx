"use client";
import GirlIcon from "@/public/icons/GirlIcon";
import { useEffect, useState } from "react";
import BetForm from "./components/BetForm";
import ListView from "./components/ListView";
import NavBar from "./components/NavBar";
import { getBetsList } from "./services/bettingService";
import { ErrorResponse } from "./utils/constants";
import { getUserName } from "./utils/utils";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  // Higher Order Component (HOC)
  // Checks if able to fetch list for authentication purposes
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
      {userName ? (
        <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">
          <div className="hidden lg:flex sticky top-40 lg:top-4 w-full lg:w-1/3 h-fit self-center lg:self-start justify-center items-center border rounded bg-secondary p-4 lg:p-6">
            <BetForm />
          </div>
          <ListView />
        </div>
      ) : (
        <div className="lg:h-96 lg:w-96 mx-auto flex flex-col justify-center items-center  gap-8 border-2 animate-pulse-box mt-8 p-2">
          <GirlIcon className="text-primary_dark animate-pulse-custom" />
          <h1 className="text-5xl lg:text-6xl font-bold text-background whitespace-nowrap animate-pulse-text">
            WELCOME TO BETSY!
          </h1>
        </div>
      )}
    </>
  );
};

export default HomePage;
