import type { TALKS as EN } from "../talks";

export const TALKS: typeof EN = {
  label: "wystąpienia i społeczność",
  h1: "Na scenie i w społeczności.",
  intro:
    "Prowadzę społeczność Angular Wrocław, występuję na meetupach i konferencjach i jeżdżę tam, gdzie spotyka się środowisko frontendowe. Te same tematy mogę poprowadzić jako warsztat dla Twojego zespołu.",
  community: {
    label: "lider społeczności",
    name: "Angular Wrocław",
    body: "Regularne meetupy dla wrocławskiej społeczności Angulara i frontendu: prelekcje, warsztaty i mentoring dla programistów, którzy chcą się rozwijać. Sala zwykle jest pełna, a rozmowy ciągną się do późna.",
    image: "/images/talks/community-crowd.jpg",
    alt: "Selfie z pełnej sali na meetupie Angular Wrocław",
    caption: "Meetup Angular Wrocław.",
  },
  list: {
    label: "wystąpienia",
    heading: "Wybrane wystąpienia",
    items: [
      {
        image: "/images/talks/devfest.jpg",
        position: "50% 50%",
        alt: "Panel Cloud na GDG DevFest Wrocław 2026: paneliści i moderator na scenie pod slajdem Meet the panel",
        kind: "panel",
        year: "2026",
        title: "Panel Cloud",
        event: "GDG DevFest Wrocław 2026",
        d: "Panelista w ścieżce Cloud, obok innych osób ze środowiska Google Developer Group.",
      },
      {
        image: "/images/talks/cshark.jpg",
        position: "50% 30%",
        alt: "Plakat CSHARK TechTalk Frontend Today and Beyond",
        kind: "tech talk",
        title: "Frontend Today and Beyond: From Centering a Div to Shaping a Product",
        event: "CSHARK TechTalk",
        d: "O tym, jak rola frontend developera przesunęła się od układania divów do współtworzenia produktu.",
      },
      {
        image: "/images/talks/state-management.jpg",
        position: "50% 35%",
        alt: "Paweł przy slajdzie You (don't) need another state management library",
        kind: "prelekcja",
        title: "You (don't) need another state management library",
        event: "Angular Wrocław i inne meetupy",
        d: "Prelekcja, którą wygłosiłem w kilku miejscach. Sygnały i kilka operatorów RxJS dają korzyści Reduxa (jedno źródło prawdy, jednokierunkowy przepływ danych) bez kolejnej zależności. Rozwinięcie jest na blogu w dwóch częściach.",
      },
    ],
  },
  gallery: {
    label: "poza sceną",
    heading: "Za kulisami",
    items: [
      {
        image: "/images/talks/gallery-full-room.jpg",
        position: "50% 50%",
        alt: "Paweł prowadzi prelekcję przed pełną salą",
        caption: "You (don't) need another state management library.",
      },
      {
        image: "/images/talks/gallery-screen.jpg",
        position: "50% 40%",
        alt: "Paweł przy ekranie z tytułem prelekcji",
        caption: "Ta sama prelekcja, inna sala.",
      },
      {
        image: "/images/talks/gallery-studio.jpg",
        position: "40% 50%",
        alt: "Trzy osoby w studiu nagraniowym z mikrofonami i laptopami",
        caption: "Angular Space Podcast",
      },
      {
        image: "/images/talks/gallery-ng-rome.jpg",
        position: "50% 30%",
        alt: "Trzy osoby na ściance konferencji NG Rome",
        caption: "NG Rome 2025",
      },
    ],
  },
  team: {
    label: "dla Twojego zespołu",
    heading: "Warsztaty z workflowów AI dla zespołów inżynierskich i biznesowych.",
    body: "Sesje półdniowe lub całodniowe: gdzie AI pasuje do Twoich procesów, jak agenci i MCP działają w praktyce i jak bezpiecznie wdrażać funkcje AI.",
    cta: "Zaproś mnie",
  },
};
