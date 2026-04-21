import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(200),
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(5000, "Message is too long (max 5000 characters)"),
  /** Honeypot — must be empty. Real users never see or fill it. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
