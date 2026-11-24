import type { Metadata } from "next";
import { Carousel } from "@/components/ui/Carousel";
import { NextStepCta } from "@/components/ui/NextStepCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/structured-data";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const { META } = getDictionary(lang);
  return pageMetadata({ lang, ...META.services, path: "/services" });
}

const META = "font-mono text-[11px] tracking-[0.04em] uppercase";

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { NEXT_STEP, SERVICES } = getDictionary(lang);
  return (
    <div className="site-container relative overflow-x-clip">
      <JsonLd data={faqSchema(SERVICES.faq.items)} />
      <div aria-hidden="true" className="absolute top-10 left-[-10%] h-px w-[130%] origin-top-left rotate-15 bg-ink-0/8" />
      <PageHeader label={SERVICES.label} title={SERVICES.h1} intro={SERVICES.intro} className="pb-16" />

      {SERVICES.groups.map((group) => (
        <section key={group.id} id={group.id} className="flex scroll-mt-24 flex-col gap-8 pb-20">
          <div className="reveal flex flex-col gap-3">
            <span className="font-mono text-[13px] text-sakura-500">{group.label}</span>
            <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{group.heading}</h2>
          </div>
          <div className="reveal">
            <Carousel label={group.heading} prevLabel={SERVICES.prev} nextLabel={SERVICES.next}>
              {SERVICES.items
                .filter((s) => s.group === group.id)
                .map((s) => (
                  <li key={s.n} className="flex w-[min(400px,82vw)] shrink-0 snap-start">
                    <article
                      id={`service-${s.n}`}
                      className={cn(
                        "flex w-full scroll-mt-24 flex-col gap-5 rounded-card border bg-ink-900 p-7 md:p-8",
                        s.featured ? "border-sakura-500" : "border-ink-700",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[56px] leading-[0.8] font-light tracking-[-0.06em]">{s.n}</span>
                        <span className={cn(META, s.featured ? "text-sakura-500" : "text-ink-400")}>{s.meta}</span>
                      </div>
                      <h3 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.025em]">{s.title}</h3>
                      <p className="text-[15px] leading-[1.6] text-ink-400">{s.body}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                      <details className="group mt-auto border-t border-ink-700 pt-4">
                        <summary className={cn(META, "flex cursor-pointer list-none items-center justify-between gap-4 text-ink-400 [&::-webkit-details-marker]:hidden")}>
                          {SERVICES.getLabel}
                          <span aria-hidden="true" className="text-sakura-500 group-open:rotate-45 motion-safe:transition-transform">
                            +
                          </span>
                        </summary>
                        <ul className="flex flex-col gap-2.5 pt-4">
                          {s.get.map((g) => (
                            <li key={g} className="flex gap-3 text-[14px] leading-[1.5] text-ink-200">
                              <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 bg-sakura-500" />
                              {g}
                            </li>
                          ))}
                        </ul>
                        <p className="pt-4 text-[14px] leading-[1.6] text-ink-400">
                          <span className={cn(META, "mr-2 text-ink-200")}>{SERVICES.fitLabel}:</span>
                          {s.fit}
                        </p>
                      </details>
                      <p className="flex items-baseline justify-between gap-4 border-t border-ink-700 pt-4">
                        <span className={cn(META, "text-ink-400")}>{SERVICES.priceLabel}</span>
                        <span className="text-lg font-semibold tracking-[-0.015em]">{s.price}</span>
                      </p>
                    </article>
                  </li>
                ))}
            </Carousel>
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-10 pt-8 pb-32">
        <div className="reveal flex max-w-[640px] flex-col gap-4">
          <span className="font-mono text-[13px] text-sakura-500">{SERVICES.models.label}</span>
          <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{SERVICES.models.heading}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SERVICES.models.items.map((m) => (
            <div
              key={m.t}
              className={cn("reveal flex flex-col gap-4 rounded-card border bg-ink-900 p-8", m.featured ? "border-sakura-500" : "border-ink-700")}
            >
              <span className={cn(META, m.featured ? "text-sakura-500" : "text-ink-400")}>{m.len}</span>
              <span className="text-2xl leading-[1.15] font-semibold tracking-[-0.02em]">{m.t}</span>
              <span className="text-[15px] leading-[1.6] text-ink-400">{m.d}</span>
              <span className="mt-auto pt-2 text-xl font-semibold tracking-[-0.015em]">{m.price}</span>
            </div>
          ))}
        </div>
        <p className="reveal max-w-[640px] text-[15px] leading-[1.6] text-ink-400">{SERVICES.priceNote}</p>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-12 pb-20">
        <div className="reveal flex flex-col gap-4">
          <span className="font-mono text-[13px] text-sakura-500">{SERVICES.faq.label}</span>
          <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{SERVICES.faq.heading}</h2>
        </div>
        <div className="flex flex-col border-t border-ink-600">
          {SERVICES.faq.items.map((f) => (
            <details key={f.q} className="reveal group border-b border-ink-600">
              <summary className="flex list-none items-center justify-between gap-4 py-[22px] text-lg font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="shrink-0 font-mono text-sakura-500 group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden shrink-0 font-mono text-sakura-500 group-open:inline">
                  −
                </span>
              </summary>
              <p className="pb-[22px] text-[15px] leading-[1.6] text-ink-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="pb-32">
        <NextStepCta copy={NEXT_STEP} />
      </div>
    </div>
  );
}
