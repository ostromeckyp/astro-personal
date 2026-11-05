import { z } from "zod";

export const CONTACT_TOPICS = [
  { value: "workflow", label: "AI workflow" },
  { value: "case", label: "AI business case" },
  { value: "eng", label: "Engineering" },
  { value: "talk", label: "Talk / workshop" },
] as const;

export type ContactErrors = { name: string; nameLong: string; email: string; company: string; message: string; messageLong: string };

const EN_ERRORS: ContactErrors = {
  name: "Name is required",
  nameLong: "Name is too long",
  email: "Please provide a valid email address",
  company: "Company name is too long",
  message: "Message cannot be empty",
  messageLong: "Message is too long (max 5000 characters)",
};

export const createContactSchema = (errors: ContactErrors) =>
  z.object({
    topic: z.enum(["workflow", "case", "eng", "talk"], { message: "Please choose a topic" }),
    name: z.string().trim().min(1, errors.name).max(100, errors.nameLong),
    email: z.string().trim().email(errors.email).max(200),
    company: z.string().trim().max(200, errors.company).optional(),
    message: z.string().trim().min(1, errors.message).max(5000, errors.messageLong),
    /** Honeypot: must be empty. Real users never see or fill it. */
    website: z.string().max(0).optional().or(z.literal("")),
  });

export const contactSchema = createContactSchema(EN_ERRORS);

export type ContactInput = z.infer<typeof contactSchema>;
