import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-tag border border-ink-600 px-2.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.04em] text-ink-200 uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
