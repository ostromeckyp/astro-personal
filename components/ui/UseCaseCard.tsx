import Image from "next/image";
import Link from "next/link";
import type { UseCase } from "@/content/site/use-cases";

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Link href={useCase.href} className="group flex flex-col gap-5 text-ink-0">
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
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{useCase.homeTag}</span>
        <span className="text-[26px] leading-[1.15] font-semibold tracking-[-0.025em]">{useCase.homeTitle}</span>
        <span className="text-base leading-[1.6] text-ink-400">{useCase.homeBody}</span>
      </div>
    </Link>
  );
}
