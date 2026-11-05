import { Button } from "@/components/ui/Button";
import { NEXT_STEP } from "@/content/site/nav";

export function NextStepCta() {
  return (
    <div className="reveal flex flex-wrap items-center justify-between gap-6 rounded-card border border-dashed border-ink-600 p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-400 uppercase">{NEXT_STEP.label}</span>
        <span className="text-2xl font-semibold tracking-[-0.02em]">{NEXT_STEP.heading}</span>
      </div>
      <Button href="/contact" size="lg">
        {NEXT_STEP.cta}
      </Button>
    </div>
  );
}
