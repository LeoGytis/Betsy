"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { RegisterUserProps } from "../utils/constants";
import { registerSchema } from "../utils/validationSchemas";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProps>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (formData: RegisterUserProps) => {
    setLoading(true);
    setMessage("");
    registerUser(formData)
      .then(() => {
        setMessage("Successfully registered a new user.");
        // loginUser({ email: formData.email, password: formData.password });
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
        <h2 className="text-center text-xl font-bold mb-4">Register</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
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

        {/* Password Input */}
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

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-violet-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {/* Error or Success Message */}
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
