import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/app/providers";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/content/site/contact";
import { NEW_TAB } from "@/lib/external-link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Book an AI workflow consultation",
  description: CONTACT.intro,
  path: "/contact",
});

function Detail({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-ink-700 py-[18px] sm:grid-cols-[120px_minmax(0,1fr)]">
      <dt className="font-mono text-xs text-ink-400">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function ContactPage() {
  const { details } = CONTACT;
  return (
    <div className="site-container grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-14 pt-20 pb-32 md:pt-28">
      <div className="flex flex-col gap-7">
        <span className="font-mono text-[13px] text-sakura-500">{CONTACT.label}</span>
        <h1 className="text-[clamp(48px,6vw,80px)] leading-[0.95] font-semibold tracking-[-0.045em]">{CONTACT.h1}</h1>
        <p className="text-lg leading-[1.6] text-ink-400">{CONTACT.intro}</p>
        <dl className="flex flex-col border-t border-ink-600">
          <Detail term={details.email}>
            <a href={`mailto:${CONTACT.email}`} className="break-words hover:text-sakura-300">
              {CONTACT.email}
            </a>
          </Detail>
          <Detail term={details.phone}>
            <a href={CONTACT.phoneHref} className="hover:text-sakura-300">
              {CONTACT.phone}
            </a>
          </Detail>
          <Detail term={details.where}>
            <span className="text-ink-200">{CONTACT.where}</span>
          </Detail>
          <Detail term={details.elsewhere}>
            <div className="flex flex-wrap gap-5">
              {CONTACT.socials.map((s) => (
                <a key={s.href} href={s.href} {...NEW_TAB} className="hover:text-sakura-300">
                  {s.label}
                </a>
              ))}
            </div>
          </Detail>
        </dl>
      </div>
      <div className="rounded-card border border-ink-700 bg-ink-900 p-6 md:p-10">
        <Providers>
          <ContactForm />
        </Providers>
      </div>
    </div>
  );
}
