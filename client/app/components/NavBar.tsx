"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser } from "../utils/utils";

const NavBar: React.FC = () => {
  const router = useRouter();
  const user = getAuthenticatedUser();

  return (
    <div className="flex justify-between items-center text-violet-500 border border-violet-800 rounded p-4">
      <div className="relative w-12 h-12">
        <Image src="/bet_logo.png" alt="logo" fill objectFit="cover" />
      </div>
      {!user ? (
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
        <span className="text-2xl text-violet-800 font-medium">{user}</span>
      )}
    </div>
  );
};

export default NavBar;
