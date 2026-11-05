import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HOME } from "@/content/site/home";

const { hero } = HOME;

export function Hero() {
  return (
    <section className="relative h-[calc(100svh-85px)] min-h-[480px] w-full overflow-hidden bg-[#080309] md:aspect-video md:h-auto md:max-h-[920px] md:min-h-[640px]">
      <Image
        src="/images/hero-key-visual-4k.jpg"
        alt={hero.alt}
        fill
        priority
        // The image covers a box taller than 16:9 on phones and tablets, so it renders wider than
        // the screen. With a plain 100vw the browser picks a file far too small and stretches it.
        sizes="(max-width: 767px) 180vh, max(100vw, 1138px)"
        className="hero-plate object-cover object-[50%_40%]"
      />
      <div aria-hidden="true" className="hero-glow glow-burn absolute top-[52%] left-1/2 h-[110%] w-[70%]" />
      <div aria-hidden="true" className="hero-line absolute top-[38.8%] left-0 h-px w-full bg-[rgba(244,242,244,0.30)] [animation-delay:.2s]" />
      <div aria-hidden="true" className="hero-line absolute top-[48.7%] left-0 h-px w-full bg-[rgba(244,242,244,0.22)] [animation-delay:.35s]" />
      <div aria-hidden="true" className="hero-diag absolute top-[9.7%] left-[-3%] h-px w-[130%] bg-[rgba(244,242,244,0.22)] [animation-delay:.5s]" />
      <div aria-hidden="true" className="hero-diag absolute top-[24%] left-[-3%] h-px w-[130%] bg-[rgba(244,242,244,0.16)] [animation-delay:.65s]" />

      <div className="absolute top-[11%] left-[9%] hidden flex-col gap-3.5 text-[13px] leading-[1.22] text-[#e9e6ea] lg:flex">
        {hero.groups.map((g) => (
          <p key={g} className="whitespace-pre-line">
            {g}
          </p>
        ))}
      </div>

      <span
        aria-hidden="true"
        className="absolute top-[5%] right-[5%] text-[clamp(80px,10vw,160px)] leading-[0.82] font-light tracking-[-0.06em]"
      >
        01
      </span>

      <div className="rise-in absolute bottom-[8%] left-[5.5%] flex max-w-[560px] flex-col gap-6 pr-6">
        <h1 className="text-[clamp(44px,5vw,76px)] leading-[0.96] font-medium tracking-[-0.04em] whitespace-pre-line">{hero.h1}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" size="lg">
            {hero.cta}
          </Button>
          <Link href="/use-cases" className="tap border-b border-[rgba(244,242,244,0.6)] pb-[3px] text-base text-ink-100 hover:border-ink-0">
            {hero.cta2}
          </Link>
        </div>
      </div>

      <div className="absolute right-[5%] bottom-[9%] hidden flex-wrap gap-10 text-[13px] text-[#e9e6ea] xl:flex">
        {hero.captions.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </section>
  );
}
