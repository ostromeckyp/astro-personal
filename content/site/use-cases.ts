export type UseCase = {
  n: string;
  slug: "salon-replenishment" | "no-code-forms";
  href: string;
  image: string;
  imagePosition: string;
  alt: string;
  tag: string;
  title: string;
  summary: string;
  homeTag: string;
  homeTitle: string;
  homeBody: string;
  tags: string[];
};

export const USE_CASES: UseCase[] = [
  {
    n: "01",
    slug: "salon-replenishment",
    href: "/use-cases/salon-replenishment",
    image: "/images/use-cases/salon-cover.jpg",
    imagePosition: "50% 50%",
    alt: "Salon inventory with an AI assistant turning a Polish request into an order proposal",
    tag: "beauty and barber retail",
    title: "Agentic replenishment for a salon network",
    summary:
      "Salons order stock from HQ in plain language. An AI agent turns the request into a checked proposal, blocks duplicates and tracks every delivery. The salon side is a phone-first PWA with push notifications instead of native apps.",
    homeTag: "beauty retail · agentic replenishment",
    homeTitle: "Salons order stock in plain language",
    homeBody:
      'An AI agent turns "we need 6 Mattifier" into a checked order, with guardrails, delivery tracking and a phone-first PWA.',
    tags: ["AI agent", "RAG", "PWA", "Human approval"],
  },
  {
    n: "02",
    slug: "no-code-forms",
    href: "/use-cases/no-code-forms",
    image: "/images/use-cases/forms-cover.jpg",
    imagePosition: "50% 50%",
    alt: "No-code form designer with a component palette and a multi-step registration form",
    tag: "regtech · client work",
    title: "No-code forms for a regulated industry",
    summary:
      "A client-owned drag-and-drop platform for compliance forms. I contribute to product design and architecture as a contractor, and now to an MCP server that lets an AI agent draft forms for a person to review.",
    homeTag: "regtech · client work",
    homeTitle: "No-code forms for a regulated industry",
    homeBody: "I contribute to a client's drag-and-drop form platform, and to the MCP server that brings an AI agent into it.",
    tags: ["Angular", "OpenAPI", "MCP", "AI agent"],
  },
];
