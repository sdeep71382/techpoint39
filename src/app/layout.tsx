import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Point Services | Government Service Assistance",
  description:
    "Tech Point Services helps with PAN, driving licence, passport, voter ID, Aadhaar-related services, certificates, online forms, printout, photocopy, and scanning.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


