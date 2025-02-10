"use client";
import { useRouter } from "next/navigation";
import { GiRollingDices } from "react-icons/gi";
import { useBalance } from "../hooks/useBalance";
import { formatAmount } from "../utils/utils";
import ThemeSwitch from "./ThemeSwitch";
interface NavBarProps {
  userName?: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const router = useRouter();
  const { balance } = useBalance();

  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-center gap-2 text-primary font-medium border rounded bg-secondary p-4">
      <div className="flex items-center">
        <GiRollingDices className="w-16 h-16" />
        <span className="text-3xl">Betsy</span>
      </div>
      <div>{formatAmount(balance)}</div>
      {!userName ? (
        <div className="flex gap-2 text-lg text-primary">
          <button
            className="border rounded hover:text-foreground hover:bg-primary px-3 py-1"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className="border rounded hover:text-foreground hover:bg-primary px-3 py-1"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      ) : (
        <span className="text-2xl font-medium">{userName}</span>
      )}
      <ThemeSwitch />
    </div>
  );
};

export default NavBar;
