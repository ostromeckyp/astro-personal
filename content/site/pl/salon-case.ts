import { SALON_CASE as EN } from "../salon-case";

// The design has no Polish version of this page, so this is an owner-reviewable translation.
export const SALON_CASE: typeof EN = {
  ...EN,
  label: "Wdrożenie · branża beauty i barber",
  title: "Agentowe zamówienia dla sieci salonów.",
  lede: "Oprogramowanie na zamówienie, w którym salony zamawiają towar z centrali zwykłym językiem. Agent AI zamienia prośbę w sprawdzoną propozycję, a ludzie zachowują kontrolę nad każdą sztuką towaru.",
  stack: ["Agent AI", "LLM", "RAG", "Firebase", "Człowiek w pętli"],
  story: [
    { k: "problem", t: "Zamówienia przez telefon i czat", d: "Salony uzupełniają towar z centrali przez wiadomości i arkusze: łatwo zamówić coś dwa razy, trudno śledzić, co dotarło." },
    { k: "agent", t: "Powiedz, dostań propozycję", d: "Pracownicy piszą lub dyktują, czego potrzebują, a agent dopasowuje produkty, sprawdza stan w centrali i buduje zamówienie." },
    { k: "zabezpieczenia", t: "Sprawdzone przed wysłaniem", d: "Duplikaty aktywnych zamówień są blokowane, ilości można edytować, a towar nie rusza się, dopóki centrala nie wyśle, a salon nie potwierdzi odbioru." },
    { k: "śledzenie", t: "Od zamówienia do odbioru", d: "Każde zamówienie ma status: wysłane, odebrane, odrzucone lub dostarczone z problemem, a uszkodzone sztuki nie trafiają do towaru na sprzedaż." },
  ],
  hero: {
    ...EN.hero,
    kicker: "01 · agentowe zamówienia",
    heading: "Powiedz. Dostań sprawdzone zamówienie.",
    alt: "Magazyn salonu z panelem asystenta AI: polska prośba o 6 Mattifierów i 4 olejki Savage zamieniona w listę zamówienia z wpływem na stan w centrali i salonie",
    n: "rys. 01",
    captionLead: "Zwykły język na wejściu, uporządkowane zamówienie na wyjściu.",
    caption:
      "„Potrzebujemy 6 Mattifier i 4 olejki Savage” staje się listą z ilościami, dostępnością w centrali i wynikowym stanem salonu (2 → 8). Nic nie zostaje wysłane, dopóki człowiek nie zatwierdzi.",
  },
  shots: [
    { ...EN.shots[0], n: "rys. 02", alt: "Tabela magazynu salonu z oznaczeniem niskiego stanu przy trzech produktach", t: "Niski stan widać od razu", d: "Stany salonu i centrali obok siebie; produkty na wyczerpaniu są oznaczone, zanim ktokolwiek zapyta." },
    { ...EN.shots[1], n: "rys. 03", alt: "Asystent odmawia propozycji, bo produkty mają już aktywne zamówienia", t: "Agent mówi „nie”", d: "„Uzupełnij wszystko, czego brakuje”: agent widzi, że te produkty mają już aktywne zamówienia, i linkuje do nich zamiast zamawiać podwójnie." },
    { ...EN.shots[2], n: "rys. 04", alt: "Lista zamówień ze statusami: wysłane, odrzucone, odebrane i dostawa z problemem", t: "Jedna historia na zamówienie", d: "Historia zamówień salonu z filtrami, od złożenia do odbioru." },
    { ...EN.shots[3], n: "rys. 05", alt: "Szczegóły zamówienia: zamówione, wysłane i dobre sztuki oraz jedna uszkodzona", t: "Problemy rozwiązane, nie ukryte", d: "Zamówione, wysłane i dobre sztuki dla każdego produktu; uszkodzone wracają do centrali, a stan na żywo pozostaje poprawny." },
  ],
  procedures: {
    ...EN.procedures,
    n: "rys. 06",
    heading: "Odpowiedzi ze źródłami.",
    body: "Asystent procedur odpowiada na pytania pracowników, na przykład „dostaliśmy uszkodzony produkt, co teraz?”, krok po kroku, a każdy krok linkuje do dokumentu źródłowego, wersji i strony. Tylko wskazówki: nie zmienia stanów, nie składa reklamacji i nie przyznaje wymian.",
    note: "bezpieczne z założenia, nie dzięki promptowi",
    alt: "Asystent procedur odpowiada, co zrobić z uszkodzonym produktem, z numerowanymi krokami i cytowanymi dokumentami",
  },
  pwa: {
    ...EN.pwa,
    n: "rys. 07–09 · perspektywa salonu",
    heading: "Najpierw telefon, dla ludzi na sali. Bez sklepu z aplikacjami.",
    body: "Pracownicy salonów pracują na telefonach, więc strona salonu to PWA instalowane z linku. Jedyna natywna funkcja, o którą prosili, czyli powiadomienia, gdy zamówienie zostanie zatwierdzone, wysłane lub ma problem, działa przez web push. Bez aparatu, synchronizacji offline i natywnych SDK: nie powstało nic, czego firma nie potrzebowała.",
    builtLabel: "zbudowane",
    built: "Jeden responsywny kod · PWA do zainstalowania · web push dla statusów · te same logowanie i reguły co na desktopie",
    skippedLabel: "celowo pominięte",
    skipped: "Natywne aplikacje iOS i Android · przeglądy w sklepach · drugi interfejs do utrzymania",
    pill: "Zamówienie 88eddc78 wysłane · 6 szt. w drodze",
    phones: [
      { ...EN.pwa.phones[0], n: "rys. 07", alt: "Telefon: lista magazynu salonu z oznaczeniami niskiego stanu", t: "Stan w skrócie", d: "Oznaczenia niskiego stanu przy produktach i dostępność w centrali na miejscu." },
      { ...EN.pwa.phones[1], n: "rys. 08", alt: "Telefon: lista zamówień ze statusami wysłane, odrzucone, odebrane", t: "Status zamówienia w drodze", d: "Każde zamówienie i jego stan, z filtrami, oraz powiadomienie przy każdej zmianie." },
      { ...EN.pwa.phones[2], n: "rys. 09", alt: "Telefon: historia statusów zamówienia: złożone, zatwierdzone, wysłane, sprawdzone", t: "Odbiór i problemy", d: "Potwierdź dostawę, zgłoś uszkodzone sztuki, zobacz pełną historię statusów." },
    ],
    push: {
      ...EN.pwa.push,
      when: "teraz",
      text: "Zamówienie 88eddc78 wysłane: 6 szt. w drodze na Legnicką. Potwierdź odbiór, gdy dotrze.",
      caption: "Powiadomienie web push tak, jak widzi je salon. Zmiany statusów wynikają z działań centrali na desktopie, więc salon nie musi niczego sprawdzać.",
    },
  },
  footnote: "ekrany z działającego środowiska demo · syntetyczne dane magazynowe",
  cta: "Porozmawiajmy o Twoim procesie",
};
