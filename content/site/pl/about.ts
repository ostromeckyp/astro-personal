import { ABOUT as EN } from "../about";

const D = [
  "Builder formularzy dla platformy rejestrowej: dynamiczne generowanie i walidacja formularzy w monorepo Nx.",
  "Rozwój funkcji i złożone komponenty UI dla platform master data management; optymalizacja monorepo.",
  "Główne funkcje aplikacji do zarządzania parkingami, z natywną integracją aparatu, powiadomień push i sieci na Androidzie i iOS.",
  "ERP klasy enterprise dla branży motoryzacyjnej; migracja dwóch aplikacji mobilnych z Ionic 3 / Cordova do Nx, Ionic 6 i Capacitor 5.",
  "Panel administracyjny SPA i wielokrotnego użytku widżet mapy dla wiodącego brokera przesyłek w Polsce.",
  "Platforma rezerwacyjna, back office i landing page dla linii lotniczej; funkcje ERP dla dystrybutora alkoholi.",
  "Krytyczne aplikacje enterprise dla wojska, energetyki i produkcji.",
];

export const ABOUT: typeof EN = {
  portraitAlt: "Portret Pawła Ostromeckiego",
  label: "o mnie",
  h1: "Cześć, jestem Paweł.",
  p1: "Jestem senior software engineerem. Od lat siedzę głęboko w Angularze, TypeScripcie i szerszym ekosystemie JavaScriptu, buduję złożone aplikacje produkcyjne i bardzo zależy mi na czystej architekturze, wydajności i wygodzie pracy programistów.",
  p2: "Równie dobrze czuję się na backendzie w Node.js, NestJS czy Springu. Ostatnio moja praca leży na styku inżynierii oprogramowania i AI: agenci, workflowy LLM i MCP, budowane tak, żeby przetrwały kontakt z prawdziwymi użytkownikami. Kończę studia magisterskie z informatyki (systemy inteligentne) na Politechnice Opolskiej.",
  p3: "Uczenie innych jest dla mnie tak samo ważne jak inżynieria. Prowadzę społeczność Angular Wrocław (meetupy, prelekcje, warsztaty, mentoring), a moje projekty open source znajdziesz na GitHubie jako",
  github: EN.github,
  cta: "Napisz do mnie",
  cv: "Pobierz CV (PDF)",
  experience: {
    label: "doświadczenie",
    heading: "Osiem lat, wiele branż.",
    sub: "Finanse, motoryzacja, regtech, master data, logistyka, turystyka i oprogramowanie enterprise dla sektora obronnego i energetyki.",
    jobs: EN.experience.jobs.map((job, i) => ({ ...job, when: job.when.replace("now", "teraz"), d: D[i] })),
  },
  education: {
    label: "wykształcenie",
    items: [
      { t: "Magister informatyki, systemy inteligentne", d: "Politechnika Opolska · 2025 – teraz" },
      { t: "Inżynier informatyki", d: "WWSIS Wrocław · 2017 – 2021" },
    ],
  },
  stack: EN.stack,
  strengths: EN.strengths,
};
