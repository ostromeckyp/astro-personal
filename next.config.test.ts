import { expect, it } from "vitest";
import config from "./next.config";

it("sends the removed approach page to the home section", async () => {
  const rules = await config.redirects!();
  expect(rules).toContainEqual({ source: "/approach", destination: "/#how-i-work", permanent: true });
  expect(rules).toContainEqual({ source: "/pl/approach", destination: "/pl#how-i-work", permanent: true });
});
