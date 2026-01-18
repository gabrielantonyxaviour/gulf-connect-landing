import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { AppWrapper } from "@/components/app-wrapper";
import { SITE_SEO } from "@/lib/constants";
import { languages, type Locale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: SITE_SEO.home.title,
  description: SITE_SEO.home.description,
  keywords: [...SITE_SEO.keywords],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale() as Locale;
  const messages = await getMessages();
  const dir = languages[locale]?.dir || 'ltr';

  return (
    <html lang={locale} dir={dir} className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AppWrapper>{children}</AppWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
