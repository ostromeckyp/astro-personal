/** How long each step stays up before the next one, when steps advance on their own. */
export const STEP_MS = 6000;

export function nextStep(index: number, count: number): number {
  return (index + 1) % count;
}

/** The step a key moves to, or null for keys the steps don't handle. */
export function stepForKey(key: string, index: number, count: number): number | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return nextStep(index, count);
    case "ArrowLeft":
    case "ArrowUp":
      return (index - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

/** Steps advance on their own only while seen on a wide screen, before anyone touches them, and with motion allowed. */
export function autoAdvanceAllowed(s: { inView: boolean; paused: boolean; interacted: boolean; reducedMotion: boolean; wide: boolean }): boolean {
  return s.inView && s.wide && !s.paused && !s.interacted && !s.reducedMotion;
}
