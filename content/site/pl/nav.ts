import type { COMMON as C, FOOTER as F, NAV_CTA as CTA, NAV_LINKS as L } from "../nav";

export const NAV_LINKS: typeof L = [
  { href: "/services", label: "Usługi" },
  { href: "/use-cases", label: "Wdrożenia" },
  { href: "/approach", label: "Jak pracuję" },
  { href: "/blog", label: "Blog" },
  { href: "/talks", label: "Wystąpienia" },
  { href: "/about", label: "O mnie" },
];

export const NAV_CTA: typeof CTA = { href: "/contact", label: "Bezpłatna rozmowa" };

export const COMMON: typeof C = {
  skipToContent: "Przejdź do treści",
  openMenu: "Otwórz menu",
  closeMenu: "Zamknij menu",
  mobileNav: "Nawigacja mobilna",
  primaryNav: "Główna",
  languageLabel: "Język",
  notFoundTitle: "Nie znaleziono strony",
  notFoundHeading: "Nie znaleziono strony.",
  notFoundBody: "Ta strona nie istnieje albo została przeniesiona.",
  notFoundCta: "Wróć na stronę główną",
};

export const FOOTER: typeof F = {
  tag: "workflowy AI · aplikacje i strony · audyty i opieka",
  head: "Porozmawiajmy o tym, czego Twoja firma potrzebuje dalej.",
  cta: "Bezpłatna konsultacja (30 min)",
  where: "Paweł Ostromecki · Wrocław · zdalnie, na całym świecie",
  email: "contact@ostromecki.dev",
  socials: [
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: "https://x.com/ostromeckyp", label: "X" },
  ],
};
