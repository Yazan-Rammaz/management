import { z } from "zod";

/**
 * Validation schemas are shared by the client form and the server action — one
 * definition, validated on both sides. This is the project's single validation
 * pattern: every feature exports its zod schemas here and reuses them.
 */
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Registration is IDENTICAL for every role. The backend assigns/approves the
 * role — the form never picks it. Keep these fields in lockstep with the NestJS
 * `register` DTO.
 */
export const registerSchema = z
  .object({
    name: z.string().min(2, "Too short").max(80),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(6, "Enter a valid phone").max(20),
    countryCode: z
      .string()
      .length(2, "Use a 2-letter country code")
      .transform((v) => v.toUpperCase()),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(128)
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;
