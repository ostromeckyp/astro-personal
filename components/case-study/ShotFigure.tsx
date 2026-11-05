import type { CSSProperties } from "react";
import { BrowserWindow } from "@/components/case-study/BrowserWindow";
import { Callout } from "@/components/case-study/Callout";
import { Stage } from "@/components/case-study/Stage";

export type Shot = {
  n: string;
  src: string;
  url: string;
  tilt: "left" | "right";
  crop: { backgroundSize: string; backgroundPosition: string; aspectRatio: string };
  cropPosition: CSSProperties;
  alt: string;
  t: string;
  d: string;
};

export function ShotFigure({ shot }: { shot: Shot }) {
  return (
    <figure className="flex min-w-0 flex-col gap-4">
      <Stage aspect="4 / 3">
        <BrowserWindow title={shot.url} src={shot.src} alt={shot.alt} tilt={shot.tilt} style={{ left: "7%", top: "9%", width: "86%" }} sizes="(min-width: 1248px) 520px, (min-width: 768px) 43vw, 100vw" />
        <Callout src={shot.src} {...shot.crop} style={shot.cropPosition} />
      </Stage>
      <figcaption className="flex flex-col gap-1.5">
        <span className="font-mono text-xs text-sakura-500">{shot.n}</span>
        <span className="text-lg font-medium tracking-[-0.01em]">{shot.t}</span>
        <span className="text-[15px] leading-[1.55] text-ink-400">{shot.d}</span>
      </figcaption>
    </figure>
  );
}
