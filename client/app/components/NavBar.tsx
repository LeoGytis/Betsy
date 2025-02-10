"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBalance } from "../hooks/useBalance";
import ThemeSwitch from "./ThemeSwitch";

interface NavBarProps {
  userName?: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const router = useRouter();
  const { balance } = useBalance();

  return (
    <div className="flex justify-between items-center text-2xl font-medium text-violet-500 border border-violet-800 rounded p-4">
      <div className="relative w-12 h-12">
        <Image src="/bet_logo.png" alt="logo" fill objectFit="cover" />
      </div>
      <div>€{balance}</div>
      {!userName ? (
        <div className="flex gap-2">
          <button
            className="border border-violet-500 rounded hover:border-violet-800 hover:text-violet-800 px-4 py-2"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className="border border-violet-500 rounded hover:border-violet-800 hover:text-violet-800 px-4 py-2"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      ) : (
        <div className="relative self-end">
          <ThemeSwitch />
          <span className="text-2xl font-medium">{userName}</span>
        </div>
      )}
    </div>
  );
};

export default NavBar;
