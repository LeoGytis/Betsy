"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { placeBet } from "../services/bettingService";

interface BettingFormData {
  amount: number;
}

const Betting = () => {
  // const { setBalance } = useBalance();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BettingFormData>({});

  const onSubmit = (formData: BettingFormData) => {
    setLoading(true);
    setMessage("");
    placeBet(formData.amount)
      .then((res) => {
        setMessage(`You have made a bet of €${formData.amount}`);
        // if (res.balance) {
        //   setBalance(res.balance);
        // }
      })
      .catch((error: { message: string }) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-1/3 flex justify-center items-center border border-violet-500 rounded p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm text-black"
      >
        <h2 className="text-center text-xl font-bold mb-4 text-white">
          Place your bet
        </h2>

        <div className="mb-4">
          <input
            id="amount"
            type="number"
            placeholder="Enter your bet"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Minimum bet is 1" },
            })}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs">{errors.amount.message}</p>
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
