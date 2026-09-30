import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import { VOID } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
 * Display face. Chakra_Petch has no variable axis, so `weight` is required and
 * `font-display` resolves against the `--font-chakra-petch` token declared in
 * app/globals.css.
 */
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NULLBEACON — Encrypted Uplink Systems",
  description:
    "Hardened uplink infrastructure for operators. 41 mesh nodes, 8.4ms median relay latency, end-to-end encrypted. Zero telemetry, zero plaintext.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: VOID,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-cyan/60 focus:bg-surface focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-cyan"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
