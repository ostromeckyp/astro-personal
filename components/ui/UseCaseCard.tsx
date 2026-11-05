import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Tag } from "@/components/ui/Tag";
import type { UseCase } from "@/content/site/use-cases";

function Cover({ useCase }: { useCase: UseCase }) {
  return (
    <ViewTransition name={`use-case-image-${useCase.slug}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-ink-600 bg-ink-900 transition-colors group-hover:border-sakura-500">
        <Image
          src={useCase.image}
          alt={useCase.alt}
          fill
          sizes="(min-width: 768px) 600px, 100vw"
          style={{ objectPosition: useCase.imagePosition }}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-safe:group-hover:scale-[1.03]"
        />
      </div>
    </ViewTransition>
  );
}

export function UseCaseCard({ useCase, variant = "home" }: { useCase: UseCase; variant?: "home" | "list" }) {
  if (variant === "list") {
    return (
      <Link
        href={useCase.href}
        className="reveal group grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-x-12 gap-y-10 text-ink-0"
      >
        <Cover useCase={useCase} />
        <div className="flex flex-col gap-5">
          <div className="flex items-baseline gap-4">
            <span className="text-[64px] leading-[0.8] font-light tracking-[-0.06em]">{useCase.n}</span>
            <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{useCase.tag}</span>
          </div>
          <ViewTransition name={`use-case-title-${useCase.slug}`}>
            <h2 className="text-[36px] leading-[1.05] font-semibold tracking-[-0.035em]">{useCase.title}</h2>
          </ViewTransition>
          <p className="text-base leading-[1.6] text-ink-400">{useCase.summary}</p>
          <div className="flex flex-wrap gap-2">
            {useCase.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <span className="self-start border-b-2 border-sakura-500 pb-[3px] text-[15px]">Read the use case</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={useCase.href} className="reveal group flex flex-col gap-5 text-ink-0">
      <Cover useCase={useCase} />
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{useCase.homeTag}</span>
        <ViewTransition name={`use-case-title-${useCase.slug}`}>
          <span className="text-[26px] leading-[1.15] font-semibold tracking-[-0.025em]">{useCase.homeTitle}</span>
        </ViewTransition>
        <span className="text-base leading-[1.6] text-ink-400">{useCase.homeBody}</span>
      </div>
    </Link>
  );
}
