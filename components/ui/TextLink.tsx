import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function TextLink({
  href,
  tone = "accent",
  className,
  children,
}: {
  href: string;
  tone?: "accent" | "muted";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block pb-[3px] text-[15px] text-ink-0 transition-colors hover:border-sakura-300",
        tone === "accent" ? "border-b-2 border-sakura-500" : "border-b border-ink-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}
