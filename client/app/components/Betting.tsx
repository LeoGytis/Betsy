"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { placeBet } from "../services/bettingService";
import { loginSchema } from "../utils/validationSchemas";

interface BettingFormData {
  bet: number;
  password: string;
}

const Betting = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<BettingFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (formData: BettingFormData) => {
    setLoading(true);
    setMessage("");
    placeBet(formData)
      .then(() => {
        setMessage("Welcome to Betsy!");
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
        <h2 className="text-center text-xl font-bold mb-4 text-white">
          Place your bet
        </h2>

        <div className="mb-4">
          <input
            id="bet"
            type="bet"
            placeholder="Enter your bet"
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
            Bet
          </button>
        </div>

        {/* Error or Success Message */}
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Betting;
