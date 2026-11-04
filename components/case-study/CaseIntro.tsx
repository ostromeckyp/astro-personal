import { StoryList, type StoryItem } from "@/components/case-study/StoryList";
import { Tag } from "@/components/ui/Tag";

export function CaseIntro({
  index,
  label,
  title,
  lede,
  stack,
  story,
}: {
  index: string;
  label: string;
  title: string;
  lede: string;
  stack: string[];
  story: StoryItem[];
}) {
  return (
    <section className="relative grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
      <div className="flex flex-col gap-7 lg:col-span-7">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-[13px] text-sakura-500">{index}</span>
          <span className="font-mono text-xs font-medium tracking-[0.04em] text-ink-400 uppercase">{label}</span>
        </div>
        <h1 className="text-[clamp(48px,5.6vw,80px)] leading-[0.95] font-semibold tracking-[-0.045em]">{title}</h1>
        <p className="max-w-[640px] text-xl leading-[1.55] text-ink-200">{lede}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <StoryList items={story} />
      </div>
    </section>
  );
}
