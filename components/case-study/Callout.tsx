import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { cropStyle } from "@/lib/image-crop";

const WINDOW_IMAGE = { width: 1440, height: 837 };

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
  const { scale, width, left, top } = cropStyle({ backgroundSize, backgroundPosition, aspectRatio }, WINDOW_IMAGE);
  return (
    <div className={cn("callout", className)} aria-hidden="true" style={style}>
      <div className="crop" style={{ aspectRatio }}>
        <Image
          src={src}
          alt=""
          width={WINDOW_IMAGE.width}
          height={WINDOW_IMAGE.height}
          sizes={`(min-width: 768px) ${Math.round(scale * 40)}vw, ${Math.round(scale * 90)}vw`}
          style={{ width, left, top }}
        />
      </div>
    </div>
  );
}
