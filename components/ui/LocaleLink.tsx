"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { DEFAULT_LOCALE, isLocale, localePath } from "@/lib/i18n";

/** A next/link that stays in the current language. */
export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { lang } = useParams<{ lang?: string }>();
  return <Link href={localePath(lang && isLocale(lang) ? lang : DEFAULT_LOCALE, href)} {...props} />;
}
