"use client";
import { useEffect, useState } from "react";
import BetForm from "./components/BetForm";
import NavBar from "./components/NavBar";
import Toggler from "./components/Toggler";
import { getUserName } from "./utils/utils";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-8 md:p-12 lg:p-20 lg:py-12">
      <NavBar userName={userName} />
      <div className="w-full flex gap-8 mt-6">
        {userName ? (
          <>
            <BetForm />
            <Toggler />
          </>
        ) : (
          <div>Welcome to Betsy!</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
