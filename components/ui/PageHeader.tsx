import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Two-column page header. `className` sets the bottom padding, which differs per board. */
export function PageHeader({
  label,
  title,
  intro,
  className,
}: {
  label: string;
  title: ReactNode;
  intro: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-end gap-12 pt-20 pb-20 md:pt-28",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <span className="font-mono text-[13px] text-sakura-500">{label}</span>
        <h1 className="text-[clamp(48px,6vw,88px)] leading-[0.95] font-semibold tracking-[-0.045em]">{title}</h1>
      </div>
      <p className="text-lg leading-[1.6] text-ink-400">{intro}</p>
    </header>
  );
}
