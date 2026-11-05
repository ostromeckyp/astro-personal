import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** Enlarged crop of a screenshot. Decorative: the window beside it has the alt text. */
export function Callout({
  src,
  backgroundSize,
  backgroundPosition,
  aspectRatio,
  style,
  className,
}: {
  src: string;
  backgroundSize: string;
  backgroundPosition: string;
  aspectRatio: string;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <div className={cn("callout", className)} aria-hidden="true" style={style}>
      <div className="crop" style={{ backgroundImage: `url(${src})`, backgroundSize, backgroundPosition, aspectRatio }} />
    </div>
  );
}
