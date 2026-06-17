import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const appSans = Geist({
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${appSans.variable} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
