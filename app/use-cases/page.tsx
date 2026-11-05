import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { UseCaseCard } from "@/components/ui/UseCaseCard";
import { USE_CASES } from "@/content/site/use-cases";
import { pageMetadata } from "@/lib/metadata";

const COPY = {
  label: "use cases",
  h1: "AI at work, not in a demo.",
  intro: "Real systems with real users. Each one shows the business problem, where the AI sits in the workflow, and what keeps it in check.",
  nextLabel: "the next one could be yours",
  nextH: "Have a process in mind?",
  cta: "Talk about your workflow",
};

export const metadata: Metadata = pageMetadata({
  title: "AI use cases running in production",
  description: COPY.intro,
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <div className="site-container">
      <PageHeader label={COPY.label} title={COPY.h1} intro={COPY.intro} />
      <section className="flex flex-col gap-24 pb-32">
        {USE_CASES.map((c) => (
          <UseCaseCard key={c.slug} useCase={c} variant="list" />
        ))}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-card border border-dashed border-ink-600 p-6 md:p-10">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{COPY.nextLabel}</span>
            <span className="text-2xl font-semibold tracking-[-0.02em]">{COPY.nextH}</span>
          </div>
          <Button href="/contact" size="lg">
            {COPY.cta}
          </Button>
        </div>
      </section>
    </div>
  );
}
