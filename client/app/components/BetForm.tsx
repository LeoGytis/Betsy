"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBalance } from "../hooks/useBalance";
import { placeBet } from "../services/bettingService";
import { ErrorResponse } from "../utils/constants";

interface BetFormProps {
  amount: number;
}

const BetForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { setBalance } = useBalance();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BetFormProps>({});

  const onSubmit = ({ amount }: BetFormProps) => {
    setLoading(true);
    setMessage("");
    placeBet(amount)
      .then((res) => {
        setMessage(`You have made a bet of €${amount}`);
        if (res.balance) {
          setBalance(res.balance);
        }
      })
      .catch((error: ErrorResponse) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full lg:w-1/3 sticky top-0 lg:top-4 h-fit flex self-center lg:self-start justify-center items-center border rounded bg-secondary p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 justify-center items-center"
      >
        <h2 className="text-center text-xl font-sembold text-primary">
          Place your bet
        </h2>

        <input
          id="amount"
          type="number"
          className="w-1/2 px-4 py-2 text-center border border-gray-300 rounded"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Minimum bet is 1" },
          })}
        />

        <button
          type="submit"
          className="w-1/2 bg-primary border rounded hover:bg-transparent hover:text-primary px-4 py-2"
          disabled={loading}
        >
          BET
        </button>

        <div className="text-sm text-center text-red-500">
          {errors.amount && <p>{errors.amount.message} </p>}
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default BetForm;
