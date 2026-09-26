import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Gurmukhi, Space_Grotesk } from "next/font/google";
import "./globals.css";

/*
 * Fonts are self-hosted by next/font, so the site no longer depends on whatever
 * system font happens to be installed. Space Grotesk carries the display voice,
 * Inter handles interface and body copy, and the two Noto families give the
 * Punjabi and Hindi service labels a real typeface plus the correct text
 * language for assistive technology.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const gurmukhi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi"],
  variable: "--font-gurmukhi",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techpointservices.example"),
  title: {
    default: "Tech Point Services | Government Service Assistance",
    template: "%s | Tech Point Services",
  },
  description:
    "Tech Point Services helps with PAN, driving licence, passport, voter ID, Aadhaar-related services, certificates, online forms, printout, photocopy, and scanning.",
  applicationName: "Tech Point Services",
  openGraph: {
    type: "website",
    siteName: "Tech Point Services",
    title: "Tech Point Services | Government Service Assistance",
    description:
      "Choose a service, check which documents you already have, and send a request that is already clear.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Point Services | Government Service Assistance",
    description:
      "Choose a service, check which documents you already have, and send a request that is already clear.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#071f4f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${gurmukhi.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
