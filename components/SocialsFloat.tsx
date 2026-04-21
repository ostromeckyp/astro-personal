"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/ostromeckyp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.397.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/ostromeckyp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ostromeckyp/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.94 0-1.62.68-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.99 3.38 4.43z" />
      </svg>
    ),
  },
];

export function SocialsFloat() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <>
      {/* Desktop / tablet: vertical sidebar */}
      <div className="hidden sm:flex fixed bottom-24 left-5 z-10 flex-col space-y-2">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit my ${s.name} profile`}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center w-12 h-12"
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Mobile: FAB */}
      <div ref={rootRef} className="sm:hidden fixed bottom-5 right-5 z-20">
        <div className="relative">
          <div
            className={cn(
              "absolute bottom-16 right-0 flex flex-col items-end gap-3 transition-opacity duration-200",
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
            )}
          >
            {socials.map((s, idx) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${s.name} profile`}
                className={cn(
                  "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all duration-200",
                  open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0",
                )}
                style={{ transitionDelay: `${50 + idx * 40}ms` }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close social links" : "Open social links"}
            onClick={() => setOpen((o) => !o)}
            className="bg-primary text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.286 6.7a1 1 0 011.414-1.414L12 10.586l5.3-5.3a1 1 0 111.414 1.414l-5.3 5.3 5.3 5.3a1 1 0 11-1.414 1.414L12 13.414l-5.3 5.3A1 1 0 115.286 17.3l5.3-5.3-5.3-5.3z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 4.5a1 1 0 011 1V11h5.5a1 1 0 110 2H13v5.5a1 1 0 11-2 0V13H5.5a1 1 0 110-2H11V5.5a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
