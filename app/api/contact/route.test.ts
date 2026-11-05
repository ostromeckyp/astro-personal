import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST } from "./route";

const valid = { name: "Ann", email: "ann@example.com", message: "Hello", topic: "workflow" };

const post = (body: unknown) =>
  POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));

const sentHtml = () => send.mock.calls[0][0].html as string;

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    send.mockReset();
    send.mockResolvedValue({ data: { id: "1" }, error: null });
  });

  afterEach(() => vi.unstubAllEnvs());

  it("sends the topic label in the email", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(sentHtml()).toContain("AI workflow");
  });

  it("includes the company when given", async () => {
    await post({ ...valid, company: "Acme" });
    expect(sentHtml()).toContain("Acme");
  });

  it("escapes script-like company input", async () => {
    await post({ ...valid, company: "<script>x</script>" });
    expect(sentHtml()).toContain("&lt;script&gt;");
    expect(sentHtml()).not.toContain("<script>");
  });

  it("does not send when the honeypot is filled", async () => {
    const res = await post({ ...valid, website: "filled" });
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects an unknown topic", async () => {
    const res = await post({ ...valid, topic: "spam" });
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 500 without an API key", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await post(valid);
    expect(res.status).toBe(500);
  });

  it("returns 502 with the provider's message when sending fails", async () => {
    send.mockResolvedValue({ data: null, error: { message: "boom" } });
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ message: "boom" });
  });
});
