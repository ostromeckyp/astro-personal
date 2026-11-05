import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { UseCase } from "@/content/site/use-cases";

function Cover({ useCase }: { useCase: UseCase }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-ink-600 bg-ink-900">
      <Image
        src={useCase.image}
        alt={useCase.alt}
        fill
        sizes="(min-width: 768px) 600px, 100vw"
        style={{ objectPosition: useCase.imagePosition }}
        className="object-cover"
      />
    </div>
  );
}

export function UseCaseCard({ useCase, variant = "home" }: { useCase: UseCase; variant?: "home" | "list" }) {
  if (variant === "list") {
    return (
      <Link
        href={useCase.href}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-x-12 gap-y-10 text-ink-0"
      >
        <Cover useCase={useCase} />
        <div className="flex flex-col gap-5">
          <div className="flex items-baseline gap-4">
            <span className="text-[64px] leading-[0.8] font-light tracking-[-0.06em]">{useCase.n}</span>
            <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{useCase.tag}</span>
          </div>
          <h2 className="text-[36px] leading-[1.05] font-semibold tracking-[-0.035em]">{useCase.title}</h2>
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
    <Link href={useCase.href} className="group flex flex-col gap-5 text-ink-0">
      <Cover useCase={useCase} />
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{useCase.homeTag}</span>
        <span className="text-[26px] leading-[1.15] font-semibold tracking-[-0.025em]">{useCase.homeTitle}</span>
        <span className="text-base leading-[1.6] text-ink-400">{useCase.homeBody}</span>
      </div>
    </Link>
  );
}
