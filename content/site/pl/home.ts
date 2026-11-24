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
        body: "Sprawdzone na Twoich danych, wdrażane tylko wtedy, gdy się opłaca.",
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
        d: "Zaczynamy od procesu, z którym masz problem, i od liczby, którą chcesz poprawić.",
        rule: "Tylko to, czego potrzebujesz: bez aplikacji natywnej, gdy wystarczy PWA, bez platformy, gdy wystarczy workflow. Nie płacisz za nadmiar.",
      },
      {
        n: "02",
        tab: "Dane",
        t: "Sprawdzamy na Twoich danych",
        d: "W kilka tygodni dostajesz działający wycinek i testujesz go z ludźmi, którzy będą z niego korzystać.",
        rule: "AI proponuje, ja zatwierdzam: AI przyspiesza pracę, a każdą zmianę sprawdzam, zanim do Ciebie trafi.",
      },
      {
        n: "03",
        tab: "Produkcja",
        t: "Wdrażamy na produkcję",
        d: "Testy, zabezpieczenia i monitoring, zanim rozwiązanie trafi do wszystkich.",
        rule: "Reguły, które mają znaczenie, żyją w kodzie i testach, nie w promptach. To one trzymają całość w ryzach.",
      },
      {
        n: "04",
        tab: "Przekazanie",
        t: "Przekazuję Ci całość",
        d: "Kod, dokumentacja i wiedza trafiają do Ciebie. Jestem pod ręką, ale nie jestem niezbędny.",
        rule: "Metryki, monitoring i logi pokazują, czy rozwiązanie robi swoje. Wiesz to z danych, nie z założeń.",
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
