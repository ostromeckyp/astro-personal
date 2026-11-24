import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { NEW_TAB } from "@/lib/external-link";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const { META } = getDictionary(lang);
  return pageMetadata({ lang, ...META.about, path: "/about" });
}

const CARD = "reveal flex flex-col gap-[18px] rounded-card border border-ink-700 bg-ink-900 p-8";

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const { ABOUT } = getDictionary(lang);
  const { facts } = ABOUT;
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
            <a href="/cv.pdf" {...NEW_TAB} className="tap border-b border-ink-0/60 pb-[3px] text-[15px] hover:border-ink-0">
              {ABOUT.cv}
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 pb-32">
        <span className="font-mono text-[13px] text-sakura-500">{facts.label}</span>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
          {facts.items.map((f) => (
            <div key={f.v} className={CARD}>
              <span className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{f.v}</span>
              <span className="text-[15px] leading-[1.6] text-ink-400">{f.t}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
