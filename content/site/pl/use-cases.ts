import { USE_CASES as EN, type USE_CASES_PAGE as P, type UseCase } from "../use-cases";

export const USE_CASES_PAGE: typeof P = {
  label: "wdrożenia",
  h1: "AI na produkcji, nie na demo.",
  intro: "Prawdziwe systemy z prawdziwymi użytkownikami. Każdy pokazuje problem biznesowy, miejsce AI w procesie i to, co trzyma je w ryzach.",
  read: "Zobacz wdrożenie",
  back: "Wszystkie wdrożenia",
};

export const USE_CASES: UseCase[] = [
  {
    ...EN[0],
    alt: "Magazyn salonu z asystentem AI zamieniającym prośbę po polsku w propozycję zamówienia",
    tag: "branża beauty i barber",
    title: "Agentowe zamówienia dla sieci salonów",
    summary:
      "Salony zamawiają towar z centrali zwykłym językiem. Agent AI zamienia prośbę w sprawdzoną propozycję, blokuje duplikaty i śledzi każdą dostawę. Salony korzystają z niego na telefonie, z powiadomieniami, bez instalowania aplikacji ze sklepu.",
    homeTag: "branża beauty · agentowe zamówienia",
    homeTitle: "Salony zamawiają towar zwykłym językiem",
    homeBody: "Agent AI zamienia „potrzebujemy 6 Mattifierów” w sprawdzone zamówienie, z kontrolą błędów, śledzeniem dostaw i aplikacją działającą na każdym telefonie.",
    tags: ["Zamówienia zwykłym językiem", "Bez podwójnych zamówień", "Człowiek zatwierdza"],
  },
  {
    ...EN[1],
    alt: "Projektant formularzy no-code z paletą komponentów i wieloetapowym formularzem rejestracyjnym",
    tag: "regtech · praca dla klienta",
    title: "Formularze no-code dla branży regulowanej",
    summary:
      "Należąca do klienta platforma do budowy formularzy compliance metodą przeciągnij i upuść. Jako kontraktor współtworzę projekt produktu i architekturę, a teraz także asystenta AI, który przygotowuje szkice formularzy do przeglądu przez człowieka.",
    homeTag: "regtech · praca dla klienta",
    homeTitle: "Formularze no-code dla branży regulowanej",
    homeBody: "Współtworzę platformę klienta do budowy formularzy metodą przeciągnij i upuść oraz asystenta AI, który przygotowuje w niej szkice formularzy.",
    tags: ["Formularze bez kodu", "AI szkicuje, człowiek sprawdza"],
  },
];
