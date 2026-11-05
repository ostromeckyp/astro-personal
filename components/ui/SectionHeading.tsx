import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  index,
  title,
  action,
  className,
}: {
  index?: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("reveal flex flex-wrap items-baseline justify-between gap-4", className)}>
      <div className="flex items-baseline gap-5">
        {index && <span className="font-mono text-[13px] text-sakura-500">{index}</span>}
        <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{title}</h2>
      </div>
      {action}
    </div>
  );
}
