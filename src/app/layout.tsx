import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { localeDirection } from "@/lib/i18n/config";
import { SplashGate } from "@/features/splash/components/SplashGate";
import "./globals.css";

// Project typeface. Quicksand covers Latin; Arabic falls back to the system
// sans (see globals.css font stack) until an Arabic face is added.
const appSans = Quicksand({
  variable: "--font-app-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RDB Management",
  description: "Agent bank & country manager administration",
};

// Let the design system own scaling — disable the browser's user zoom fighting
// our viewport-driven rem engine, but keep it accessible (maximumScale allowed).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The locale comes from the cookie (resolved by next-intl). `dir` is derived
  // once here — the ONLY place direction is set. Components stay direction-
  // agnostic via logical utilities (see AGENTS.md §10).
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={localeDirection(locale)}
      className={`${appSans.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {/* Splash overlay on every full page load / refresh (see SplashGate). */}
        <SplashGate />
      </body>
    </html>
  );
}
