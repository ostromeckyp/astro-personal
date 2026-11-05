import { Button } from "@/components/ui/Button";
import { FOOTER } from "@/content/site/nav";
import { NEW_TAB } from "@/lib/external-link";

export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950 text-ink-0">
      <div className="site-container flex flex-col gap-14 pt-[72px] pb-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[560px] flex-col gap-5">
            <span className="text-[13px] text-ink-400">{FOOTER.tag}</span>
            <p className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em]">{FOOTER.head}</p>
          </div>
          <Button href="/contact" size="lg">
            {FOOTER.cta}
          </Button>
        </div>
        <div className="flex flex-wrap justify-between gap-6 border-t border-ink-700 pt-6 text-sm text-ink-400">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${FOOTER.email}`} className="text-ink-200 hover:text-ink-0">
              {FOOTER.email}
            </a>
            {FOOTER.socials.map((s) => (
              <a key={s.href} href={s.href} {...NEW_TAB} className="hover:text-ink-0">
                {s.label}
              </a>
            ))}
          </div>
          <span>{FOOTER.where}</span>
        </div>
      </div>
    </footer>
  );
}
