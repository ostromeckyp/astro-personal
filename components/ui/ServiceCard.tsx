import Link from "next/link";
import { cn } from "@/lib/cn";

export function ServiceCard({
  n,
  meta,
  title,
  body,
  href,
  featured = false,
}: {
  n: string;
  meta: string;
  title: string;
  body: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col lg:min-h-[340px] gap-[22px] rounded-card border bg-ink-900 p-7 text-ink-0 transition-colors hover:border-sakura-500 md:p-9",
        featured ? "border-sakura-500" : "border-ink-700",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-[80px] leading-[0.8] font-light tracking-[-0.06em]">{n}</span>
        <span className={cn("font-mono text-[11px] tracking-[0.04em] uppercase", featured ? "text-sakura-500" : "text-ink-400")}>
          {meta}
        </span>
      </div>
      <span className="text-[26px] leading-[1.15] font-semibold tracking-[-0.025em]">{title}</span>
      <span className="text-base leading-[1.6] text-ink-400">{body}</span>
    </Link>
  );
}
