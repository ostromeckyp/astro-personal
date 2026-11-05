import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OG_DEFAULT, OG_DEFAULT_ALT, SITE_DEFAULT_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
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

export const metadata: Metadata = {
    title: {
        default: SITE_DEFAULT_TITLE,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
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

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable}`}>
        <body className="flex min-h-screen flex-col">
        <JsonLd data={personSchema()}/>
        <JsonLd data={websiteSchema()}/>
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink-0 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
            Skip to content
        </a>
        <Nav/>
        <main id="main-content" tabIndex={-1} className="grow outline-none">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
