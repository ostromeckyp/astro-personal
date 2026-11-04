export const APPROACH = {
  label: "approach",
  h1: "From business case to production.",
  intro: "Four stages. Each one ends in something you can see and judge, and you can stop after any of them and keep what was built.",
  outLabel: "you get",
  stages: [
    {
      n: "01",
      t: "Find the real case",
      d: "We start from a process your team runs today and a number that matters: hours, errors, lead time. If AI will not move that number, I say so early.",
      out: "A short list of use cases ranked by value and risk, with a recommendation.",
    },
    {
      n: "02",
      t: "Prove it on your data",
      d: "One use case, built as a thin working slice on your real data and put in front of the people who will use it.",
      out: "A working pilot and a before and after comparison you can show stakeholders.",
    },
    {
      n: "03",
      t: "Harden for production",
      d: "Rules in code, a person approving where mistakes are expensive, monitoring, tests and a security review before it reaches everyone.",
      out: "A system that runs safely with real users and tells you when something goes wrong.",
    },
    {
      n: "04",
      t: "Hand over",
      d: "Documentation, walkthroughs and pairing so your team owns it. I stay available, but you do not need me to keep it running.",
      out: "Code, docs and knowledge in your hands.",
    },
  ],
  principles: {
    label: "principles",
    heading: "What does not change between projects.",
    items: [
      { t: "People approve, AI proposes", d: "Agents draft and suggest. Anything that moves money, stock or data waits for a person." },
      { t: "Rules in code", d: "The rules that matter live in software and tests, not only in a prompt." },
      { t: "Measured, not assumed", d: "Every feature is judged against the process it replaces." },
      { t: "Only what you need", d: "No native app when a PWA will do. No platform when a workflow will do." },
    ],
  },
};
