import type { Tech } from "@/components/ui/TechLogos";

type FaqItem = { q: string; a: string; logos?: Tech[] };

export const SERVICES = {
  label: "services",
  h1: "Software for your business. AI where it pays off.",
  intro:
    "Web and mobile apps, websites, AI workflows, audits and care after launch.",
  /** Currency of the numeric `priceFrom` below, for structured data. */
  currency: "USD",
  priceLabel: "price",
  priceNote: "Prices are a starting point, net of VAT. You get the final price in a written quote after a free 30-minute call.",
  prev: "Previous services",
  next: "Next services",
  items: [
    {
      n: "01",
      price: "Individual quote",
      meta: "workflows",
      title: "AI workflows",
      body: "A manual, repetitive process turned into an AI workflow, plugged into the tools your team already uses.",
      tags: ["Less manual work", "Human in the loop"],
    },
    {
      n: "02",
      price: "Individual quote",
      meta: "most common",
      featured: true,
      title: "AI in real business cases",
      body: "We take a real process from your business and improve it with AI, from the first prototype to a working solution in production.",
      tags: ["Real process", "Prototype", "Production"],
    },
    {
      n: "03",
      priceFrom: 2500,
      price: "From $2,500",
      meta: "web",
      title: "Web applications",
      body: "Client portals, admin panels, booking systems and internal tools that replace spreadsheets.",
      tags: ["Panels and systems", "Fewer spreadsheets", "Integrations"],
    },
    {
      n: "04",
      priceFrom: 2500,
      price: "From $2,500",
      meta: "mobile",
      title: "Mobile apps",
      body: "iOS and Android apps, as part of a larger system or standalone, shipped to the App Store and Google Play.",
      tags: ["iOS and Android", "PWA"],
    },
    {
      n: "05",
      priceFrom: 500,
      price: "From $500",
      meta: "websites",
      title: "Websites",
      body: "Fast websites that say in seconds what you do and turn visits into inquiries. Visible in search engines and to AI alike.",
      tags: ["SEO", "GEO"],
    },
    {
      n: "06",
      price: "Individual quote",
      meta: "audit",
      title: "Application audit",
      body: "Code, architecture, security and performance reviewed, with a clear list of what to fix first.",
      tags: ["Report", "Priority checklist", "Security and performance"],
    },
    {
      n: "07",
      priceFrom: 29,
      priceUnit: "MONTH",
      price: "From $29 / month",
      meta: "care",
      title: "Maintenance and development",
      body: "Fixes, updates, monitoring and new features across the system's whole lifecycle.",
      tags: ["Ongoing support", "New features"],
    },
  ],
  models: {
    label: "ways to start with ai",
    heading: "AI projects: start small. Keep what works.",
    items: [
      { len: "1 to 2 weeks", price: "Individual quote", t: "Discovery", d: "Workshops with your team, a map of where AI fits, and a recommendation with effort and risk." },
      {
        len: "4 to 8 weeks",
        price: "Individual quote",
        t: "Pilot",
        d: "One use case built end to end on your data and put in front of real users, with numbers at the end.",
        featured: true,
      },
    ],
  },
  faq: {
    label: "questions",
    heading: "Before you ask.",
    items: [
      { q: "Do you work remotely?", a: "Yes. I am based in Wrocław, Poland, and work remotely with teams worldwide. On-site workshops are possible." },
      {
        q: "What do you build with?",
        a: "Proven, popular tools, so any good team can take the project over: Google Cloud, Firebase, Python, TypeScript, Angular, React and NestJS.",
        logos: ["googlecloud", "firebase", "python", "typescript", "angular", "react", "nestjs"],
      },
      {
        q: "How much does it cost?",
        a: "Websites start from $500, web and mobile apps from $2,500, and ongoing care from $29 a month, all net of VAT. AI projects and audits are quoted individually. The final price depends on scope, and you get it in writing before anything starts.",
      },
      {
        q: "How does payment work?",
        a: "A deposit to start and the rest after you accept the work. You get a VAT invoice.",
      },
      { q: "Who owns the result?", a: "You do. Code, documentation and designs go to your team." },
      {
        q: "How do you keep AI features safe?",
        a: "I build on the OWASP Top 10 for LLM Applications: protection against prompt injection, data leaks and agents with too much power. An agent gets only the permissions it needs, and actions with real consequences wait for a person to approve them. On Firebase and Google Cloud I use the platform's own security: security rules, App Check, IAM and Secret Manager.",
      },
    ] as FaqItem[],
  },
};
