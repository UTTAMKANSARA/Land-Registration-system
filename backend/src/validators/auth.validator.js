import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(150),

  email: z.string().email(),

  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

  aadhaar: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}$/, "Invalid Aadhaar number"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
