import { ABOUT } from "@/content/site/about";
import { APPROACH } from "@/content/site/approach";
import { ARTICLE, BLOG } from "@/content/site/blog";
import { CONTACT } from "@/content/site/contact";
import { FORMS_CASE } from "@/content/site/forms-case";
import { HOME } from "@/content/site/home";
import { META } from "@/content/site/meta";
import { COMMON, FOOTER, NAV_CTA, NAV_LINKS, NEXT_STEP } from "@/content/site/nav";
import { ABOUT as ABOUT_PL } from "@/content/site/pl/about";
import { APPROACH as APPROACH_PL } from "@/content/site/pl/approach";
import { ARTICLE as ARTICLE_PL, BLOG as BLOG_PL, POST_COPY } from "@/content/site/pl/blog";
import { CONTACT as CONTACT_PL } from "@/content/site/pl/contact";
import { FORMS_CASE as FORMS_CASE_PL } from "@/content/site/pl/forms-case";
import { HOME as HOME_PL } from "@/content/site/pl/home";
import { META as META_PL } from "@/content/site/pl/meta";
import { COMMON as COMMON_PL, FOOTER as FOOTER_PL, NAV_CTA as NAV_CTA_PL, NAV_LINKS as NAV_LINKS_PL, NEXT_STEP as NEXT_STEP_PL } from "@/content/site/pl/nav";
import { SALON_CASE as SALON_CASE_PL } from "@/content/site/pl/salon-case";
import { SERVICES as SERVICES_PL } from "@/content/site/pl/services";
import { TALKS as TALKS_PL } from "@/content/site/pl/talks";
import { USE_CASES as USE_CASES_PL, USE_CASES_PAGE as USE_CASES_PAGE_PL } from "@/content/site/pl/use-cases";
import { SALON_CASE } from "@/content/site/salon-case";
import { SERVICES } from "@/content/site/services";
import { TALKS } from "@/content/site/talks";
import { USE_CASES, USE_CASES_PAGE } from "@/content/site/use-cases";
import type { Locale } from "./i18n";
import type { PostSummary } from "./posts";

const en = { ABOUT, APPROACH, ARTICLE, BLOG, COMMON, CONTACT, FOOTER, FORMS_CASE, HOME, META, NAV_CTA, NAV_LINKS, NEXT_STEP, SALON_CASE, SERVICES, TALKS, USE_CASES, USE_CASES_PAGE };

const pl: typeof en = {
  ABOUT: ABOUT_PL,
  APPROACH: APPROACH_PL,
  ARTICLE: ARTICLE_PL,
  BLOG: BLOG_PL,
  COMMON: COMMON_PL,
  CONTACT: CONTACT_PL,
  FOOTER: FOOTER_PL,
  FORMS_CASE: FORMS_CASE_PL,
  HOME: HOME_PL,
  META: META_PL,
  NAV_CTA: NAV_CTA_PL,
  NAV_LINKS: NAV_LINKS_PL,
  NEXT_STEP: NEXT_STEP_PL,
  SALON_CASE: SALON_CASE_PL,
  SERVICES: SERVICES_PL,
  TALKS: TALKS_PL,
  USE_CASES: USE_CASES_PL,
  USE_CASES_PAGE: USE_CASES_PAGE_PL,
};

export const getDictionary = (lang: Locale) => (lang === "pl" ? pl : en);

/** Post text stays English. In Polish, only its summary and labels change. */
export function localizePost<T extends PostSummary>(post: T, lang: Locale): T {
  const copy = lang === "pl" ? POST_COPY[post.slug] : undefined;
  return copy ? { ...post, excerpt: copy.excerpt, label: copy.label, imageAlt: copy.imageAlt } : post;
}

export const postCategoryLabel = (post: PostSummary, lang: Locale) => (lang === "pl" ? POST_COPY[post.slug]?.category : undefined) ?? post.category;
