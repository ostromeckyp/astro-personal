import { getDictionary } from "./dictionary";
import { DEFAULT_LOCALE, localePath, type Locale } from "./i18n";
import type { PostSummary } from "./posts";
import { PERSON, SITE_NAME, SITE_URL } from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const SCHEMA = "https://schema.org";

/** Safe to place inside a script tag: `<` can't close it. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personSchema(lang: Locale = DEFAULT_LOCALE) {
  const { META, SERVICES } = getDictionary(lang);
  return {
    "@context": SCHEMA,
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/portrait.jpg`,
    jobTitle: lang === "pl" ? "Senior software engineer i konsultant" : PERSON.jobTitle,
    description: META.home.description,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    address: { "@type": "PostalAddress", addressLocality: PERSON.city, addressCountry: PERSON.country },
    sameAs: PERSON.sameAs,
    knowsAbout: PERSON.knowsAbout,
    knowsLanguage: PERSON.languages,
    memberOf: { "@type": "Organization", name: "Angular Wrocław" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      url: `${SITE_URL}${localePath(lang, "/services")}`,
      itemListElement: SERVICES.items.map((s) => ({
        "@type": "Offer",
        // Only the visible "from" prices; individually quoted services get none.
        ...("priceFrom" in s && {
          priceSpecification: {
            "@type": "priceUnit" in s ? "UnitPriceSpecification" : "PriceSpecification",
            minPrice: s.priceFrom,
            priceCurrency: SERVICES.currency,
            valueAddedTaxIncluded: false,
            ...("priceUnit" in s && { unitCode: s.priceUnit === "MONTH" ? "MON" : s.priceUnit, unitText: s.priceUnit }),
          },
        }),
        itemOffered: { "@type": "Service", name: s.title, description: s.body, areaServed: "Worldwide" },
      })),
    },
  };
}

export function websiteSchema(lang: Locale = DEFAULT_LOCALE) {
  return {
    "@context": SCHEMA,
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: lang,
    publisher: { "@id": PERSON_ID },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": SCHEMA,
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function blogPostingSchema(post: PostSummary) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": SCHEMA,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    author: { "@type": "Person", "@id": PERSON_ID, name: PERSON.name, url: `${SITE_URL}/about` },
    publisher: { "@id": PERSON_ID },
  };
}

/** Breadcrumbs from the home page down to the given pages. Paths are unlocalized; the language decides the URLs. */
export function breadcrumbSchema(lang: Locale, items: { name: string; path: string }[]) {
  const { COMMON } = getDictionary(lang);
  const trail = [{ name: COMMON.breadcrumbHome, path: "/" }, ...items];
  return {
    "@context": SCHEMA,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${localePath(lang, item.path).replace(/^\/$/, "")}`,
    })),
  };
}

/** Breadcrumbs for a top-level page, named as in the main navigation. */
export function sectionBreadcrumbs(lang: Locale, path: string) {
  const { COMMON, NAV_LINKS } = getDictionary(lang);
  const name = NAV_LINKS.find((l) => l.href === path)?.label ?? (path === "/contact" ? COMMON.breadcrumbContact : undefined);
  if (!name) throw new Error(`No breadcrumb name for ${path}`);
  return breadcrumbSchema(lang, [{ name, path }]);
}
