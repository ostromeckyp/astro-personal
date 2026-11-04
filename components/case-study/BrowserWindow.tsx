import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

const TILT = {
  left: "perspective(2400px) rotateY(-8deg) rotateX(2deg)",
  right: "perspective(2400px) rotateY(8deg) rotateX(2deg)",
};

export function BrowserWindow({
  title,
  src,
  alt,
  tilt,
  style,
  className,
  priority,
}: {
  title: string;
  src: string;
  alt: string;
  tilt?: "left" | "right";
  style?: CSSProperties;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("swin", className)} style={{ ...style, transform: tilt ? TILT[tilt] : undefined }}>
      <div className="bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <Image src={src} alt={alt} width={1440} height={837} priority={priority} sizes="(min-width: 768px) 900px, 100vw" />
    </div>
  );
}
