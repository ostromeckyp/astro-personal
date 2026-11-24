# ostromecki.dev: szersze pozycjonowanie i odchudzenie treści

Data: 2026-11-24

## Intencja i powód

Strona jest dziś odbierana jako „konsultant od AI”. Właściciel buduje oprogramowanie w ogóle (aplikacje, strony, workflowy z AI) i chce, żeby strona to mówiła: AI zostaje ważne, ale nie jedyne. Drugi cel: mniej treści. Strona ma być krótsza, karty mniejsze, bez powtórzeń (kafelek CTA zdublowany ze stopką, podstrona `/approach` powielająca sekcję z głównej). Teksty piszemy bezpośrednio do klienta („masz problem”, nie „Twój zespół wykonuje”).

## Cele

1. Pozycjonowanie: hero, intro, meta, stopka, nagłówek `/services` i `llms.txt` mówią o oprogramowaniu (aplikacje, strony, automatyzacja z AI), a nie tylko o AI.
2. Hero: nowy slogan z zachowaną częścią „dla prawdziwego biznesu” (warianty niżej).
3. `NextStepCta` usunięty ze wszystkich stron, razem z komponentem i tekstami `NEXT_STEP`.
4. `/services`: jedna karuzela ze wszystkimi usługami (bez grup „AI w procesach” / „Aplikacje, strony i opieka”). Karty bez rozwijanego „co dostajesz” / „pasuje, jeśli”.
5. Sekcja „Jak zacząć z AI” (Discovery / Pilotaż) bez zmian.
6. FAQ: jedno pytanie o technologie z logotypami; konkretna odpowiedź o bezpieczeństwie.
7. Podstrona `/approach` usunięta. Sekcja „Jak pracuję” na głównej staje się interaktywnym komponentem z 4 krokami, w które wplecione są (krótko) zasady.
8. Mobilne menu: koniec z mignięciem przy przejściu na inną stronę, animowane zamykanie.

## Poza zakresem

- Zmiany w kartach usług na stronie głównej (3 karty zostają, zmienia się tylko link karty 03, patrz niżej).
- Case studies, blog, „O mnie”, „Wystąpienia”, kontakt (poza usunięciem `NextStepCta` z „O mnie”).
- Nowe usługi, ceny, zmiany w sekcji Discovery / Pilotaż.
- Wygląd: zostaje obecny system (ciemne tło, akcent `sakura-500`, istniejące typografie, `reveal`, `rise-in`).

## Antycele (porażka, nawet jeśli wszystko działa)

- Wymyślone liczby, klienci, certyfikaty albo obietnice (np. „zgodność z OWASP” jako certyfikat; wolno pisać „opieram się na”).
- Wersja EN i PL rozjechane: każda zmiana treści jest w obu językach.
- Martwe linki: `/approach`, `/pl/approach`, `/services#ai`, `/services#software`.
- Animacje, które ignorują `prefers-reduced-motion`, albo treść kroków niewidoczna bez JS / dla crawlerów.
- Poziomy scroll strony na telefonie.

## Ograniczenia

- Stos i konwencje jak w `2026-11-04-site-redesign-design.md`: Next 16 App Router, Tailwind 4 z tokenami `@theme`, `cn()`, treści w `content/site/*.ts` (EN) i `content/site/pl/*.ts` (PL, typowane `typeof EN`), słownik w `lib/dictionary.ts`.
- Bez nowych zależności runtime. Logotypy jako inline SVG (ścieżki z Simple Icons, CC0).
- Repo jest publiczne.
- Przed oddaniem: `npm run lint`, `npm run type-check`, `npm test`, `npm run build` przechodzą; testy, które odwołują się do usuniętych rzeczy (`app/sitemap.test.ts`, ewentualnie `lib/dictionary.test.ts`), są zaktualizowane, a nie wyłączone.

## Podejścia („Jak pracuję”)

Rozważone:

- **A. Kroki jako zakładki z paskiem postępu.** Wybrane przez właściciela. Zwarte, reaguje na użytkownika, każdy krok ma miejsce na jedną zasadę.
- B. Przypięta sekcja przewijana krok po kroku: efektowna, ale wydłuża przewijanie (wbrew celowi „mniej treści”) i męczy na telefonie.
- C. Oś czasu rysowana przy wjeździe: najlżejsza, ale animacja jednorazowa, czyli nadal statyczne bloki; na telefonie brak hovera do pokazania zasad.

Mobilne menu: jedno sensowne rozwiązanie (niżej). Zwolnienie zamykania przesunęłoby mignięcie w czasie, nie usunęłoby go.

## Decyzje

### 1. Hero

Warianty (PL / EN):

1. „Prawdziwe oprogramowanie\ndla prawdziwego biznesu.”: odrzucony przez właściciela (bez „Prawdziwe” z przodu).

**Wybrane (decyzja właściciela): „Oprogramowanie\ndla prawdziwego biznesu.” / „Software for\nreal business.”** Obejmuje aplikacje, strony i AI, zachowuje „dla prawdziwego biznesu”.
2. „Aplikacje, strony i AI\ndla prawdziwego biznesu.”: konkretny, ale wyliczanka, gorzej brzmi.
3. „Działające oprogramowanie\ndla prawdziwego biznesu.”: dobre, ale gubi powtórzenie „prawdziwe / prawdziwego”.
4. „Prawdziwa automatyzacja\ndla prawdziwego biznesu.”: za wąskie, pomija strony i aplikacje.
5. „Software, który działa,\ndla prawdziwego biznesu.”: anglicyzm, słabszy ton.

„oprogramowanie” to długie słowo przy `clamp(44px,5vw,76px)` i `max-w-[560px]` w `components/home/Hero.tsx`. Builder sprawdza w przeglądarce (390 px, 768 px, 1280 px, 1440 px), że słowo nie wychodzi poza kontener; jeśli wychodzi, podnosi `max-w` kontenera hero, a nie zmniejsza fontu poniżej obecnego minimum.

Reszta hero (PL):
- `groups`: `"aplikacje\ni strony\nna miarę"`, `"workflowy AI\ndla realnych\nprocesów"`, `"bezpieczne\nna produkcji"`
- `captions`: `"aplikacje i strony"`, `"workflowy AI"`, `"gotowe na produkcję"`
- EN analogicznie: `"apps and\nwebsites\nbuilt to fit"`, `"ai workflows\nfor real\nprocesses"`, `"safe to run\nin production"`; captions `"apps & websites"`, `"ai workflows"`, `"production-ready"`.

### 2. Pozycjonowanie w pozostałych tekstach

- Intro na głównej (PL): „Buduję aplikacje, strony i workflowy AI dla firm i dbam o to, żeby działały na produkcji.” `introBody` bez zmian.
- `/services` h1 (PL): „Oprogramowanie dla Twojej firmy. Z AI tam, gdzie się opłaca.”; intro: „Aplikacje webowe i mobilne, strony, workflowy AI, audyty i opieka po starcie.”
- `META.home`, `META.services` (PL; EN analogicznie, limity długości z `lib/dictionary.test.ts` obowiązują, w razie przekroczenia skrócić):
  - home title: „Paweł Ostromecki | Aplikacje, strony i workflowy AI”; description: „Buduję aplikacje webowe i mobilne, strony internetowe i workflowy AI dla firm. Do tego audyty i opieka po wdrożeniu.”
  - services title: „Aplikacje, strony, workflowy AI i audyty”; description: „Aplikacje webowe i mobilne, strony internetowe, workflowy AI, audyty i utrzymanie. Na start bezpłatna 30-minutowa konsultacja.”
  - `META.approach` usunięte.
- `FOOTER.tag` (PL): „aplikacje i strony · workflowy AI · audyty i opieka”. `FOOTER.head` bez zmian.
- `public/llms.txt`: zdanie wprowadzające w tym samym duchu, usunięta linia „Approach”, dopisane, że proces jest na stronie głównej.
- EN: te same zmiany, tłumaczone w tonie istniejących tekstów EN (zostawione builderowi).

### 3. Usunięcie `NextStepCta`

Usunięte z `services`, `use-cases`, `about` (i `approach`, które znika). Usunięty plik `components/ui/NextStepCta.tsx`, eksport `NEXT_STEP` z `content/site/nav.ts` i `content/site/pl/nav.ts` oraz z `lib/dictionary.ts`. Odstęp `pb-32` pod ostatnią sekcją każdej strony zostaje, żeby stopka nie przykleiła się do treści. CTA w case studies („Porozmawiajmy o Twoim procesie”) to inny element i zostaje.

### 4. `/services`: jedna karuzela, mniejsze karty

- Jedna sekcja z jedną `Carousel` (etykieta: `SERVICES.label`), bez nagłówków grup. Pole `groups` i `group` usunięte z treści.
- Kolejność (decyzja właściciela: najpierw AI): bez zmian względem dzisiejszej, czyli Workflowy AI, AI w realnych przypadkach biznesowych (nadal `featured`), Aplikacje webowe, Aplikacje mobilne, Strony internetowe, Audyt aplikacji, Utrzymanie i rozwój. Numery `n` 01–07 bez zmian.
- Kotwice `id="service-<n>"` zostają. Karta 03 na głównej (dziś `href: "/services#software"`) linkuje do `/services#service-03`; pole `href` w `HOME.services.items` można usunąć, bo domyślny link `/services#service-${n}` wystarcza.
- Przekierowania kotwic nie istnieją w HTTP, więc stare `#ai` i `#software` po prostu lądują na górze `/services`: akceptowalne.
- Karta: usunięty `<details>` z „co dostajesz” i „pasuje, jeśli”. Zostają: numer, meta, tytuł, opis, tagi, cena. Usunięte pola `get`, `fit`, `getLabel`, `fitLabel` (oba języki). `lib/structured-data.ts` dalej używa `SERVICES.items` (sprawdzić, że nie czyta usuniętych pól).

### 5. FAQ (`/services`)

- Dwa pytania („Jakich modeli i narzędzi AI używasz?” i „Jakich technologii używasz?”) zastąpione jednym:
  - PL q: „Z czego korzystasz?”; a: „Ze sprawdzonych, popularnych narzędzi, żeby każdy dobry zespół mógł przejąć projekt: Google Cloud, Firebase, Python, TypeScript, Angular, React i NestJS.”
  - EN q: „What do you build with?”; a analogicznie.
  - Pod tekstem rząd logotypów (7): Google Cloud, Firebase, Python, TypeScript, Angular, React, NestJS. Monochromatyczne (`currentColor`, `text-ink-200`), ok. 28 px, z widoczną nazwą pod lub obok (dostępność + crawlery). Typ elementu FAQ dostaje opcjonalne pole `logos?: Logo[]`; `faqSchema` dalej dostaje tylko `q` i `a` (nazwy są w `a`, więc JSON-LD jest kompletny).
  - SVG w osobnym pliku (np. `components/ui/TechLogos.tsx`), ścieżki z Simple Icons. Ionic i Capacitor znikają z listy, TypeScript zostaje (decyzja właściciela).
- Bezpieczeństwo, PL: „Opieram się na OWASP Top 10 for LLM Applications: zabezpieczam przed prompt injection, wyciekiem danych i nadmiernymi uprawnieniami agentów. Agent dostaje tylko te uprawnienia, których potrzebuje, a działania z realnymi skutkami czekają na zatwierdzenie przez człowieka. Na Firebase i Google Cloud korzystam z mechanizmów bezpieczeństwa platformy: reguł bezpieczeństwa, App Check, IAM i Secret Managera.” EN analogicznie.

### 6. Usunięcie `/approach`

- Usunięte: `app/[lang]/approach/`, `content/site/approach.ts`, `content/site/pl/approach.ts`, wpis w `lib/dictionary.ts`, `META.approach`, wpis w `app/sitemap.ts` i `app/sitemap.test.ts`, linia w `llms.txt`.
- Przekierowania 301 w `next.config.ts`: `/approach` → `/#how-i-work`, `/pl/approach` → `/pl#how-i-work`.
- Nawigacja (moja decyzja): link „Jak pracuję” / „Approach” usunięty z `NAV_LINKS`, bez zastępowania kotwicą. Nawigacja ma wtedy 5 pozycji. Link „Cały proces” (`HOME.how.all`) w nagłówku sekcji na głównej usunięty.
- `lib/nav.test.ts` używa `/approach` tylko jako przykładowego stringa w teście `isActive`; może zostać.

### 7. „Jak pracuję” na głównej: interaktywne kroki

Nowy komponent kliencki (np. `components/home/HowSteps.tsx`) w miejscu obecnej listy `<ol>` w `app/[lang]/page.tsx`. Sekcja ma `id="how-i-work"` i `scroll-mt` pod przyklejony header. `SectionHeading index="04"` zostaje, bez akcji.

Treść (PL), każdy krok: krótka etykieta zakładki, tytuł, jedno zdanie, jedna wpleciona zasada:

| n | zakładka | tytuł | tekst | zasada |
|---|---|---|---|---|
| 01 | Problem | Zaczynamy od Twojego problemu | Zaczynamy od procesu, z którym masz problem, i od liczby, którą chcesz poprawić. | Tylko to, czego potrzebujesz: bez aplikacji natywnej, gdy wystarczy PWA, bez platformy, gdy wystarczy workflow. Nie płacisz za nadmiar. |
| 02 | Dane | Sprawdzamy na Twoich danych | W kilka tygodni dostajesz działający wycinek i testujesz go z ludźmi, którzy będą z niego korzystać. | AI proponuje, ja zatwierdzam: AI przyspiesza pracę, a każdą zmianę sprawdzam, zanim do Ciebie trafi. |
| 03 | Produkcja | Wdrażamy na produkcję | Testy, zabezpieczenia i monitoring, zanim rozwiązanie trafi do wszystkich. | Reguły, które mają znaczenie, żyją w kodzie i testach, nie w promptach. To one trzymają całość w ryzach. |
| 04 | Przekazanie | Przekazuję Ci całość | Kod, dokumentacja i wiedza trafiają do Ciebie. Jestem pod ręką, ale nie jestem niezbędny. | Metryki, monitoring i logi pokazują, czy rozwiązanie robi swoje. Wiesz to z danych, nie z założeń. |

EN: odpowiedniki w tonie istniejących tekstów EN (builder). „Ja zatwierdzam” znaczy: właściciel sprawdza to, co wygenerowało AI (kod, treści, logikę), w trakcie budowy, zanim trafi do klienta. Nie obiecuje osobistego zatwierdzania na produkcji (decyzja właściciela). Zasada wizualnie odróżniona od tekstu (np. krótka kreska `sakura-500` jak w obecnych kartach zasad i mniejszy, jaśniejszy tekst), bez osobnego nagłówka „zasady”.

Zachowanie:
- Wzorzec WAI-ARIA Tabs: `role="tablist"`, `tab`, `tabpanel`, strzałki/Home/End, `aria-selected`, `aria-controls`.
- Pod aktywną zakładką pasek postępu wypełnia się przez ok. 6 s; po wypełnieniu aktywny staje się kolejny krok (po 04 wraca do 01). Auto-przełączanie startuje, gdy sekcja jest w widoku (IntersectionObserver, ok. 50%), pauzuje przy hover/focus w sekcji i przy wyjściu z widoku, a **pierwsze kliknięcie lub użycie klawiatury wyłącza je na stałe** (dla tej wizyty).
- Zmiana panelu: krótkie przejście (fade + lekki przesuw, ok. 250–350 ms, krzywa jak w `rise-in`).
- `prefers-reduced-motion: reduce`: brak auto-przełączania, brak paska postępu i przesuwu, zmiana panelu natychmiastowa.
- Bez JS / SSR: wszystkie 4 panele są w HTML (nieaktywne `hidden`), pierwszy widoczny; crawlery widzą całą treść.
- Telefon (< `md`), moja decyzja: akordeon bez auto-przełączania (auto-przełączanie przesuwałoby tekst pod spodem w trakcie czytania). Wszystkie 4 tytuły widoczne jako pionowa lista, jeden krok otwarty naraz (domyślnie 01), krótka animacja rozwijania, bez poziomego scrolla. Desktop: zakładki w rzędzie, panel pod nimi, auto-przełączanie jak wyżej. Jeden komponent; tekst każdego kroku występuje w HTML tylko raz (sposób przełączania układu zostawiony builderowi).
- Wysokość sekcji nie skacze przy zmianie kroku na desktopie (panel ma wysokość najdłuższego kroku, np. przez nakładanie paneli w jednej komórce grida).

### 8. Mobilne menu (`components/Nav.tsx`)

- Przyczyna mignięcia: linki w menu mają `onClick={close}`, który ukrywa menu przed załadowaniem nowej strony.
- Zmiana: kliknięcie linku do **innej** strony nie zamyka menu; menu zamyka się samo przy zmianie `pathname` (mechanizm `openOn === pathname` już istnieje). Kliknięcie linku do bieżącej strony zamyka menu od razu (inaczej nic by go nie zamknęło). To samo dotyczy przycisku CTA w menu.
- Zamykanie animowane: zanikanie ok. 200 ms (lustrzane do obecnego `fade-in` przy otwieraniu). Implementacja do wyboru buildera (np. stan „closing” trzymający element w DOM do końca animacji albo `transition-behavior: allow-discrete` z fallbackiem na natychmiastowe zamknięcie). `inert`, blokada scrolla i powrót fokusu działają jak dziś i zwalniają się dopiero po zamknięciu.
- Ikona: przycisk zamykania w menu wjeżdża z krótkim obrotem/przejściem kresek, żeby otwarcie wyglądało jak przemiana burgera w X.
- `prefers-reduced-motion`: bez animacji, jak dziś.
- Weryfikacja na szerokości telefonu w przeglądarce: kliknięcie każdej pozycji menu nie pokazuje na chwilę starej strony.

## Zostawione builderowi

- Tłumaczenia EN wszystkich nowych tekstów.
- Dokładne SVG logotypów i ich układ (zawijanie na telefonie).
- Szczegóły implementacji animacji (CSS vs stan React), czasy w podanych widełkach.
- Podział na commity.

## Decyzje podjęte przeze mnie (do sprawdzenia przez właściciela)

- Slogan: „Oprogramowanie dla prawdziwego biznesu.” (właściciel).
- Kolejność usług: najpierw AI, numeracja bez zmian (właściciel).
- Usunięcie linku „Jak pracuję” z nawigacji (bez kotwicy).
- Przypisanie zasad do kroków (tabela w sekcji 7).
- Pytanie FAQ „Z czego korzystasz?” i odpowiedź o bezpieczeństwie w brzmieniu powyżej.
- Usunięcie razem z „co dostajesz” także „pasuje, jeśli”.
