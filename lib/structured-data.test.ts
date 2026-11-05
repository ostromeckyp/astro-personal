import { describe, expect, it } from "vitest";
import { SERVICES } from "@/content/site/services";
import type { PostSummary } from "./posts";
import { PERSON, SITE_URL } from "./site";
import { blogPostingSchema, breadcrumbSchema, faqSchema, personSchema, serializeJsonLd, websiteSchema } from "./structured-data";

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

  it("lists every service with its description", () => {
    const offered = person.hasOfferCatalog.itemListElement.map((o) => o.itemOffered);
    expect(offered.map((s) => s.name)).toEqual(SERVICES.items.map((s) => s.title));
    expect(offered.every((s) => s.description.length > 0)).toBe(true);
  });

  it("states no prices or ratings, which the site doesn't show", () => {
    expect(JSON.stringify(person)).not.toMatch(/price|rating|award/i);
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
});

describe("breadcrumbSchema", () => {
  it("numbers items from one, with absolute URLs", () => {
    const crumbs = breadcrumbSchema([{ name: "Blog", path: "/blog" }, { name: "Title", path: "/blog/x" }]);
    expect(crumbs.itemListElement[1]).toEqual({ "@type": "ListItem", position: 2, name: "Title", item: `${SITE_URL}/blog/x` });
  });
});
