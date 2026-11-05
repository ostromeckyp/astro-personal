import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { BrowserWindow } from "@/components/case-study/BrowserWindow";
import { Callout } from "@/components/case-study/Callout";
import { CaseIntro } from "@/components/case-study/CaseIntro";
import { ShotFigure } from "@/components/case-study/ShotFigure";
import { Stage, StageHeading, StagePill } from "@/components/case-study/Stage";
import { Button } from "@/components/ui/Button";
import { SALON_CASE as C } from "@/content/site/salon-case";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Agentic replenishment for a salon network",
  description: C.lede,
  openGraph: { images: ["/images/use-cases/salon-cover.jpg"] },
};

export default function SalonCasePage() {
  const { hero, procedures, pwa } = C;
  return (
    <div className="relative overflow-x-clip">
      <div aria-hidden="true" className="absolute top-20 left-[-200px] h-px w-[2000px] origin-top-left rotate-9 bg-ink-0/8" />
      <div className="site-container flex flex-col gap-24 pt-20 pb-24 md:pt-24">
        <CaseIntro slug="salon-replenishment" index="01" label={C.label} title={C.title} lede={C.lede} stack={C.stack} story={C.story} />

        <figure className="relative flex flex-col gap-5">
          <ViewTransition name="use-case-image-salon-replenishment">
            <Stage aspect="16 / 9">
              <StageHeading kicker={hero.kicker} title={hero.heading} style={{ left: "5%", bottom: "10%", width: "30%" }} />
              <BrowserWindow title={hero.url} src={hero.src} alt={hero.alt} tilt="left" priority style={{ left: "37%", top: "12%", width: "59%" }} />
              <Callout src={hero.src} {...hero.crop} style={{ right: "3%", top: "40%", width: "27%" }} />
              <StagePill style={{ left: "38%", top: "4%" }}>{hero.pill}</StagePill>
            </Stage>
          </ViewTransition>
          <figcaption className="grid max-w-[900px] grid-cols-[64px_minmax(0,1fr)] gap-4 sm:grid-cols-[96px_minmax(0,1fr)]">
            <span className="font-mono text-xs text-sakura-500">{hero.n}</span>
            <span className="text-[15px] leading-[1.55] text-ink-400">
              <span className="text-ink-0">{hero.captionLead}</span> {hero.caption}
            </span>
          </figcaption>
        </figure>

        <section className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
          {C.shots.map((s) => (
            <ShotFigure key={s.n} shot={s} />
          ))}
        </section>

        <figure className="grid grid-cols-1 items-start gap-x-6 gap-y-8 lg:grid-cols-12">
          <figcaption className="flex flex-col gap-5 pt-2 lg:col-span-4">
            <span className="font-mono text-xs text-sakura-500">{procedures.n}</span>
            <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{procedures.heading}</h2>
            <p className="text-base leading-[1.6] text-ink-400">{procedures.body}</p>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-0.5 w-8 bg-sakura-500" />
              <span className="text-sm text-ink-200">{procedures.note}</span>
            </div>
          </figcaption>
          <Stage aspect="16 / 11" className="lg:col-span-8">
            <BrowserWindow title={procedures.url} src={procedures.src} alt={procedures.alt} tilt="right" style={{ left: "6%", top: "8%", width: "88%" }} />
            <Callout src={procedures.src} {...procedures.crop} style={{ right: "3%", bottom: "6%", width: "46%" }} />
          </Stage>
        </figure>

        <section className="relative flex flex-col gap-10">
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 border-t border-ink-600 pt-12 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-7">
              <span className="font-mono text-xs text-sakura-500">{pwa.n}</span>
              <h2 className="text-[clamp(36px,3.4vw,48px)] leading-[1.02] font-semibold tracking-[-0.04em]">{pwa.heading}</h2>
              <p className="max-w-[600px] text-base leading-[1.6] text-ink-400">{pwa.body}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:pt-9">
              <div className="flex flex-col gap-2 rounded-xl border border-ink-600 p-5">
                <span className="font-mono text-[11px] tracking-[0.04em] text-sakura-500 uppercase">{pwa.builtLabel}</span>
                <span className="text-[15px] leading-[1.5] text-ink-200">{pwa.built}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-ink-600 p-5">
                <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{pwa.skippedLabel}</span>
                <span className="text-[15px] leading-[1.5] text-ink-400">{pwa.skipped}</span>
              </div>
            </div>
          </div>

          <Stage aspect="1200 / 700">
            <div className="phone-row">
              {pwa.phones.map((p) => (
                <div key={p.n} className={cn("phone", p.tilt)}>
                  <div className="phone-screen">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={390}
                      height={p.height}
                      sizes="(min-width: 768px) 320px, 240px"
                      style={{ "--offset": p.offset } as CSSProperties}
                    />
                    <div aria-hidden="true" className="phone-notch" />
                  </div>
                </div>
              ))}
            </div>
            <StagePill style={{ right: "4%", top: "24px" }}>{pwa.pill}</StagePill>
          </Stage>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pwa.phones.map((p) => (
              <div key={p.n} className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-sakura-500">{p.n}</span>
                <span className="text-base font-medium tracking-[-0.01em]">{p.t}</span>
                <span className="text-sm leading-[1.5] text-ink-400">{p.d}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4 rounded-xl border border-ink-600 bg-ink-900 px-6 py-5">
              <span aria-hidden="true" className="size-9 shrink-0 rounded-[10px] bg-sakura-500" />
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex justify-between gap-3">
                  <span className="text-sm font-semibold">{pwa.push.app}</span>
                  <span className="font-mono text-[11px] text-ink-400">{pwa.push.when}</span>
                </div>
                <span className="text-sm leading-[1.45] text-ink-200">{pwa.push.text}</span>
              </div>
            </div>
            <span className="max-w-[520px] text-sm leading-[1.55] text-ink-400 md:col-span-2">{pwa.push.caption}</span>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink-600 pt-12">
          <span className="text-[13px] text-ink-400">{C.footnote}</span>
          <Button href="/contact" size="lg">
            {C.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
