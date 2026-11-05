import type { COMMON as C, FOOTER as F, NAV_CTA as CTA, NAV_LINKS as L, NEXT_STEP as N } from "../nav";

export const NAV_LINKS: typeof L = [
  { href: "/services", label: "Usługi" },
  { href: "/use-cases", label: "Wdrożenia" },
  { href: "/approach", label: "Jak pracuję" },
  { href: "/blog", label: "Blog" },
  { href: "/talks", label: "Wystąpienia" },
  { href: "/about", label: "O mnie" },
];

export const NEXT_STEP: typeof N = {
  label: "następne może być Twoje",
  heading: "Masz na myśli jakiś proces?",
  cta: "Porozmawiajmy o Twoim procesie",
};

export const NAV_CTA: typeof CTA = { href: "/contact", label: "Umów rozmowę" };

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
  tag: "workflowy AI · inżynieria oprogramowania · gotowe na produkcję",
  head: "Masz proces, który AI mogłoby zdjąć z głowy Twojemu zespołowi?",
  cta: "Umów konsultację",
  where: "Paweł Ostromecki · Wrocław · zdalnie, na całym świecie",
  email: "contact@ostromecki.dev",
  socials: [
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: "https://x.com/ostromeckyp", label: "X" },
  ],
};
