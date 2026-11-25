import type { ABOUT as EN } from "../about";

export const ABOUT: typeof EN = {
  portraitAlt: "Portret Pawła Ostromeckiego",
  label: "o mnie",
  h1: "Cześć, jestem Paweł.",
  p1: "Pomagam firmom wprowadzić AI do codziennych procesów i buduję do tego oprogramowanie: aplikacje webowe i mobilne, strony internetowe i opiekę po wdrożeniu.",
  p2: "Pracujesz bezpośrednio ze mną, od pierwszej rozmowy po wsparcie po starcie. Mówię wcześnie, kiedy coś się nie opłaci, i buduję etapami, które widzisz i oceniasz po drodze. Na koniec kod, dokumentacja i wiedza zostają w Twoim zespole.",
  p3: "Tłumaczenie decyzji technicznych prostym językiem to część mojej pracy. Prowadzę społeczność Angular Wrocław (meetupy, prelekcje, warsztaty), a moje projekty open source znajdziesz na GitHubie jako",
  github: { href: "https://github.com/ostromeckyp", label: "@ostromeckyp" },
  sections: [
    {
      id: "what-i-do",
      heading: "Czym się zajmuję",
      body: [
        "Buduję dla firm aplikacje webowe i mobilne, strony internetowe i workflowy AI, a do tego audytuję i utrzymuję systemy, które już działają. AI wprowadzam tam, gdzie się opłaca: do realnego procesu, a każde działanie z prawdziwymi skutkami zatwierdza człowiek.",
        "Mieszkam we Wrocławiu i pracuję zdalnie z zespołami z całego świata. Warsztaty na miejscu są możliwe. Pracuję po polsku i po angielsku.",
      ],
    },
    {
      id: "experience",
      heading: "Doświadczenie",
      body: [
        "Od ośmiu lat buduję systemy, na których polegają firmy, a dziś skupiam się na fintechu, regtechu i e-commerce. Pracowałem jako fullstack i frontend developer, w zespołach produktowych i jako freelancer. Po stronie backendu znam Javę i Node.js.",
        "Po drodze były m.in. aplikacje enterprise, platforma logistyczna dla e-commerce z dużym ruchem, kreator formularzy drag-and-drop używany w wielu systemach produkcyjnych i nowa aplikacja na iOS i Androida zbudowana od zera. Projektuję modułowe frontendy i odpowiadam za decyzje architektoniczne od początku do końca.",
        "Równolegle robię magisterkę z informatyki na Politechnice Opolskiej, ze specjalizacją systemy inteligentne.",
      ],
    },
    {
      id: "technologies",
      heading: "Z czego korzystam",
      body: [
        "Ze sprawdzonych, popularnych narzędzi, żeby każdy dobry zespół mógł przejąć projekt: Google Cloud, Firebase, Python, TypeScript, Angular, React i NestJS.",
        "Funkcje AI buduję zgodnie z OWASP Top 10 for LLM Applications. Agent dostaje tylko te uprawnienia, których potrzebuje.",
      ],
    },
  ],
  community: {
    heading: "Społeczność i wystąpienia",
    talks: "Ostatnio m.in. panel Cloud na GDG DevFest Wrocław 2026 i CSHARK TechTalk o tym, jak zmieniła się rola frontend developera.",
    talksLink: "Wszystkie wystąpienia",
  },
  cta: "Umów bezpłatną konsultację",
  cv: "Pobierz CV (PDF)",
  facts: {
    label: "w skrócie",
    items: [
      { v: "8 lat", t: "budowania systemów, na których firmy polegają na co dzień" },
      { v: "Fintech, regtech, e-commerce", t: "branże, na których się skupiam" },
      { v: "Angular Wrocław", t: "prowadzę społeczność: meetupy, prelekcje i warsztaty" },
    ],
  },
};
