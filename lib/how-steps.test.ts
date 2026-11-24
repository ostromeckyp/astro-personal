import { describe, expect, it } from "vitest";
import { autoAdvanceAllowed, nextStep, stepForKey } from "./how-steps";

const ok = { inView: true, paused: false, interacted: false, reducedMotion: false, wide: true };

describe("how steps", () => {
  it("advances and wraps", () => {
    expect(nextStep(0, 4)).toBe(1);
    expect(nextStep(3, 4)).toBe(0);
  });

  it("moves with arrow keys, Home and End", () => {
    expect(stepForKey("ArrowRight", 3, 4)).toBe(0);
    expect(stepForKey("ArrowLeft", 0, 4)).toBe(3);
    expect(stepForKey("ArrowDown", 1, 4)).toBe(2);
    expect(stepForKey("Home", 2, 4)).toBe(0);
    expect(stepForKey("End", 0, 4)).toBe(3);
    expect(stepForKey("Enter", 1, 4)).toBeNull();
  });

  it("auto-advances only on a wide screen, in view, untouched, with motion allowed", () => {
    expect(autoAdvanceAllowed(ok)).toBe(true);
    for (const k of ["paused", "interacted", "reducedMotion"] as const) expect(autoAdvanceAllowed({ ...ok, [k]: true }), k).toBe(false);
    for (const k of ["inView", "wide"] as const) expect(autoAdvanceAllowed({ ...ok, [k]: false }), k).toBe(false);
  });
});
