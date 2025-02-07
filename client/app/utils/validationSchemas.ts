import { z } from "zod";

// Define your Zod validation schema
export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["passwordConfirmation"],
    message: "Passwords must match.",
  });

// type RegisterFormData = z.infer<typeof registerSchema>; // check this for future knowledge possible to tu as type
