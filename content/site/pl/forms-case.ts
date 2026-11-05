import { FORMS_CASE as EN } from "../forms-case";

// The design has no Polish version of this page, so this is an owner-reviewable translation.
export const FORMS_CASE: typeof EN = {
  ...EN,
  label: "Wdrożenie · regtech · praca dla klienta",
  title: "Formularze no-code dla branży regulowanej.",
  lede: "Platforma typu przeciągnij i upuść, w której analitycy budują formularze compliance, czyli rejestracje, zgłoszenia i wieloetapowe wnioski, i łączą je z prawdziwymi API bez pisania kodu. Pracuję przy niej jako zewnętrzny inżynier kontraktowy, współtworzę projekt produktu i architekturę, a teraz pomagam zespołowi klienta wprowadzić do tego samego procesu agenta AI.",
  stack: ["Angular", "Przeciągnij i upuść", "Powiązania OpenAPI", "Silnik reguł", "MCP", "Agent AI"],
  story: [
    { k: "problem", t: "Każdy formularz był zadaniem dla dewelopera", d: "Formularze regulacyjne często się zmieniają i mają dziesiątki pól z logiką warunkową. Ręczne kodowanie każdego się nie skaluje." },
    { k: "produkt", t: "Projektant, nie edytor kodu", d: "Przeciągasz komponenty na płótno, konfigurujesz je w jednym oknie ustawień, oglądasz podgląd, zapisujesz i publikujesz." },
    { k: "połączenia", t: "Powiązane z prawdziwymi API", d: "Pola łączą się z kontraktami OpenAPI zarejestrowanymi w projekcie, więc każdy formularz wysyła i pobiera dane z prawdziwego endpointu." },
    { k: "mój wkład", t: "Współtwórca jako kontraktor", d: "Współtworzyłem UX projektanta, model ustawień elementów, warunki i powiązania, formularze wieloetapowe, integrację z aplikacją nadrzędną i wbudowany przewodnik, pracując w zespole klienta." },
  ],
  disclosure: {
    ariaLabel: "Informacja o własności",
    label: "Zastrzeżenie",
    title: "Produkt należący do klienta",
    lead: "Ta platforma nie jest moja.",
    first: "Jej właścicielem i operatorem jest klient. Pracuję przy niej jako zewnętrzny kontraktor, a produkt, jego kod źródłowy, projekty, dokumentacja i cała związana z nimi własność intelektualna należą do klienta.",
    second: "Pojawia się tutaj wyłącznie po to, by opisać mój wkład jako części większego zespołu. Nazwa klienta, marka produktu i prawdziwe dane zostały usunięte, a zrzuty ekranu pochodzą ze środowiska deweloperskiego z przykładowymi danymi.",
  },
  hero: {
    ...EN.hero,
    kicker: "01 · formularze no-code · praca dla klienta",
    heading: "Formularze compliance, przeciągnij i upuść.",
    alt: "Projektant formularzy: paleta komponentów po lewej, wieloetapowy formularz rejestracyjny na płótnie z licznikami problemów dla każdego etapu",
    pill: "59 problemów wykrytych przed publikacją",
    n: "rys. 01",
    captionLead: "Przeciągnij, upuść, skonfiguruj.",
    caption: "30 komponentów od pól tekstowych po repeatery i wykresy. Formularze wieloetapowe mają jedną zakładkę na etap, a licznik problemów na żywo oznacza każdy źle skonfigurowany element przed publikacją.",
  },
  shots: [
    { ...EN.shots[0], n: "rys. 02", alt: "Okno ustawień elementu na zakładce warunków: pokaż to pole, gdy wszystkie warunki są spełnione", t: "Logika bez kodu", d: "Każdy element ma to samo okno ustawień: wyświetlanie, dane, walidacja, reguły warunkowe, akcje, powiązania z API i wyzwalacze. Pokaż, ukryj, zmień etykietę lub wymagaj pola na podstawie innych odpowiedzi." },
    { ...EN.shots[1], n: "rys. 03", alt: "Podgląd wieloetapowego formularza rejestracyjnego z panelem pomocnych wskazówek", t: "Co widzi składający", d: "Przepływ krok po kroku ze wskazówkami przy każdym etapie, dokładnie tak, jak będzie działać po osadzeniu w aplikacji nadrzędnej." },
  ],
  docs: {
    ...EN.docs,
    n: "rys. 04",
    heading: "Produkt, którego można nauczyć się samemu.",
    body: "Przewodnik jest wbudowany w aplikację: proste wyjaśnienia dla twórców formularzy, sekcje „Technical” dla osób łączących API, gotowe przepisy na typowe potrzeby i część o integracji formularzy z innymi aplikacjami.",
    alt: "Wbudowany przewodnik dla początkujących z tabelą sekcji przewodnika",
  },
  mcp: {
    label: "obecna współpraca · serwer MCP",
    heading: "Agent AI w procesie tworzenia formularzy.",
    body: "Razem z zespołem klienta buduję serwer MCP, który udostępnia platformę agentowi AI jako zestaw narzędzi. Agent tworzy szkic formularza na podstawie JSON Schema lub wymagań regulacji, projektant waliduje go jak każdy formularz zbudowany przez człowieka, a człowiek sprawdza i publikuje. Agent przyspiesza pierwsze 80% i nigdy nie pomija kontroli.",
    notes: ["ta sama walidacja, ten sam przegląd, ten sam krok publikacji", "agent proponuje, ludzie zatwierdzają"],
    flow: [
      { n: "01", who: "wejście", t: "Schemat lub regulacja", d: "JSON Schema, kontrakt API lub tekst wymagań." },
      { n: "02", who: "agent", t: "Szkic przez MCP", d: "Wywołuje narzędzia platformy, by dodać etapy, elementy, reguły i powiązania.", accent: true },
      { n: "03", who: "platforma", t: "Walidacja", d: "Ten sam licznik problemów co dla formularzy zbudowanych przez ludzi." },
      { n: "04", who: "człowiek", t: "Przegląd w projektancie", d: "Można wszystko zmienić ręcznie: to teraz zwykły formularz." },
      { n: "05", who: "człowiek", t: "Publikacja", d: "Tylko człowiek może opublikować formularz." },
    ],
  },
  footnote: "produkt należący do klienta · pokazany, by opisać mój wkład jako kontraktora · nazwy, marka i dane usunięte",
  cta: "Porozmawiajmy o Twoim procesie",
};
