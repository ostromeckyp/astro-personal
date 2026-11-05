import type { Metadata } from "next";
import { NextStepCta } from "@/components/ui/NextStepCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { UseCaseCard } from "@/components/ui/UseCaseCard";
import { USE_CASES } from "@/content/site/use-cases";
import { pageMetadata } from "@/lib/metadata";

const COPY = {
  label: "use cases",
  h1: "AI at work, not in a demo.",
  intro: "Real systems with real users. Each one shows the business problem, where the AI sits in the workflow, and what keeps it in check.",
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
        <NextStepCta />
      </section>
    </div>
  );
}
