import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Button } from "@/components/ui/Button";
import type { HOME } from "@/content/site/home";

export function Hero({ hero }: { hero: typeof HOME.hero }) {
  return (
    <section className="relative w-full overflow-x-clip md:aspect-video md:max-h-[920px] md:min-h-[640px]">
      {/* Spills past the bottom edge onto the next section; screen blending keeps it reading as light. */}
      <div aria-hidden="true" className="article-glow glow-burn absolute top-[-30%] right-0 h-[160%] w-full mix-blend-screen md:right-[-10%] md:w-[70%]" />
      <div aria-hidden="true" className="hero-diag absolute top-[30%] left-[-5%] h-px w-[130%] bg-ink-0/8" />

      {/* Copy shares the site container, so it lines up with the sections below. */}
      <div className="site-container relative md:absolute md:inset-x-0 md:inset-y-0">
        <div className="absolute top-[11%] left-6 hidden flex-col gap-3.5 text-[13px] leading-[1.22] text-[#e9e6ea] lg:flex">
          {hero.groups.map((g) => (
            <p key={g} className="whitespace-pre-line">
              {g}
            </p>
          ))}
        </div>

        <div className="rise-in relative flex max-w-[560px] flex-col gap-6 pt-20 pb-16 md:absolute md:bottom-[8%] md:left-6 md:p-0 md:pr-6">
          <h1 className="text-[clamp(36px,11vw,44px)] md:text-[clamp(44px,5vw,76px)] leading-[0.96] font-medium tracking-[-0.04em] whitespace-pre-line">{hero.h1}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              {hero.cta}
            </Button>
            <Link href="/use-cases" className="tap border-b border-[rgba(244,242,244,0.6)] pb-[3px] text-base text-ink-100 hover:border-ink-0">
              {hero.cta2}
            </Link>
          </div>
          <p className="-mt-2 text-sm text-ink-200">{hero.ctaNote}</p>
        </div>

        <div className="absolute right-6 bottom-[9%] hidden flex-wrap gap-10 text-[13px] text-[#e9e6ea] xl:flex">
          {hero.captions.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
