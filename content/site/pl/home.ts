import type { HOME as EN } from "../home";

export const HOME: typeof EN = {
  hero: {
    alt: "Paweł Ostromecki na wprost, z wąskim pasmem światła na oczach i różową poświatą za głową",
    groups: ["workflowy AI\ndla realnych\nprocesów", "oprogramowanie,\nktóre działa\npo demo", "bezpieczne\nna produkcji"],
    h1: "Prawdziwe AI\ndla prawdziwego biznesu.",
    cta: "Umów konsultację",
    cta2: "Zobacz wdrożenia",
    captions: ["workflowy AI", "inżynieria oprogramowania", "gotowe na produkcję"],
  },
  intro: "Wprowadzam AI do procesów, które Twój zespół wykonuje na co dzień, i buduję je tak, żeby działało na produkcji.",
  introBody:
    "Jestem senior software engineerem i konsultantem z Wrocławia. Od ośmiu lat buduję systemy produkcyjne dla finansów, motoryzacji, regtechu i e-commerce. Dziś większość mojej pracy to pytanie, gdzie AI pasuje do oprogramowania, na którym ludzie polegają.",
  stack: ["AI agents", "LLM workflows", "MCP", "TypeScript", "Angular · Nx", "NestJS"],
  services: {
    heading: "Czym się zajmuję",
    all: "Wszystkie usługi",
    items: [
      {
        n: "01",
        meta: "workflowy",
        title: "Workflowy AI",
        body: "Bierzemy ręczny proces, projektujemy wokół niego workflow z agentem lub LLM i podłączamy do narzędzi, z których zespół już korzysta.",
      },
      {
        n: "02",
        meta: "najczęściej",
        title: "AI w realnych przypadkach biznesowych",
        body: "Znajdujemy miejsca, gdzie AI naprawdę oszczędza czas lub pieniądze, sprawdzamy je na Twoich danych i zamieniamy ten, który działa, w produkt, z którego ludzie korzystają.",
        featured: true,
      },
      {
        n: "03",
        meta: "inżynieria",
        title: "Bezpieczne oprogramowanie gotowe na produkcję",
        body: "Bezpieczne, obserwowalne i łatwe w utrzymaniu systemy, które Twój zespół może przejąć. Architektura frontendu (Angular, Nx) to jedna z moich głównych specjalizacji.",
      },
    ],
  },
  cases: { heading: "Wdrożenia", all: "Wszystkie wdrożenia" },
  how: {
    heading: "Jak pracuję",
    all: "Cały proces",
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
    heading: "Przede wszystkim inżynier. Z nawyku nauczyciel.",
    body: "Prowadzę społeczność Angular Wrocław: meetupy, prelekcje i warsztaty. Kończę też studia magisterskie z informatyki, specjalność systemy inteligentne. Dostajesz kogoś, kto pisze kod produkcyjny i potrafi wytłumaczyć każdą decyzję zespołowi, który go przejmie.",
    more: "Więcej o mnie",
    talks: "Wystąpienia i społeczność",
  },
  post: { label: "najnowszy wpis", read: "Przeczytaj" },
};
