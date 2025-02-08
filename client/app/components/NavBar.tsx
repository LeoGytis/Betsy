"use client";
import { useRouter } from "next/navigation";
import { useBalance } from "../hooks/useBalance";

const NavBar: React.FC = () => {
  const router = useRouter();
  const { balance } = useBalance();

  return (
    <div className="flex justify-between items-center border border-violet-500 rounded p-4">
      <div>LOGO</div>
      <div className="text-white"> Balance:{balance}</div>
      <div>
        <button
          className="p-4 border border-violet-800 mx-2"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button
          className="p-4 border border-violet-800"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default NavBar;
