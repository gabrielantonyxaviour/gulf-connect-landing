import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppWrapper } from "@/components/app-wrapper";
import { SITE_SEO, SITE_OFFICE } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_SEO.home.title,
  description: SITE_SEO.home.description,
  keywords: SITE_SEO.keywords,
  authors: [{ name: SITE_SEO.companyName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE_SEO.domain}`,
    siteName: SITE_SEO.companyName,
    title: SITE_SEO.home.title,
    description: SITE_SEO.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SEO.home.title,
    description: SITE_SEO.home.description,
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
