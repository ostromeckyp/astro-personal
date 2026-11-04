import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const ok = { name: "A", email: "a@b.co", message: "m", topic: "workflow" };

describe("contactSchema", () => {
  it("accepts a valid message without a company", () => {
    expect(contactSchema.safeParse(ok).success).toBe(true);
  });

  it("rejects an unknown topic", () => {
    expect(contactSchema.safeParse({ ...ok, topic: "spam" }).success).toBe(false);
  });

  it("requires a topic", () => {
    expect(contactSchema.safeParse({ name: "A", email: "a@b.co", message: "m" }).success).toBe(false);
  });

  it("rejects an overlong company", () => {
    expect(contactSchema.safeParse({ ...ok, company: "x".repeat(201) }).success).toBe(false);
  });
});
