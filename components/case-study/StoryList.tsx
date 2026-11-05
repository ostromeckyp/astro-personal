export type StoryItem = { k: string; t: string; d: string };

export function StoryList({ items }: { items: StoryItem[] }) {
  return (
    <div className="flex flex-col border-t border-ink-600">
      {items.map((s) => (
        <div key={s.k} className="reveal grid grid-cols-[80px_minmax(0,1fr)] gap-4 border-b border-ink-600 py-[22px] sm:grid-cols-[96px_minmax(0,1fr)]">
          <span className="pt-[3px] font-mono text-xs text-sakura-500">{s.k}</span>
          <div className="flex flex-col gap-1.5">
            <span className="text-lg font-medium tracking-[-0.01em]">{s.t}</span>
            <span className="text-[15px] leading-[1.55] text-ink-400">{s.d}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
