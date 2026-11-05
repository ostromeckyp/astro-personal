import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { ABOUT } from "@/content/site/about";
import { NEW_TAB } from "@/lib/external-link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About: senior software engineer and consultant",
  description: "Senior software engineer from Wrocław working where software engineering meets AI: agents, LLM workflows and MCP. Leads Angular Wrocław.",
  path: "/about",
});

const CARD = "flex flex-col gap-[18px] rounded-card border border-ink-700 bg-ink-900 p-8";
const KICKER = "font-mono text-[11px] tracking-[0.04em] text-sakura-500 uppercase";

export default function AboutPage() {
  const { experience, education, stack, strengths } = ABOUT;
  return (
    <div className="site-container">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-14 pt-20 pb-28 md:pt-28">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-ink-900">
          <Image
            src="/images/portrait.jpg"
            alt={ABOUT.portraitAlt}
            fill
            priority
            sizes="(min-width: 768px) 600px, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div className="flex flex-col gap-7">
          <span className="font-mono text-[13px] text-sakura-500">{ABOUT.label}</span>
          <h1 className="text-[clamp(44px,5vw,72px)] leading-[0.98] font-semibold tracking-[-0.045em]">{ABOUT.h1}</h1>
          <p className="text-xl leading-[1.55] text-ink-200">{ABOUT.p1}</p>
          <p className="text-base leading-[1.65] text-ink-400">{ABOUT.p2}</p>
          <p className="text-base leading-[1.65] text-ink-400">
            {ABOUT.p3}{" "}
            <a href={ABOUT.github.href} {...NEW_TAB} className="text-ink-0 underline decoration-sakura-500 underline-offset-[3px] hover:text-sakura-300">
              {ABOUT.github.label}
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              {ABOUT.cta}
            </Button>
            <a href="/cv.pdf" className="border-b border-ink-0/60 pb-[3px] text-[15px] hover:border-ink-0">
              {ABOUT.cv}
            </a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-x-14 gap-y-8 pb-28 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[13px] text-sakura-500">{experience.label}</span>
          <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{experience.heading}</h2>
          <p className="text-[15px] leading-[1.6] text-ink-400">{experience.sub}</p>
        </div>
        <ol className="flex min-w-0 flex-col border-t border-ink-600 lg:col-span-2">
          {experience.jobs.map((j) => (
            <li key={j.org} className="grid grid-cols-1 gap-x-6 gap-y-2 border-b border-ink-700 py-6 sm:grid-cols-[150px_minmax(0,1fr)]">
              <span className="pt-1 font-mono text-xs text-ink-400">{j.when}</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-lg font-medium tracking-[-0.01em]">
                  {j.role} <span className="font-normal text-ink-400">· {j.org}</span>
                </span>
                <span className="text-[15px] leading-[1.55] text-ink-400">{j.d}</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-tag border border-ink-600 px-2 py-1 font-mono text-[10px] font-medium tracking-[0.04em] text-ink-200 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 pb-32">
        <div className={CARD}>
          <span className={KICKER}>{education.label}</span>
          {education.items.map((e) => (
            <div key={e.t} className="flex flex-col gap-1">
              <span className="text-[17px] font-medium">{e.t}</span>
              <span className="text-sm text-ink-400">{e.d}</span>
            </div>
          ))}
        </div>
        <div className={CARD}>
          <span className={KICKER}>{stack.label}</span>
          <div className="flex flex-wrap gap-2">
            {stack.items.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
        <div className={CARD}>
          <span className={KICKER}>{strengths.label}</span>
          <div className="flex flex-col gap-2.5">
            {strengths.items.map((s) => (
              <div key={s.n} className="flex items-baseline gap-3.5">
                <span className="font-mono text-xs text-ink-400">{s.n}</span>
                <span className="text-lg font-medium">{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
