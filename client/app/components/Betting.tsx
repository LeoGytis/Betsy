"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBalance } from "../hooks/useBalance";
import { placeBet } from "../services/bettingService";

interface BettingFormData {
  amount: number;
}

const Betting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { balance, setBalance } = useBalance();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BettingFormData>({});

  const onSubmit = ({ amount }: BettingFormData) => {
    setLoading(true);
    setMessage("");
    placeBet(amount)
      .then((res) => {
        setMessage(`You have made a bet of €${amount}`);
        if (res.balance) {
          setBalance(res.balance);
        }
      })
      .catch((error: { message: string }) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center border border-violet-800 rounded p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 justify-center items-center text-black"
      >
        <h1 className="text-white">BALNASS: {balance}</h1>
        <h2 className="text-center text-xl font-sembold text-violet-500">
          Place your bet
        </h2>

        <input
          id="amount"
          type="number"
          placeholder="Enter your bet"
          className="w-1/2 px-4 py-2 text-center border border-gray-300 rounded"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Minimum bet is 1" },
          })}
        />

        <button
          type="submit"
          className="w-1/2 px-4 py-2 bg-violet-800 text-white rounded"
          disabled={loading}
        >
          BET
        </button>

        <div className="text-sm text-center text-red-500">
          {errors.amount && <p>{errors.amount.message}</p>}
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default Betting;
