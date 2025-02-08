"use client";
import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useUser";

const NavBar: React.FC = () => {
  const router = useRouter();
  // const { balance } = useBalance();
  const { userData } = useUser();
  console.log("🔥 :: userData ::", userData);

  return (
    <div className="flex justify-between items-center border border-violet-500 rounded p-4">
      <div>LOGO</div>
      {/* <div className="text-white">Your balance: {balance}</div> */}
      <div className="text-white">userData balance: {userData?.balance}</div>
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
