import { INSTAGRAM_URL } from "@/lib/site";
export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/blog", label: "Blog" },
  { href: "/talks", label: "Talks" },
  { href: "/about", label: "About" },
];

export const NAV_CTA = { href: "/contact", label: "Free consultation" };

export const COMMON = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  mobileNav: "Mobile navigation",
  primaryNav: "Primary",
  languageLabel: "Language",
  themeToLight: "Switch to light mode",
  themeToDark: "Switch to dark mode",
  notFoundTitle: "Page not found",
  notFoundHeading: "Page not found.",
  notFoundBody: "This page doesn't exist or has moved.",
  notFoundCta: "Back to home",
};

export const FOOTER = {
  tag: "apps & websites · ai workflows · audits & care",
  head: "Let's talk about what your business needs next.",
  cta: "Free 30-min consultation",
  where: "Paweł Ostromecki · Wrocław, Poland · remote, worldwide",
  email: "contact@ostromecki.dev",
  socials: [
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: INSTAGRAM_URL, label: "Instagram" },
    { href: "https://x.com/ostromeckyp", label: "X" },
  ],
};
