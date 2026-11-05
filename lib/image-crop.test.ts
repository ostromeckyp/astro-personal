import { describe, expect, it } from "vitest";
import { cropStyle } from "./image-crop";

const IMAGE = { width: 1440, height: 837 };

describe("cropStyle", () => {
  it("matches background-position at the far corner", () => {
    const s = cropStyle({ backgroundSize: "200% auto", backgroundPosition: "100% 100%", aspectRatio: "2/1" }, IMAGE);
    expect(s.width).toBe("200%");
    expect(s.left).toBe("-100%");
    // Image height is 200% * 837/1440 of box width, so 232.5% of a box half as tall.
    expect(parseFloat(s.top)).toBeCloseTo(-132.5, 1);
  });

  it("stays at the origin at 0% 0%", () => {
    const s = cropStyle({ backgroundSize: "300% auto", backgroundPosition: "0% 0%", aspectRatio: "1/1" }, IMAGE);
    expect(parseFloat(s.left)).toBeCloseTo(0);
    expect(parseFloat(s.top)).toBeCloseTo(0);
  });

  it("reports the magnification", () => {
    expect(cropStyle({ backgroundSize: "455.70% auto", backgroundPosition: "0% 0%", aspectRatio: "1/1" }, IMAGE).scale).toBeCloseTo(4.557);
  });
});
