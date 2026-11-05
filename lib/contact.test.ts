import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./contact";

const input = { name: "A", email: "a@b.co", message: "m", topic: "workflow" as const };
const respond = (status: number, message: string) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message }), { status })));

describe("submitContact", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns the server's reply on success", async () => {
    respond(200, "sent");
    await expect(submitContact(input)).resolves.toEqual({ message: "sent" });
  });

  it("shows validation messages, which are written for visitors", async () => {
    respond(400, "Name is required");
    await expect(submitContact(input)).rejects.toThrow("Name is required");
  });

  it.each([500, 502])("hides server detail on a %i and offers email", async (status) => {
    respond(status, "Server configuration error: missing API key");
    await expect(submitContact(input)).rejects.toThrow(/contact@ostromecki\.dev/);
    await expect(submitContact(input)).rejects.not.toThrow(/API key/);
  });

  it("offers email when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(submitContact(input)).rejects.toThrow(/contact@ostromecki\.dev/);
  });
});
