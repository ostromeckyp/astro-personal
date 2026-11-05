import type { SERVICES as EN } from "../services";

export const SERVICES: typeof EN = {
  label: "usługi",
  h1: "Trzy sposoby, w jakie mogę pomóc.",
  intro:
    "Większość projektów zaczyna się od jednego pytania: gdzie AI naprawdę oszczędzi Twojemu zespołowi czas lub pieniądze i co trzeba zrobić, żeby działało bezpiecznie? Dalej projektuję, buduję i przekazuję.",
  getLabel: "co dostajesz",
  fitLabel: "pasuje, jeśli",
  items: [
    {
      n: "01",
      meta: "workflowy",
      title: "Workflowy AI",
      body: "Weźmy ręczny, powtarzalny proces: zamówienia, triage zgłoszeń, sprawdzanie dokumentów, wprowadzanie danych. Projektuję wokół niego workflow z LLM lub agentem i podłączam do narzędzi, z których zespół już korzysta.",
      get: [
        "Mapa procesu z krokami, które warto zautomatyzować",
        "Projekt workflow z jasnymi punktami, w których decyduje człowiek",
        "Integracja z Twoimi systemami przez API lub MCP",
        "Działająca wersja do przetestowania w kilka tygodni",
      ],
      fit: "Twój zespół codziennie powtarza tę samą pracę niewymagającą dużego osądu i podejrzewasz, że AI mogłoby zrobić większość z niej.",
      tags: ["Agenci AI", "LLM", "MCP"],
    },
    {
      n: "02",
      meta: "najczęściej",
      featured: true,
      title: "AI w realnych przypadkach biznesowych",
      body: "Oddzielamy przypadki, które się opłacają, od tych, które tylko dobrze wyglądają na demo. Testujemy na Twoich danych, mierzymy względem dzisiejszego procesu i zamieniamy zwycięzcę w produkt, z którego ludzie korzystają.",
      get: [
        "Krótkie discovery: gdzie AI naprawdę oszczędza czas lub pieniądze",
        "Proof of concept na Twoich prawdziwych danych",
        "Porównanie przed i po, które pokażesz zarządowi",
        "Plan od proof of concept do produkcji",
      ],
      fit: "widziałeś imponujące dema AI i chcesz wiedzieć, co zadziała w Twojej firmie i ile kosztuje utrzymanie.",
      tags: ["Discovery", "PoC → produkcja", "Wartość biznesowa"],
    },
    {
      n: "03",
      meta: "inżynieria",
      title: "Bezpieczne oprogramowanie gotowe na produkcję",
      body: "Funkcje AI i oprogramowanie wokół nich, zbudowane tak, żeby działały: bezpieczne, obserwowalne, przetestowane i możliwe do utrzymania przez Twój zespół. Architektura frontendu w Angularze, Nx i mikrofrontendach to jedna z moich głównych mocnych stron.",
      get: [
        "Przegląd architektury z planem priorytetów",
        "Praca inżynierska w Twoim kodzie",
        "Zabezpieczenia, monitoring i testy dla funkcji AI",
        "Dokumentacja i przekazanie zespołowi",
      ],
      fit: "potrzebujesz seniora, który dowozi, albo prototyp AI musi przetrwać kontakt z prawdziwymi użytkownikami.",
      tags: ["TypeScript", "NestJS", "Angular · Nx"],
    },
  ],
  models: {
    label: "formy współpracy",
    heading: "Zacznij od małego. Zostaw to, co działa.",
    items: [
      { len: "1 do 2 tygodni", t: "Discovery", d: "Warsztaty z zespołem, mapa miejsc, gdzie AI ma sens, i rekomendacja z szacunkiem nakładu i ryzyka." },
      {
        len: "4 do 8 tygodni",
        t: "Pilotaż",
        d: "Jeden przypadek zbudowany od początku do końca na Twoich danych i oddany prawdziwym użytkownikom, z liczbami na koniec.",
        featured: true,
      },
      { len: "stała współpraca", t: "Inżynier na część etatu", d: "Kilka dni w miesiącu seniorskiej inżynierii i odpowiedzialności za architekturę, aż Twój zespół przejmie temat." },
    ],
  },
  faq: {
    label: "pytania",
    heading: "Zanim zapytasz.",
    items: [
      { q: "Pracujesz zdalnie?", a: "Tak. Mieszkam we Wrocławiu i pracuję zdalnie z zespołami z całego świata. Warsztaty na miejscu są możliwe." },
      {
        q: "Jakich modeli i narzędzi AI używasz?",
        a: "Takich, które pasują do przypadku i Twoich ograniczeń: modele hostowane, otwarte albo mieszanka. Projekt workflow znaczy więcej niż nazwa modelu.",
      },
      { q: "Kto jest właścicielem wyniku?", a: "Ty. Kod, dokumentacja i projekty trafiają do Twojego zespołu." },
      {
        q: "Jak dbasz o bezpieczeństwo funkcji AI?",
        a: "Tam, gdzie to ważne, decyduje człowiek, reguły są w kodzie, a nie tylko w promptach, a całość jest monitorowana i testowana na Twoich danych, zanim trafi do wszystkich.",
      },
    ],
  },
};
