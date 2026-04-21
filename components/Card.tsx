import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  scale?: boolean;
}

export function Card({ children, className, hover = true, scale = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-dark-card rounded-xl shadow-md dark:shadow-gray-900/10 p-6",
        hover && "hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow duration-300",
        scale && "hover:scale-105 transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
