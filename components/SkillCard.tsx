import type { ReactNode } from "react";
import { Card } from "./Card";

interface SkillCardProps {
  title: string;
  description?: string;
  delay?: number;
  icon?: ReactNode;
}

export function SkillCard({ title, description, delay = 0, icon }: SkillCardProps) {
  return (
    <div className="opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <Card scale>
        <div className="flex items-center space-x-4">
          <div className="w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center text-gray-900 dark:text-white">
            {icon ?? <div className="w-2 h-2 bg-primary rounded-full" />}
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
      </Card>
    </div>
  );
}
