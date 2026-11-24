import type { HOME as EN } from "../home";

export const HOME: typeof EN = {
  hero: {
    groups: ["workflowy AI\ndla realnych\nprocesów", "oprogramowanie,\nktóre działa\npo demo", "bezpieczne\nna produkcji"],
    h1: "Prawdziwe AI\ndla prawdziwego biznesu.",
    cta: "Bezpłatna konsultacja (30 min)",
    ctaNote: "Bez zobowiązań · odpowiadam w 1 dzień roboczy",
    cta2: "Zobacz wdrożenia",
    captions: ["workflowy AI", "inżynieria oprogramowania", "gotowe na produkcję"],
  },
  intro: "Wprowadzam AI do procesów, które Twój zespół wykonuje na co dzień, i buduję je tak, żeby działało na produkcji.",
  introBody:
    "Od ośmiu lat buduję systemy, na których polegają firmy z finansów, motoryzacji, regtechu i e-commerce.",
  services: {
    heading: "Czym się zajmuję",
    all: "Wszystkie usługi",
    items: [
      {
        n: "01",
        meta: "workflowy",
        title: "Workflowy AI",
        body: "Ręczne procesy zamienione w workflowy AI w narzędziach, których już używasz.",
      },
      {
        n: "02",
        meta: "najczęściej",
        title: "AI w realnych przypadkach biznesowych",
        body: "Sprawdzone na Twoich danych, wdrażane tylko wtedy, gdy się opłaca.",
        featured: true,
      },
      {
        n: "03",
        meta: "oprogramowanie",
        title: "Aplikacje, strony i opieka",
        body: "Aplikacje, strony, audyty i opieka. Strony od 1 900 zł, aplikacje od 9 000 zł netto.",
        href: "/services#software",
      },
    ],
  },
  cases: { heading: "Wdrożenia", all: "Wszystkie wdrożenia" },
  how: {
    heading: "Jak pracuję",
    steps: [
      { n: "01", t: "Znajdujemy prawdziwy przypadek", d: "Zaczynamy od procesu i liczby, nie od modelu." },
      { n: "02", t: "Sprawdzamy na Twoich danych", d: "Mały działający wycinek w kilka tygodni, oceniany przez ludzi, którzy będą z niego korzystać." },
      { n: "03", t: "Przygotowujemy na produkcję", d: "Zabezpieczenia, zatwierdzanie przez człowieka, monitoring i testy, zanim rozwiązanie trafi do wszystkich." },
      { n: "04", t: "Przekazujemy zespołowi", d: "Udokumentowane i w rękach Twojego zespołu." },
    ],
  },
  about: {
    portraitAlt: "Portret Pawła Ostromeckiego",
    label: "o mnie",
    heading: "Rozmawiasz z osobą, która to buduje.",
    body: "Bez opiekunów klienta i przekazywania dalej. Od pierwszej rozmowy po opiekę po starcie pracujesz bezpośrednio ze mną.",
    more: "Więcej o mnie",
    talks: "Wystąpienia i społeczność",
  },
  post: { label: "najnowszy wpis", read: "Przeczytaj" },
};
