import type { ARTICLE as A, BLOG as B } from "../blog";

export const BLOG: typeof B = {
  label: "blog",
  h1: "Notatki z pracy.",
  intro: "O AI w prawdziwej inżynierii, Angularze i zarządzaniu stanem bez zbędnych bibliotek. Wpisy są po angielsku.",
  read: "Czytaj",
  latest: "najnowszy",
  readingTime: "ok. {n} min",
  filterLabel: "Filtruj wpisy według tematu",
  viewLabel: "Widok",
  grid: "Siatka",
  list: "Lista",
  postsLabel: "Wpisy",
  empty: "Nie ma jeszcze wpisów w tym temacie.",
  topics: [
    { value: "all", label: "Wszystkie" },
    { value: "Artificial Intelligence", label: "Sztuczna inteligencja" },
    { value: "Angular", label: "Angular" },
  ],
};

export const ARTICLE: typeof A = {
  back: "Wszystkie wpisy",
  readingTime: "ok. {n} min czytania · po angielsku",
  onlyEnglish: "Ten wpis jest dostępny tylko po angielsku.",
  author: "Paweł Ostromecki",
  role: "Senior software engineer, Wrocław",
  toc: "w tym wpisie",
  tocLabel: "Spis treści",
  shareLinkedIn: "Udostępnij na LinkedIn",
  shareX: "Udostępnij na X",
  copy: "Kopiuj link",
  copied: "Skopiowano",
  copyFailed: "Nie udało się skopiować",
  authorAlt: "Portret Pawła Ostromeckiego",
  bio: "Senior software engineer i konsultant. Wprowadzam AI do realnych procesów biznesowych i buduję je tak, żeby działało na produkcji. Prowadzę Angular Wrocław.",
  cta: "Porozmawiajmy",
  more: "Więcej z bloga",
  all: "Wszystkie wpisy",
};

/** Post text stays English; the list shows these Polish summaries. Keyed by slug. */
export const POST_COPY: Record<string, { excerpt: string; label: string; imageAlt: string; category: string }> = {
  "code-became-cheap": {
    excerpt: "AI sprawiło, że duża część tego, czego uczyłem się przez osiem lat, stała się zaskakująco tania. Tania produkcja kodu to nie to samo co tania dobra decyzja.",
    label: "sztuczna inteligencja",
    imageAlt: "Postać stojąca między ścianą fragmentów kodu a kilkoma prostymi blokami",
    category: "sztuczna inteligencja",
  },
  "you-dont-need-another-state-management-library2": {
    excerpt: "Ten sam wzorzec Flux co w części pierwszej, teraz z connect z ngxtension: bez ręcznych subskrypcji i z jednym handlerem błędów zamiast setek akcji failure.",
    label: "angular · stan",
    imageAlt: "Ilustracja: logo Angulara w centrum cyklu przepływu stanu",
    category: "Angular",
  },
  "mastering-angular-host-property": {
    excerpt: "Jak nowa właściwość host zastępuje @HostListener i @HostBinding, działa z sygnałami i jak zmigrować kod skryptem z ngxtension.",
    label: "angular",
    imageAlt: "Ilustracja: lis w okularach pracujący przy komputerze",
    category: "Angular",
  },
  "you-dont-need-another-state-management-library": {
    excerpt: "Mój pierwszy wpis. Sygnały i kilka operatorów RxJS dają korzyści Reduxa bez kolejnej zależności, na przykładzie aplikacji pogodowej.",
    label: "angular · stan",
    imageAlt: "Stos gofrów na kolorowym talerzu",
    category: "Angular",
  },
};
