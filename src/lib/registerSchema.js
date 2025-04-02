import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" }) // Ensure the field is not empty
    .email({ message: "Invalid email format" }), // Validate email format
  password: z
    .string()
    .min(1, { message: "Password is required" }) // Ensure the field is not empty
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must include uppercase, lowercase, a number, and a special character",
      }
    ), // Enforce strong password rules
});