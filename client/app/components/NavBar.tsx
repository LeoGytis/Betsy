"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../services/authService";

const NavBar: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    loginUser("user@example.com", "password")
      .then((res) => {
        alert(res.message);
      })
      .catch((error: { message: string }) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
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
          onClick={() => router.push("/register")}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
