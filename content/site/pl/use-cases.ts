import { USE_CASES as EN, type USE_CASES_PAGE as P, type UseCase } from "../use-cases";

export const USE_CASES_PAGE: typeof P = {
  label: "wdrożenia",
  h1: "AI w pracy, nie na demo.",
  intro: "Prawdziwe systemy z prawdziwymi użytkownikami. Każdy pokazuje problem biznesowy, miejsce AI w procesie i to, co trzyma je w ryzach.",
  read: "Zobacz wdrożenie",
};

export const USE_CASES: UseCase[] = [
  {
    ...EN[0],
    alt: "Magazyn salonu z asystentem AI zamieniającym prośbę po polsku w propozycję zamówienia",
    tag: "branża beauty i barber",
    title: "Agentowe zamówienia dla sieci salonów",
    summary:
      "Salony zamawiają towar z centrali zwykłym językiem. Agent AI zamienia prośbę w sprawdzoną propozycję, blokuje duplikaty i śledzi każdą dostawę. Po stronie salonu działa PWA na telefon z powiadomieniami push zamiast aplikacji natywnych.",
    homeTag: "branża beauty · agentowe zamówienia",
    homeTitle: "Salony zamawiają towar zwykłym językiem",
    homeBody: "Agent AI zamienia „potrzebujemy 6 Mattifierów” w sprawdzone zamówienie, z zabezpieczeniami, śledzeniem dostaw i PWA na telefon.",
    tags: ["Agent AI", "RAG", "PWA", "Człowiek zatwierdza"],
  },
  {
    ...EN[1],
    alt: "Projektant formularzy no-code z paletą komponentów i wieloetapowym formularzem rejestracyjnym",
    tag: "regtech · praca dla klienta",
    title: "Formularze no-code dla branży regulowanej",
    summary:
      "Należąca do klienta platforma do budowy formularzy compliance metodą przeciągnij i upuść. Jako kontraktor współtworzę projekt produktu i architekturę, a teraz także serwer MCP, dzięki któremu agent AI przygotowuje szkice formularzy do przeglądu przez człowieka.",
    homeTag: "regtech · praca dla klienta",
    homeTitle: "Formularze no-code dla branży regulowanej",
    homeBody: "Współtworzę platformę klienta do budowy formularzy metodą przeciągnij i upuść oraz serwer MCP, który wprowadza do niej agenta AI.",
    tags: ["Angular", "OpenAPI", "MCP", "Agent AI"],
  },
];
