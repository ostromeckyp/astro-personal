import { INSTAGRAM_URL } from "@/lib/site";
import type { COMMON as C, FAB as FB, FOOTER as F, NAV_CTA as CTA, NAV_LINKS as L } from "../nav";

export const NAV_LINKS: typeof L = [
  { href: "/services", label: "Usługi" },
  { href: "/use-cases", label: "Wdrożenia" },
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
  themeToLight: "Włącz jasny motyw",
  themeToDark: "Włącz ciemny motyw",
  notFoundTitle: "Nie znaleziono strony",
  notFoundHeading: "Nie znaleziono strony.",
  notFoundBody: "Ta strona nie istnieje albo została przeniesiona.",
  notFoundCta: "Wróć na stronę główną",
  skipSplash: "Pomiń",
  splashLabel: "Powitanie",
};

export const FOOTER: typeof F = {
  tag: "aplikacje i strony · workflowy AI · audyty i opieka",
  head: "Porozmawiajmy o tym, czego Twoja firma potrzebuje dalej.",
  cta: "Bezpłatna konsultacja (30 min)",
  where: "Paweł Ostromecki · Wrocław · zdalnie, na całym świecie",
  email: "contact@ostromecki.dev",
  socials: [
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: INSTAGRAM_URL, label: "Instagram" },
    { href: "https://x.com/ostromeckyp", label: "X" },
  ],
};

export const FAB: typeof FB = {
  open: "Otwórz szybki kontakt",
  close: "Zamknij szybki kontakt",
  panel: "Szybki kontakt",
  call: "Zadzwoń",
  email: "Wyślij wiadomość",
  form: "Formularz kontaktowy",
  profiles: [
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: INSTAGRAM_URL, label: "Instagram" },
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
  ],
};
