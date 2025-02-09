import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginUserResponse } from "../services/authService";

// The context type for user data
interface UserContextType {
  userData: LoginUserResponse | null;
  setUser: (userData: LoginUserResponse) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<LoginUserResponse | null>(null);

  // Load user data from localStorage when the app starts
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData)); // Parse and set the data if it exists
    }
  }, []);

  // Set user data to localStorage whenever it changes
  const setUser = (data: LoginUserResponse) => {
    localStorage.setItem("userData", JSON.stringify(data)); // Save to localStorage
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
