"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { COMMON as EN } from "@/content/site/nav";
import { COMMON as PL } from "@/content/site/pl/nav";

export default function NotFound() {
  const { lang } = useParams<{ lang?: string }>();
  const copy = lang === "pl" ? PL : EN;
  return (
    <div className="site-container flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
      <title>{copy.notFoundTitle}</title>
      <span className="font-mono text-[13px] text-sakura-500">404</span>
      <h1 className="text-[clamp(48px,6vw,88px)] leading-[0.95] font-semibold tracking-[-0.045em]">{copy.notFoundHeading}</h1>
      <p className="max-w-[560px] text-lg leading-[1.6] text-ink-400">{copy.notFoundBody}</p>
      <Button href="/" size="lg">
        {copy.notFoundCta}
      </Button>
    </div>
  );
}
