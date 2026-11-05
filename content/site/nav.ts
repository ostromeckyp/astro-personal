export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/approach", label: "Approach" },
  { href: "/blog", label: "Blog" },
  { href: "/talks", label: "Talks" },
  { href: "/about", label: "About" },
] as const;

export const NEXT_STEP = {
  label: "the next one could be yours",
  heading: "Have a process in mind?",
  cta: "Talk about your workflow",
};

export const NAV_CTA = { href: "/contact", label: "Book a call" } as const;

export const FOOTER = {
  tag: "ai workflows · software engineering · production-ready",
  head: "Is there a process AI could take off your team's plate?",
  cta: "Book a consultation",
  where: "Paweł Ostromecki · Wrocław, Poland · remote, worldwide",
  email: "contact@ostromecki.dev",
  socials: [
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: "https://x.com/ostromeckyp", label: "X" },
  ],
} as const;
