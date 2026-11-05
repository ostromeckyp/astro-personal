import type { Metadata } from "next";
import { NextStepCta } from "@/components/ui/NextStepCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { SERVICES } from "@/content/site/services";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "AI consultant and engineer for business workflows",
  description: "Where AI would actually save your team time or money, and what it takes to run safely. I design, build and hand over.",
  path: "/services",
});

const META = "font-mono text-[11px] tracking-[0.04em] uppercase";

export default function ServicesPage() {
  return (
    <div className="site-container relative overflow-x-clip">
      <JsonLd data={faqSchema(SERVICES.faq.items)} />
      <div aria-hidden="true" className="absolute top-10 left-[-10%] h-px w-[130%] origin-top-left rotate-15 bg-ink-0/8" />
      <PageHeader label={SERVICES.label} title={SERVICES.h1} intro={SERVICES.intro} className="pb-24" />

      <section className="flex flex-col border-t border-ink-600">
        {SERVICES.items.map((s) => (
          <article
            key={s.n}
            id={`service-${s.n}`}
            className="grid scroll-mt-24 grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-12 gap-y-8 border-b border-ink-600 py-14"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-[72px] leading-[0.8] font-light tracking-[-0.06em]">{s.n}</span>
                <span className={cn(META, s.featured ? "text-sakura-500" : "text-ink-400")}>{s.meta}</span>
              </div>
              <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em]">{s.title}</h2>
              <p className="text-base leading-[1.6] text-ink-400">{s.body}</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className={cn(META, "text-ink-400")}>{SERVICES.getLabel}</span>
              <ul className="flex flex-col gap-2.5">
                {s.get.map((g) => (
                  <li key={g} className="flex gap-3 text-[15px] leading-[1.5] text-ink-200">
                    <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-sakura-500" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <span className={cn(META, "text-ink-400")}>{SERVICES.fitLabel}</span>
              <p className="text-[15px] leading-[1.6] text-ink-400">{s.fit}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-10 py-32">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="font-mono text-[13px] text-sakura-500">{SERVICES.models.label}</span>
          <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{SERVICES.models.heading}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SERVICES.models.items.map((m) => (
            <div
              key={m.t}
              className={cn(
                "flex flex-col gap-4 rounded-card border bg-ink-900 p-8",
                m.featured ? "border-sakura-500" : "border-ink-700",
              )}
            >
              <span className={cn(META, m.featured ? "text-sakura-500" : "text-ink-400")}>{m.len}</span>
              <span className="text-2xl leading-[1.15] font-semibold tracking-[-0.02em]">{m.t}</span>
              <span className="text-[15px] leading-[1.6] text-ink-400">{m.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-12 pb-20">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[13px] text-sakura-500">{SERVICES.faq.label}</span>
          <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{SERVICES.faq.heading}</h2>
        </div>
        <div className="flex flex-col border-t border-ink-600">
          {SERVICES.faq.items.map((f) => (
            <details key={f.q} className="group border-b border-ink-600">
              <summary className="flex list-none items-center justify-between gap-4 py-[22px] text-lg font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="shrink-0 font-mono text-sakura-500 group-open:hidden">+</span>
                <span aria-hidden="true" className="hidden shrink-0 font-mono text-sakura-500 group-open:inline">−</span>
              </summary>
              <p className="pb-[22px] text-[15px] leading-[1.6] text-ink-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="pb-32">
        <NextStepCta />
      </div>
    </div>
  );
}
