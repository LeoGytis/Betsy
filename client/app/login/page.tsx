"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBalance } from "../hooks/useBalance";
import { loginUser } from "../services/authService";
import { UserLoginProps } from "../utils/constants";
import { loginSchema } from "../utils/validationSchemas";

const Login = () => {
  const router = useRouter();
  const { setBalance } = useBalance();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (formData: UserLoginProps) => {
    setLoading(true);
    setMessage("");
    loginUser(formData)
      .then((res) => {
        console.log("🔥 :: res ::", res);
        if (res.balance) {
          console.log("🔥 :: res.balance ::", res.balance);
          setBalance(res.balance);
        }
        setMessage("Welcome to Betsy!");
        router.push("/");
      })
      .catch((error: { message: string }) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center border border-violet-500 rounded p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm text-black"
      >
        <h2 className="text-center text-xl font-bold mb-4">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-violet-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
