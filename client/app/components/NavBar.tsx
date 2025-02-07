"use client";

import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const NavBar: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    loginUser("user@example.com", "password")
      .then((res) => {
        alert(res.message); // Handle successful login
      })
      .catch((error: { message: string }) => {
        alert(error.message); // Handle login error
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  const handleRegister = () => {
    setLoading(true);
    registerUser("newuser@example.com", "password")
      .then((res) => {
        alert(res.message); // Handle successful registration
      })
      .catch((error: { message: string }) => {
        alert(error.message); // Handle registration error
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div className="flex justify-between items-center border border-violet-500 rounded p-4">
      <div>LOGO</div>
      <div>
        <button
          className="p-4 border border-violet-800 mx-2"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          className="p-4 border border-violet-800"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
