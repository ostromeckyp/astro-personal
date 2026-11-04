import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { APPROACH } from "@/content/site/approach";

export const metadata: Metadata = {
  title: "Approach",
  description: APPROACH.intro,
};

export default function ApproachPage() {
  return (
    <div className="site-container">
      <PageHeader label={APPROACH.label} title={APPROACH.h1} intro={APPROACH.intro} className="pb-24" />

      <section className="flex flex-col border-t border-ink-600">
        {APPROACH.stages.map((s) => (
          <div
            key={s.n}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-12 gap-y-6 border-b border-ink-600 py-12"
          >
            <div className="flex items-baseline gap-5">
              <span className="text-[88px] leading-[0.8] font-light tracking-[-0.06em]">{s.n}</span>
              <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.025em]">{s.t}</h2>
            </div>
            <p className="text-base leading-[1.6] text-ink-400">{s.d}</p>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{APPROACH.outLabel}</span>
              <span className="text-[15px] leading-[1.5] text-ink-200">{s.out}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-10 py-32">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="font-mono text-[13px] text-sakura-500">{APPROACH.principles.label}</span>
          <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{APPROACH.principles.heading}</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
          {APPROACH.principles.items.map((p) => (
            <div key={p.t} className="flex flex-col gap-3.5 rounded-card border border-ink-700 bg-ink-900 p-8">
              <span aria-hidden="true" className="h-0.5 w-8 bg-sakura-500" />
              <span className="text-[22px] leading-[1.2] font-semibold tracking-[-0.02em]">{p.t}</span>
              <span className="text-[15px] leading-[1.6] text-ink-400">{p.d}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
