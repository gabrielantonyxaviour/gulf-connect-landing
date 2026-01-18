import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppWrapper } from "@/components/app-wrapper";
import { SEO, COMPANY } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: [
    "IoT",
    "Automation",
    "e-Surveillance",
    "Blockchain",
    "Web3",
    "Embedded Systems",
    "OEM",
    "ODM",
    "Chennai",
    "India",
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${COMPANY.domain}`,
    siteName: COMPANY.name,
    title: SEO.home.title,
    description: SEO.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.home.title,
    description: SEO.home.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
