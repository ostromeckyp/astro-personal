import { z } from "zod";

export const CONTACT_TOPICS = [
  { value: "workflow", label: "AI workflow" },
  { value: "case", label: "AI business case" },
  { value: "eng", label: "Engineering" },
  { value: "talk", label: "Talk / workshop" },
] as const;

export const contactSchema = z.object({
  topic: z.enum(["workflow", "case", "eng", "talk"], { message: "Please choose a topic" }),
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(200),
  company: z.string().trim().max(200, "Company name is too long").optional(),
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(5000, "Message is too long (max 5000 characters)"),
  /** Honeypot — must be empty. Real users never see or fill it. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
