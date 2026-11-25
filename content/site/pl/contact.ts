import { INSTAGRAM_URL } from "@/lib/site";
import type { CONTACT as EN } from "../contact";

export const CONTACT: typeof EN = {
  label: "kontakt",
  h1: "Porozmawiajmy o Twoim projekcie.",
  intro: "Napisz, czego potrzebujesz. Pierwsza 30-minutowa rozmowa jest bezpłatna i bez zobowiązań, a odpowiadam w 1 dzień roboczy.",
  steps: {
    label: "co dalej",
    items: [
      { n: "01", t: "Piszesz", d: "Kilka zdań o tym, czego potrzebujesz." },
      { n: "02", t: "Rozmawiamy 30 minut", d: "Bezpłatnie i bez zobowiązań. Pytam o cel, nie o technologię." },
      { n: "03", t: "Dostajesz wycenę na piśmie", d: "Zakres, cena i termin. Decyzja należy do Ciebie." },
      { n: "04", t: "Startujemy", d: "Praca etapami, które widzisz i oceniasz po drodze." },
    ],
  },
  details: { email: "e-mail", phone: "telefon", where: "lokalizacja", elsewhere: "gdzie indziej" },
  email: "contact@ostromecki.dev",
  phone: "+48 661 546 446",
  phoneHref: "tel:+48661546446",
  where: "Wrocław · zdalnie, na całym świecie",
  socials: [
    { href: "https://www.linkedin.com/in/ostromeckyp/", label: "LinkedIn" },
    { href: "https://github.com/ostromeckyp", label: "GitHub" },
    { href: INSTAGRAM_URL, label: "Instagram" },
    { href: "https://x.com/ostromeckyp", label: "X" },
  ],
  form: {
    need: "czego potrzebujesz",
    name: "imię i nazwisko",
    namePlaceholder: "Twoje imię i nazwisko",
    email: "e-mail służbowy",
    company: "firma",
    optional: "(opcjonalnie)",
    companyPlaceholder: "Nazwa firmy",
    message: "czego potrzebujesz",
    messagePlaceholder: "Co chcesz zbudować albo usprawnić? Po czym poznasz, że jest lepiej?",
    privacy: "Twoja wiadomość trafia do mojej skrzynki i służy tylko do odpowiedzi.",
    send: "Wyślij wiadomość",
    sending: "Wysyłanie…",
    errorFallback: "Coś poszło nie tak",
    sendFailed: "Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz na contact@ostromecki.dev.",
    topics: { workflow: "Workflow AI", case: "Przypadek biznesowy AI", web: "Aplikacja webowa", mobile: "Aplikacja mobilna", website: "Strona internetowa", audit: "Audyt aplikacji", care: "Utrzymanie i rozwój", talk: "Prelekcja / warsztat" },
    errors: {
      name: "Podaj imię i nazwisko",
      nameLong: "Imię i nazwisko są za długie",
      email: "Podaj poprawny adres e-mail",
      company: "Nazwa firmy jest za długa",
      message: "Wiadomość nie może być pusta",
      messageLong: "Wiadomość jest za długa (maks. 5000 znaków)",
    },
  },
  success: {
    title: "Dzięki, wiadomość dotarła.",
    body: "Odezwę się wkrótce. W międzyczasie zajrzyj do wdrożeń.",
    link: "Zobacz wdrożenia",
  },
};
