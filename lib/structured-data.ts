import { SERVICES } from "@/content/site/services";
import type { PostSummary } from "./posts";
import { PERSON, SITE_NAME, SITE_URL } from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const SCHEMA = "https://schema.org";

/** Safe to place inside a script tag: `<` can't close it. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personSchema() {
  return {
    "@context": SCHEMA,
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/portrait.jpg`,
    jobTitle: PERSON.jobTitle,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    address: { "@type": "PostalAddress", addressLocality: PERSON.city, addressCountry: PERSON.country },
    sameAs: PERSON.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      url: `${SITE_URL}/services`,
      itemListElement: SERVICES.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body, areaServed: "Worldwide" },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": SCHEMA,
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
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
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    author: { "@type": "Person", "@id": PERSON_ID, name: PERSON.name, url: `${SITE_URL}/about` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": SCHEMA,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
