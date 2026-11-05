import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

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
        default: "Paweł Ostromecki | AI workflows and production-ready software",
        template: "%s | ostromecki.dev",
    },
    description:
        "Senior software engineer and consultant. I bring AI into real business processes and build it to run safely in production.",
    metadataBase: new URL(SITE_URL),
    openGraph: {
        siteName: "ostromecki.dev",
        type: "website",
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
