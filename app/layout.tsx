import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { themeBootstrapScript } from "@/lib/theme";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    display: "swap",
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: {
        default: "Paweł Ostromecki | Portfolio",
        template: "%s | ostromecki.dev",
    },
    description:
        "Senior frontend engineer — Angular, TypeScript, full-stack architecture. Community lead at Angular Wrocław.",
    metadataBase: new URL("https://ostromecki.dev"),
    openGraph: {
        siteName: "ostromecki.dev",
        type: "website",
    },
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.variable} suppressHydrationWarning>
        <head>
            <Script id="theme-bootstrap" strategy="beforeInteractive">
                {themeBootstrapScript}
            </Script>
        </head>
        <body className="flex flex-col min-h-screen">
        <Providers>
            <Nav/>
            <main id="main-content" className="flex-grow">
                {children}
            </main>
            <Footer/>
            <ScrollToTop/>
        </Providers>
        </body>
        </html>
    );
}
