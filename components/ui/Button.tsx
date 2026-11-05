import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternalUrl, NEW_TAB } from "@/lib/external-link";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const isPlainAnchor = (href: string) => /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf");

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full whitespace-nowrap transition-colors",
    size === "md" ? "h-12 px-6 text-[15px]" : "h-[52px] px-7 text-base",
    variant === "primary"
      ? "bg-sakura-500 font-semibold text-ink-950 hover:bg-sakura-300 disabled:opacity-60"
      : "border border-ink-500 font-medium text-ink-0 hover:border-ink-400",
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  if (href === undefined) {
    return (
      <button type={type} className={classes} {...rest}>
        {content}
      </button>
    );
  }
  if (isPlainAnchor(href)) {
    return (
      <a href={href} className={classes} {...(isExternalUrl(href) ? NEW_TAB : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
