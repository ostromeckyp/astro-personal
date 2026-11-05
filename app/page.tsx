import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Hero } from "@/components/home/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { UseCaseCard } from "@/components/ui/UseCaseCard";
import { HOME } from "@/content/site/home";
import { USE_CASES } from "@/content/site/use-cases";
import { formatPostDate } from "@/lib/format-date";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";
import { SITE_DEFAULT_TITLE, SITE_DESCRIPTION } from "@/lib/site";

export const metadata = pageMetadata({
  title: { absolute: SITE_DEFAULT_TITLE },
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  const latest = getAllPosts()[0];

  return (
    <>
      <Hero />
      <div className="site-container">
        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-end gap-12 pt-20 pb-24 md:pt-32">
          <h2 className="text-[clamp(36px,4vw,56px)] leading-[1.02] font-semibold tracking-[-0.04em]">{HOME.intro}</h2>
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-[1.6] text-ink-400">{HOME.introBody}</p>
            <div className="flex flex-wrap gap-2">
              {HOME.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-10 pt-8 pb-32">
          <SectionHeading index="02" title={HOME.services.heading} action={<TextLink href="/services">{HOME.services.all}</TextLink>} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
            {HOME.services.items.map((s) => (
              <ServiceCard key={s.n} {...s} href="/services" />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10 pb-32">
          <SectionHeading index="03" title={HOME.cases.heading} action={<TextLink href="/use-cases">{HOME.cases.all}</TextLink>} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
            {USE_CASES.map((c) => (
              <UseCaseCard key={c.slug} useCase={c} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10 pb-32">
          <SectionHeading index="04" title={HOME.how.heading} action={<TextLink href="/approach">{HOME.how.all}</TextLink>} />
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] border-t border-ink-600">
            {HOME.how.steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-2.5 pt-7 pr-6 pb-2">
                <span className="font-mono text-xs text-sakura-500">{s.n}</span>
                <span className="text-xl font-medium tracking-[-0.015em]">{s.t}</span>
                <span className="text-[15px] leading-[1.55] text-ink-400">{s.d}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-12 pb-32">
          <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-card bg-ink-900">
            <Image
              src="/images/portrait.jpg"
              alt={HOME.about.portraitAlt}
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[13px] text-sakura-500">05 · {HOME.about.label}</span>
            <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{HOME.about.heading}</h2>
            <p className="text-[17px] leading-[1.65] text-ink-400">{HOME.about.body}</p>
            <div className="flex flex-wrap gap-6">
              <TextLink href="/about">{HOME.about.more}</TextLink>
              <TextLink href="/talks" tone="muted" className="text-ink-400">
                {HOME.about.talks}
              </TextLink>
            </div>
          </div>
        </section>

        {latest && (
          <section className="pb-32">
            <Link
              href={`/blog/${latest.slug}`}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-end gap-8 rounded-card border border-ink-600 bg-ink-900 p-6 text-ink-0 md:p-12"
            >
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[11px] tracking-[0.04em] text-sakura-500 uppercase">
                  {HOME.post.label} · {latest.label}
                </span>
                <ViewTransition name={`post-title-${latest.slug}`}>
                  <span className="text-[clamp(28px,3vw,40px)] leading-[1.08] font-semibold tracking-[-0.03em]">{latest.title}</span>
                </ViewTransition>
              </div>
              <div className="flex items-center justify-between gap-4 text-[15px] text-ink-400">
                <span>{formatPostDate(latest.date, "long")}</span>
                <span className="border-b-2 border-sakura-500 pb-[3px] text-ink-0">{HOME.post.read}</span>
              </div>
            </Link>
          </section>
        )}
      </div>
    </>
  );
}
