import type { Metadata } from "next";
import { NextStepCta } from "@/components/ui/NextStepCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { UseCaseCard } from "@/components/ui/UseCaseCard";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const { META } = getDictionary(lang);
  return pageMetadata({ lang, ...META.useCases, path: "/use-cases" });
}

export default async function UseCasesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { NEXT_STEP, USE_CASES, USE_CASES_PAGE } = getDictionary(lang);
  return (
    <div className="site-container">
      <PageHeader label={USE_CASES_PAGE.label} title={USE_CASES_PAGE.h1} intro={USE_CASES_PAGE.intro} />
      <section className="flex flex-col gap-24 pb-32">
        {USE_CASES.map((c) => (
          <UseCaseCard key={c.slug} useCase={c} variant="list" readLabel={USE_CASES_PAGE.read} />
        ))}
        <NextStepCta copy={NEXT_STEP} />
      </section>
    </div>
  );
}
