import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OG_DEFAULT, OG_DEFAULT_ALT, SITE_DEFAULT_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geist = Geist({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
    variable: "--font-geist",
});

const geistMono = Geist_Mono({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "600"],
    display: "swap",
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
        <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
        <body className="flex min-h-screen flex-col">
        <Providers>
            <Nav/>
            <main id="main-content" className="grow">
                {children}
            </main>
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}
