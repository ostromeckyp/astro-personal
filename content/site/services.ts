export const SERVICES = {
  label: "services",
  h1: "Three ways I can help.",
  intro:
    "Most projects start with one question: where would AI actually save your team time or money, and what does it take to run that safely? From there I design, build and hand over.",
  getLabel: "what you get",
  fitLabel: "a good fit if",
  items: [
    {
      n: "01",
      meta: "workflows",
      title: "AI workflows",
      body: "Take a manual, repetitive process such as ordering, ticket triage, document checks or data entry. I design an LLM or agent workflow around it and plug it into the tools your team already uses.",
      get: [
        "A map of the process with the steps worth automating",
        "A workflow design with clear points where a person decides",
        "Integration with your systems through APIs or MCP",
        "A working version your team can try within weeks",
      ],
      fit: "your team repeats the same low-judgement work every day and you suspect AI could do most of it.",
      tags: ["AI agents", "LLM", "MCP"],
    },
    {
      n: "02",
      meta: "most common",
      featured: true,
      title: "AI in real business cases",
      body: "Separate the use cases that pay off from the ones that only demo well. We test on your data, measure against today's process, and turn the winner into a product people use.",
      get: [
        "Short discovery: where AI actually saves time or money",
        "A proof of concept on your real data",
        "A before and after comparison you can show stakeholders",
        "A plan from proof of concept to production",
      ],
      fit: "you have seen impressive AI demos and need to know what works for your business, and what it costs to run.",
      tags: ["Discovery", "PoC → production", "Business value"],
    },
    {
      n: "03",
      meta: "engineering",
      title: "Safe, production-ready software",
      body: "AI features and the software around them, built so they keep working: secure, observable, tested and maintainable by your team. Frontend architecture with Angular, Nx and microfrontends is one of my core strengths.",
      get: [
        "Architecture review with a prioritised plan",
        "Hands-on engineering in your codebase",
        "Guardrails, monitoring and tests for AI features",
        "Documentation and handover to your team",
      ],
      fit: "you need senior engineering that ships, or an AI prototype has to survive real users.",
      tags: ["TypeScript", "NestJS", "Angular · Nx"],
    },
  ],
  models: {
    label: "ways to work together",
    heading: "Start small. Keep what works.",
    items: [
      { len: "1 to 2 weeks", t: "Discovery", d: "Workshops with your team, a map of where AI fits, and a recommendation with effort and risk." },
      {
        len: "4 to 8 weeks",
        t: "Pilot",
        d: "One use case built end to end on your data and put in front of real users, with numbers at the end.",
        featured: true,
      },
      { len: "ongoing", t: "Fractional engineering", d: "A few days a month of senior engineering and architecture ownership while your team grows into it." },
    ],
  },
  faq: {
    label: "questions",
    heading: "Before you ask.",
    items: [
      { q: "Do you work remotely?", a: "Yes. I am based in Wrocław, Poland, and work remotely with teams worldwide. On-site workshops are possible." },
      {
        q: "Which AI models and tools do you use?",
        a: "Whatever fits the case and your constraints: hosted models, open models or a mix. The workflow design matters more than the model name.",
      },
      { q: "Who owns the result?", a: "You do. Code, documentation and designs go to your team." },
      {
        q: "How do you keep AI features safe?",
        a: "A person approves where it matters, the rules live in code rather than only in prompts, and everything is monitored and tested on your real data before it scales.",
      },
    ],
  },
};
