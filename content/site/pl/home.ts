import type { HOME as EN } from "../home";

export const HOME: typeof EN = {
  hero: {
    groups: ["aplikacje\ni strony\nna miarę", "workflowy AI\ndla realnych\nprocesów", "bezpieczne\nna produkcji"],
    h1: "Oprogramowanie\ndla prawdziwego biznesu.",
    cta: "Bezpłatna konsultacja (30 min)",
    ctaNote: "Bez zobowiązań · odpowiadam w 1 dzień roboczy",
    cta2: "Zobacz wdrożenia",
    captions: ["aplikacje i strony", "workflowy AI", "gotowe na produkcję"],
  },
  intro: "Buduję aplikacje, strony i workflowy AI dla firm i dbam o to, żeby działały na produkcji.",
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
        body: "Bierzemy realny proces z Twojej firmy i usprawniamy go z pomocą AI, od pierwszego prototypu po działające rozwiązanie na produkcji.",
        featured: true,
      },
      {
        n: "03",
        meta: "oprogramowanie",
        title: "Aplikacje, strony i opieka",
        body: "Aplikacje, strony, audyty i opieka. Strony od 1 900 zł, aplikacje od 9 000 zł netto.",
      },
    ],
  },
  cases: { heading: "Wdrożenia", all: "Wszystkie wdrożenia" },
  how: {
    heading: "Jak pracuję",
    steps: [
      {
        n: "01",
        tab: "Problem",
        t: "Zaczynamy od Twojego problemu",
        d: "Zaczynamy od audytu: poznaję Twój biznes i procesy, wybieramy proces, z którym masz problem, i ustalamy, jak go naprawić.",
        points: ["Tylko to, czego potrzebujesz: bez aplikacji natywnej, gdy wystarczy PWA, bez platformy, gdy wystarczy workflow. Nie płacisz za nadmiar."],
      },
      {
        n: "02",
        tab: "Dane",
        t: "Sprawdzamy na Twoich danych",
        d: "W kilka dni dostajesz prototyp i testujesz go z ludźmi, którzy będą z niego korzystać.",
        points: [
          "Twoje dane pozostają bezpieczne przez cały czas pracy.",
          "AI proponuje, ja zatwierdzam: AI przyspiesza pracę, a każdą zmianę sprawdzam, zanim do Ciebie trafi.",
        ],
      },
      {
        n: "03",
        tab: "Produkcja",
        t: "Wdrażamy na produkcję",
        d: "Testy, zabezpieczenia i monitoring, zanim rozwiązanie trafi do wszystkich.",
        points: [
          "Korzystam z ustandaryzowanych narzędzi i opieram się na sprawdzonej platformie, więc jakość i bezpieczeństwo nie zależą od kodu pisanego od zera.",
          "Reguły są w kodzie i testach, nie w promptach. Dzięki deterministycznemu kodowi i procesowi wydań rozwiązanie działa stabilnie.",
        ],
      },
      {
        n: "04",
        tab: "Przekazanie",
        t: "Przekazuję Ci całość",
        d: "Kod, dokumentacja i wiedza trafiają do Ciebie. Jestem pod ręką, ale nie jestem niezbędny.",
        points: ["Metryki, monitoring i logi pokazują, czy rozwiązanie robi swoje."],
      },
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
