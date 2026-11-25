import { describe, expect, it } from "vitest";
import { SERVICES } from "@/content/site/services";
import { getDictionary } from "./dictionary";
import type { PostSummary } from "./posts";
import { PERSON, SITE_URL } from "./site";
import { blogPostingSchema, breadcrumbSchema, faqSchema, personSchema, sectionBreadcrumbs, serializeJsonLd, websiteSchema } from "./structured-data";

const post = {
  slug: "x",
  title: "Title",
  excerpt: "Excerpt",
  date: "2026-08-08",
  image: "/images/blog/x.jpg",
  label: "ai",
} as PostSummary;

describe("serializeJsonLd", () => {
  it("cannot close its script tag", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
    expect(JSON.parse(serializeJsonLd({ a: "</script>" })).a).toBe("</script>");
  });
});

describe("personSchema", () => {
  const person = personSchema();

  it("links every social profile", () => {
    expect(person.sameAs).toEqual(PERSON.sameAs);
  });

  it("names the stack from the FAQ, the languages and the community", () => {
    const stack = SERVICES.faq.items.find((f) => f.logos)!.a;
    for (const tech of person.knowsAbout.slice(2)) expect(stack).toContain(tech);
    expect(person.knowsLanguage).toEqual(["pl", "en"]);
    expect(person.memberOf).toEqual({ "@type": "Organization", name: "Angular Wrocław" });
  });

  it("lists Instagram among the person's profiles", () => {
    expect(PERSON.sameAs).toContain("https://www.instagram.com/ostromecki.dev/");
  });

  it("lists every service with its description", () => {
    const offered = person.hasOfferCatalog.itemListElement.map((o) => o.itemOffered);
    expect(offered.map((s) => s.name)).toEqual(SERVICES.items.map((s) => s.title));
    expect(offered.every((s) => s.description.length > 0)).toBe(true);
  });

  it("states no ratings or awards, which the site doesn't show", () => {
    expect(JSON.stringify(person)).not.toMatch(/rating|award/i);
  });

  it("gives the visible starting prices, net of VAT, in each language's currency", () => {
    const specs = (lang: "en" | "pl") =>
      personSchema(lang).hasOfferCatalog.itemListElement.map((o) => ("priceSpecification" in o ? o.priceSpecification : undefined));
    const en = specs("en");
    expect(en.map((p) => p?.minPrice)).toEqual([undefined, undefined, 2500, 2500, 500, undefined, 29]);
    expect(en[4]).toMatchObject({ "@type": "PriceSpecification", priceCurrency: "USD", valueAddedTaxIncluded: false });
    expect(en[6]).toMatchObject({ "@type": "UnitPriceSpecification", unitCode: "MON", unitText: "MONTH" });
    expect(specs("pl").map((p) => p?.minPrice)).toEqual([undefined, undefined, 9000, 9000, 1900, undefined, 99]);
    expect(specs("pl")[4]?.priceCurrency).toBe("PLN");
  });

  it("matches each numeric price to the visible price text", () => {
    for (const lang of ["en", "pl"] as const) {
      const { SERVICES: items } = getDictionary(lang);
      for (const s of items.items) {
        if ("priceFrom" in s) expect(s.price.replace(/[\s,]/g, "")).toContain(String(s.priceFrom));
        else expect(s.price).toMatch(/individual|indywidualna/i);
      }
    }
  });
});

describe("websiteSchema", () => {
  it("credits the person by id", () => {
    expect(websiteSchema().publisher).toEqual({ "@id": `${SITE_URL}/#person` });
  });
});

describe("faqSchema", () => {
  it("matches the visible questions", () => {
    const faq = faqSchema(SERVICES.faq.items);
    expect(faq.mainEntity.map((q) => q.name)).toEqual(SERVICES.faq.items.map((i) => i.q));
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe(SERVICES.faq.items[0].a);
  });
});

describe("blogPostingSchema", () => {
  const posting = blogPostingSchema(post);

  it("uses absolute URLs", () => {
    expect(posting.image).toBe(`${SITE_URL}/images/blog/x.jpg`);
    expect(posting.mainEntityOfPage).toBe(`${SITE_URL}/blog/x`);
  });

  it("names the author and date", () => {
    expect(posting.datePublished).toBe("2026-08-08");
    expect(posting.author.url).toBe(`${SITE_URL}/about`);
  });

  it("dates the last change, falling back to publication, and credits the publisher", () => {
    expect(posting.dateModified).toBe("2026-08-08");
    expect(blogPostingSchema({ ...post, updated: "2026-09-01" }).dateModified).toBe("2026-09-01");
    expect(posting.publisher).toEqual({ "@id": `${SITE_URL}/#person` });
  });
});

describe("breadcrumbSchema", () => {
  it("starts at the home page and numbers items from one, with absolute URLs", () => {
    const crumbs = breadcrumbSchema("en", [{ name: "Blog", path: "/blog" }, { name: "Title", path: "/blog/x" }]);
    expect(crumbs.itemListElement[0]).toEqual({ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL });
    expect(crumbs.itemListElement[2]).toEqual({ "@type": "ListItem", position: 3, name: "Title", item: `${SITE_URL}/blog/x` });
  });

  it("uses Polish URLs and names in Polish", () => {
    const crumbs = breadcrumbSchema("pl", [{ name: "Blog", path: "/blog" }]);
    expect(crumbs.itemListElement.map((i) => i.item)).toEqual([`${SITE_URL}/pl`, `${SITE_URL}/pl/blog`]);
    expect(crumbs.itemListElement[0].name).toBe("Strona główna");
  });
});

describe("sectionBreadcrumbs", () => {
  it("names top-level pages as the navigation does", () => {
    expect(sectionBreadcrumbs("pl", "/about").itemListElement[1]).toMatchObject({ name: "O mnie", item: `${SITE_URL}/pl/about` });
    expect(sectionBreadcrumbs("en", "/contact").itemListElement[1]).toMatchObject({ name: "Contact", item: `${SITE_URL}/contact` });
  });

  it("fails loudly for a page without a name", () => {
    expect(() => sectionBreadcrumbs("en", "/nope")).toThrow();
  });
});
