import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactFab } from "@/components/ContactFab";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { OG_DEFAULT, OG_DEFAULT_ALT, SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Splash } from "@/components/Splash";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { SPLASH_SCRIPT } from "@/lib/splash";
import { THEME_SCRIPT } from "@/lib/theme";

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
    const { COMMON, FAB, FOOTER, NAV_CTA, NAV_LINKS } = getDictionary(lang);
    return (
        <html lang={lang} data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <head>
            {/* Sets data-theme before first paint, so the page never flashes the other theme. */}
            <script dangerouslySetInnerHTML={{__html: THEME_SCRIPT}}/>
            {/* First visit only: sets data-splash before first paint so the splash overlay can cover the page. */}
            <script dangerouslySetInnerHTML={{__html: SPLASH_SCRIPT}}/>
        </head>
        <body className="flex min-h-screen flex-col">
        <Splash skip={COMMON.skipSplash} label={COMMON.splashLabel}/>
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
        {/* A direct child of body in the server markup, so the splash and the mobile menu can make it inert. */}
        <ContactFab copy={FAB}/>
        <ScrollReveal/>
        </body>
        </html>
    );
}
