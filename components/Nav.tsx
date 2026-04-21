"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

export function Nav() {
  const pathname = usePathname();
  const current = normalizePath(pathname ?? "/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center text-xl font-bold text-gray-800 dark:text-white hover:text-primary transition-colors duration-300"
            >
              ostromecki.dev
            </Link>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((l) => {
              const active = normalizePath(l.href) === current;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  className="nav-link"
                >
                  {l.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>
          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-transform duration-300",
                    open && "translate-y-[0.625rem] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-opacity duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-transform duration-300",
                    open && "-translate-y-[0.625rem] -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        hidden={!open}
        className={cn(
          "fixed inset-0 bg-white dark:bg-gray-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
              ostromecki.dev
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            {links.map((l) => {
              const active = normalizePath(l.href) === current;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-lg text-gray-600 dark:text-gray-300 hover:text-primary",
                    active && "text-primary",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
