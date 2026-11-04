import type { Metadata } from "next";
import { BrowserWindow } from "@/components/case-study/BrowserWindow";
import { Callout } from "@/components/case-study/Callout";
import { CaseIntro } from "@/components/case-study/CaseIntro";
import { ShotFigure } from "@/components/case-study/ShotFigure";
import { Stage, StageHeading, StagePill } from "@/components/case-study/Stage";
import { Button } from "@/components/ui/Button";
import { FORMS_CASE as C } from "@/content/site/forms-case";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "No-code forms for a regulated industry",
  description: C.lede,
  openGraph: { images: ["/images/use-cases/forms-cover.jpg"] },
};

export default function FormsCasePage() {
  const { disclosure, hero, docs, mcp } = C;
  return (
    <div className="relative overflow-x-clip">
      <div aria-hidden="true" className="absolute top-16 left-[-40px] h-px w-[1700px] origin-top-left rotate-15 bg-ink-0/8" />
      <div aria-hidden="true" className="absolute top-40 left-[-40px] h-px w-[1700px] origin-top-left rotate-15 bg-ink-0/6" />
      <div className="site-container flex flex-col gap-24 pt-20 pb-24 md:pt-24">
        <CaseIntro index="02" label={C.label} title={C.title} lede={C.lede} stack={C.stack} story={C.story} />

        <aside
          aria-label={disclosure.ariaLabel}
          className="relative grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl border border-ink-600 bg-ink-900 px-6 py-7 md:grid-cols-[200px_minmax(0,1fr)] md:px-8"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] font-medium tracking-[0.04em] text-sakura-500 uppercase">{disclosure.label}</span>
            <span className="text-lg font-medium tracking-[-0.01em]">{disclosure.title}</span>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] leading-[1.6] text-ink-400">
            <p>
              <span className="text-ink-200">{disclosure.lead}</span> {disclosure.first}
            </p>
            <p>{disclosure.second}</p>
          </div>
        </aside>

        <figure className="relative flex flex-col gap-5">
          <Stage aspect="16 / 9">
            <StageHeading kicker={hero.kicker} title={hero.heading} style={{ left: "5%", top: "14%", width: "30%" }} />
            <BrowserWindow title={hero.url} src={hero.src} alt={hero.alt} tilt="left" priority style={{ left: "37%", top: "12%", width: "59%" }} />
            <Callout src={hero.src} {...hero.crop} style={{ left: "30%", bottom: "9%", width: "58%" }} />
            <StagePill style={{ right: "4%", bottom: "3%" }}>{hero.pill}</StagePill>
          </Stage>
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
            <span className="font-mono text-xs text-sakura-500">{docs.n}</span>
            <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{docs.heading}</h2>
            <p className="text-base leading-[1.6] text-ink-400">{docs.body}</p>
          </figcaption>
          <Stage aspect="16 / 11" className="lg:col-span-8">
            <BrowserWindow title={docs.url} src={docs.src} alt={docs.alt} tilt="right" style={{ left: "6%", top: "8%", width: "88%" }} />
            <Callout src={docs.src} {...docs.crop} style={{ left: "4%", bottom: "6%", width: "62%" }} />
          </Stage>
        </figure>

        <section className="flex flex-col gap-10 border-t border-ink-600 pt-12">
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-7">
              <span className="font-mono text-xs text-sakura-500">{mcp.label}</span>
              <h2 className="text-[clamp(36px,3.4vw,48px)] leading-[1.02] font-semibold tracking-[-0.04em]">{mcp.heading}</h2>
              <p className="max-w-[620px] text-base leading-[1.6] text-ink-400">{mcp.body}</p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5 lg:pt-9">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-sakura-500" />
                <span className="text-sm text-ink-200">{mcp.notes[0]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-ink-500" />
                <span className="text-sm text-ink-400">{mcp.notes[1]}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {mcp.flow.map((s) => (
              <div
                key={s.n}
                className={cn(
                  "flex min-h-40 flex-col gap-2.5 rounded-xl border bg-ink-900 p-5",
                  s.accent ? "border-sakura-500" : "border-ink-700",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("font-mono text-[11px] tracking-[0.04em] uppercase", s.accent ? "text-sakura-500" : "text-ink-400")}>
                    {s.who}
                  </span>
                  <span className="font-mono text-[11px] text-ink-500">{s.n}</span>
                </div>
                <span className="text-lg font-medium tracking-[-0.01em]">{s.t}</span>
                <span className="text-sm leading-[1.5] text-ink-400">{s.d}</span>
              </div>
            ))}
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
