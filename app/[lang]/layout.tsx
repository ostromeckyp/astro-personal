import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { OG_DEFAULT, OG_DEFAULT_ALT, SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import { personSchema, websiteSchema } from "@/lib/structured-data";

const geist = Geist({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-geist",
});

// Only small labels use this, so it shouldn't compete with the page's main text.
const geistMono = Geist_Mono({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    preload: false,
    variable: "--font-geist-mono",
});

export function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const { META } = getDictionary(isLocale(lang) ? lang : "en");
    return {
        title: {
            default: META.home.title,
            template: `%s | ${SITE_NAME}`,
        },
        description: META.home.description,
        metadataBase: new URL(SITE_URL),
        openGraph: {
            siteName: SITE_NAME,
            type: "website",
            images: [{ url: OG_DEFAULT, alt: OG_DEFAULT_ALT }],
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLocale(rawLang)) notFound();
    const lang: Locale = rawLang;
    const { COMMON, FOOTER, NAV_CTA, NAV_LINKS } = getDictionary(lang);
    return (
        <html lang={lang} data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable}`}>
        <body className="flex min-h-screen flex-col">
        <JsonLd data={personSchema(lang)}/>
        <JsonLd data={websiteSchema(lang)}/>
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink-0 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
            {COMMON.skipToContent}
        </a>
        <Nav lang={lang} links={NAV_LINKS} cta={NAV_CTA} copy={COMMON}/>
        <main id="main-content" tabIndex={-1} className="grow outline-none">
            {children}
        </main>
        <Footer copy={FOOTER}/>
        <ScrollReveal/>
        </body>
        </html>
    );
}
