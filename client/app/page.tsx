"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BetForm from "./components/BetForm";
import ListView from "./components/ListView";
import NavBar from "./components/NavBar";
import { getBetsList } from "./services/bettingService";
import { ErrorResponse } from "./utils/constants";
import { getUserName } from "./utils/utils";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

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
          <BetForm />
          <ListView />
        </div>
      ) : (
        <div className="realtive lg:h-96 lg:w-96 mx-auto flex flex-col gap-8 justify-center items-center border-2 mt-8 p-2">
          <Image
            src="/betsy.svg"
            alt="betsy_image"
            width={500}
            height={500}
            layout="intrinsic"
          />
          <h1 className="text-3xl lg:text-6xl font-bold text-primary whitespace-nowrap">
            WELCOME TO BETSY!
          </h1>
        </div>
      )}
    </>
  );
};

export default HomePage;
