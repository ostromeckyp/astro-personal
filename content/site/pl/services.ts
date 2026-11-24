import type { SERVICES as EN } from "../services";

export const SERVICES: typeof EN = {
  label: "usługi",
  h1: "Oprogramowanie dla Twojej firmy. Z AI tam, gdzie się opłaca.",
  intro:
    "Aplikacje webowe i mobilne, strony, workflowy AI, audyty i opieka po starcie.",
  priceLabel: "cena",
  priceNote: "Ceny orientacyjne netto (plus 23% VAT). Ostateczną cenę podaję w wycenie na piśmie po bezpłatnej 30-minutowej rozmowie.",
  prev: "Poprzednie usługi",
  next: "Następne usługi",
  items: [
    {
      n: "01",
      price: "Wycena indywidualna",
      meta: "workflowy",
      title: "Workflowy AI",
      body: "Ręczny, powtarzalny proces zamieniony w workflow z AI, podłączony do narzędzi, których zespół już używa.",
      tags: ["Mniej ręcznej pracy", "Człowiek zatwierdza"],
    },
    {
      n: "02",
      price: "Wycena indywidualna",
      meta: "najczęściej",
      featured: true,
      title: "AI w realnych przypadkach biznesowych",
      body: "Testujemy pomysły na AI na Twoich danych, a ten, który się opłaca, zamieniamy w produkt.",
      tags: ["Test na Twoich danych", "Prototyp → produkcja"],
    },
    {
      n: "03",
      price: "Od 9 000 zł netto",
      meta: "web",
      title: "Aplikacje webowe",
      body: "Panele klienta, systemy rezerwacji i narzędzia wewnętrzne zamiast arkuszy.",
      tags: ["Panele i systemy", "Mniej arkuszy"],
    },
    {
      n: "04",
      price: "Od 9 000 zł netto",
      meta: "mobile",
      title: "Aplikacje mobilne",
      body: "iOS i Android z jednego kodu albo uczciwe „wystarczy aplikacja webowa”.",
      tags: ["iOS i Android", "Jeden kod"],
    },
    {
      n: "05",
      price: "Od 1 900 zł netto",
      meta: "strony",
      title: "Strony internetowe",
      body: "Szybkie strony, które w kilka sekund mówią, co robisz, i zamieniają odwiedziny w zapytania.",
      tags: ["Szybka", "Więcej zapytań"],
    },
    {
      n: "06",
      price: "Wycena indywidualna",
      meta: "audyt",
      title: "Audyt aplikacji",
      body: "Przegląd kodu, architektury, bezpieczeństwa i wydajności z listą, co naprawić najpierw.",
      tags: ["Jasny raport", "Priorytety napraw"],
    },
    {
      n: "07",
      price: "Od 99 zł / mies. netto",
      meta: "opieka",
      title: "Utrzymanie i rozwój",
      body: "Poprawki, aktualizacje, monitoring i nowe funkcje po starcie, bez zatrudniania.",
      tags: ["Opieka miesięczna", "Nowe funkcje"],
    },
  ],
  models: {
    label: "jak zacząć z ai",
    heading: "Projekty AI: zacznij od małego. Zostaw to, co działa.",
    items: [
      { len: "1 do 2 tygodni", price: "Wycena indywidualna", t: "Discovery", d: "Warsztaty z zespołem, mapa miejsc, gdzie AI ma sens, i rekomendacja z szacunkiem nakładu i ryzyka." },
      {
        len: "4 do 8 tygodni",
        price: "Wycena indywidualna",
        t: "Pilotaż",
        d: "Jeden przypadek zbudowany od początku do końca na Twoich danych i oddany prawdziwym użytkownikom, z liczbami na koniec.",
        featured: true,
      },
    ],
  },
  faq: {
    label: "pytania",
    heading: "Zanim zapytasz.",
    items: [
      { q: "Pracujesz zdalnie?", a: "Tak. Mieszkam we Wrocławiu i pracuję zdalnie z zespołami z całego świata. Warsztaty na miejscu są możliwe." },
      {
        q: "Z czego korzystasz?",
        a: "Ze sprawdzonych, popularnych narzędzi, żeby każdy dobry zespół mógł przejąć projekt: Google Cloud, Firebase, Python, TypeScript, Angular, React i NestJS.",
        logos: ["googlecloud", "firebase", "python", "typescript", "angular", "react", "nestjs"],
      },
      {
        q: "Ile to kosztuje?",
        a: "Strony internetowe od 1 900 zł netto, aplikacje webowe i mobilne od 9 000 zł netto, stała opieka od 99 zł netto miesięcznie. Projekty AI i audyty wyceniam indywidualnie. Ostateczna cena zależy od zakresu i dostajesz ją na piśmie, zanim cokolwiek się zacznie.",
      },
      {
        q: "Jak wygląda płatność?",
        a: "Zaliczka na start, reszta po odbiorze. Wystawiam fakturę VAT.",
      },
      { q: "Kto jest właścicielem wyniku?", a: "Ty. Kod, dokumentacja i projekty trafiają do Twojego zespołu." },
      {
        q: "Jak dbasz o bezpieczeństwo funkcji AI?",
        a: "Opieram się na OWASP Top 10 for LLM Applications: zabezpieczam przed prompt injection, wyciekiem danych i nadmiernymi uprawnieniami agentów. Agent dostaje tylko te uprawnienia, których potrzebuje, a działania z realnymi skutkami czekają na zatwierdzenie przez człowieka. Na Firebase i Google Cloud korzystam z mechanizmów bezpieczeństwa platformy: reguł bezpieczeństwa, App Check, IAM i Secret Managera.",
      },
    ],
  },
};
