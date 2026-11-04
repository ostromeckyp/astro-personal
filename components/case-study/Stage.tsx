import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The dark frame behind a screenshot. `aspect` applies from `md` up; below that, height follows content. */
export function Stage({ aspect, className, children }: { aspect: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("stage", className)} style={{ "--stage-aspect": aspect } as CSSProperties}>
      {children}
    </div>
  );
}

/** Headline set inside a stage. Hidden on phones, where the caption carries the message. */
export function StageHeading({ kicker, title, style }: { kicker: string; title: string; style: CSSProperties }) {
  return (
    <div className="stage-h" style={style}>
      <span className="k">{kicker}</span>
      <span className="t">{title}</span>
    </div>
  );
}

/** Floating status pill inside a stage. Hidden on phones. */
export function StagePill({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div className="spill" style={style}>
      <b />
      {children}
    </div>
  );
}
