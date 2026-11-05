import type { APPROACH as EN } from "../approach";

export const APPROACH: typeof EN = {
  label: "jak pracuję",
  h1: "Od przypadku biznesowego do produkcji.",
  intro: "Cztery etapy. Każdy kończy się czymś, co możesz zobaczyć i ocenić. Możesz zatrzymać się po dowolnym z nich i zachować to, co powstało.",
  outLabel: "dostajesz",
  stages: [
    {
      n: "01",
      t: "Znajdujemy prawdziwy przypadek",
      d: "Zaczynamy od procesu, który Twój zespół wykonuje dziś, i od liczby, która ma znaczenie: godzin, błędów, czasu realizacji. Jeśli AI nie ruszy tej liczby, mówię to wcześnie.",
      out: "Krótka lista przypadków uszeregowana według wartości i ryzyka, z rekomendacją.",
    },
    {
      n: "02",
      t: "Sprawdzamy na Twoich danych",
      d: "Jeden przypadek, zbudowany jako cienki działający wycinek na Twoich prawdziwych danych i oddany ludziom, którzy będą z niego korzystać.",
      out: "Działający pilotaż i porównanie przed i po, które pokażesz zarządowi.",
    },
    {
      n: "03",
      t: "Przygotowujemy na produkcję",
      d: "Reguły w kodzie, człowiek zatwierdzający tam, gdzie błędy są drogie, monitoring, testy i przegląd bezpieczeństwa, zanim rozwiązanie trafi do wszystkich.",
      out: "System, który działa bezpiecznie z prawdziwymi użytkownikami i daje znać, gdy coś idzie nie tak.",
    },
    {
      n: "04",
      t: "Przekazujemy zespołowi",
      d: "Dokumentacja, przejście przez kod i wspólna praca, żeby zespół przejął rozwiązanie. Pozostaję dostępny, ale nie jestem potrzebny, żeby to działało.",
      out: "Kod, dokumentacja i wiedza w Twoich rękach.",
    },
  ],
  principles: {
    label: "zasady",
    heading: "Co nie zmienia się między projektami.",
    items: [
      { t: "Człowiek zatwierdza, AI proponuje", d: "Agenci przygotowują szkice i sugestie. Wszystko, co przesuwa pieniądze, towar lub dane, czeka na człowieka." },
      { t: "Reguły w kodzie", d: "Reguły, które mają znaczenie, żyją w oprogramowaniu i testach, nie tylko w promptach." },
      { t: "Mierzone, nie zakładane", d: "Każda funkcja jest oceniana względem procesu, który zastępuje." },
      { t: "Tylko to, czego potrzebujesz", d: "Bez aplikacji natywnej, gdy wystarczy PWA. Bez platformy, gdy wystarczy workflow." },
    ],
  },
};
