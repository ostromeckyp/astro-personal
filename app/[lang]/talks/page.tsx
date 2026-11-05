import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const { META } = getDictionary(lang);
  return pageMetadata({ lang, ...META.talks, path: "/talks" });
}

const KICKER = "font-mono text-[11px] tracking-[0.04em] uppercase";

export default async function TalksPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { TALKS } = getDictionary(lang);
  const { community, list, gallery, team } = TALKS;
  return (
    <div className="site-container">
      <PageHeader label={TALKS.label} title={TALKS.h1} intro={TALKS.intro} />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-stretch gap-6 pb-28">
        <div className="flex flex-col gap-5 rounded-card border border-ink-700 bg-ink-900 p-6 md:p-10">
          <span className={`${KICKER} text-sakura-500`}>{community.label}</span>
          <span className="text-[36px] leading-[1.05] font-semibold tracking-[-0.03em]">{community.name}</span>
          <p className="text-base leading-[1.6] text-ink-400">{community.body}</p>
        </div>
        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-ink-600 bg-ink-900">
            <Image src={community.image} alt={community.alt} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
          </div>
          <figcaption className="text-[13px] text-ink-400">{community.caption}</figcaption>
        </figure>
      </section>

      <section className="flex flex-col gap-8 pb-28">
        <SectionHeading index={list.label} title={list.heading} />
        <div className="flex flex-col border-t border-ink-600">
          {list.items.map((k) => (
            <article
              key={k.title}
              className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] items-center gap-x-10 gap-y-6 border-b border-ink-700 py-8"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink-600 bg-ink-900">
                <Image
                  src={k.image}
                  alt={k.alt}
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  style={{ objectPosition: k.position }}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className={`${KICKER} text-sakura-500`}>{k.kind}</span>
                  {k.year && <span className="font-mono text-xs text-ink-400">{k.year}</span>}
                </div>
                <h3 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em]">{k.title}</h3>
                <span className="text-[15px] leading-[1.55] text-ink-200">{k.event}</span>
                <span className="text-[15px] leading-[1.6] text-ink-400">{k.d}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 pb-28">
        <SectionHeading index={gallery.label} title={gallery.heading} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
          {gallery.items.map((g) => (
            <figure key={g.image} className="reveal flex flex-col gap-2.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-ink-600 bg-ink-900">
                <Image
                  src={g.image}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: g.position }}
                  className="object-cover"
                />
              </div>
              {g.caption && <figcaption className="text-[13px] leading-[1.4] text-ink-400">{g.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-8 rounded-card border border-sakura-500 bg-ink-900 p-6 md:p-12">
          <div className="flex flex-col gap-4">
            <span className={`${KICKER} text-sakura-500`}>{team.label}</span>
            <span className="text-[32px] leading-[1.08] font-semibold tracking-[-0.03em]">{team.heading}</span>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p className="text-base leading-[1.6] text-ink-400">{team.body}</p>
            <Button href="/contact" size="lg">
              {team.cta}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
