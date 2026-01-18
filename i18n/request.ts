import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { defaultLocale, locales, type Locale, getLocaleFromCountry } from './config';

export default getRequestConfig(async () => {
  // Try to get locale from cookie first (user's explicit choice)
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;

  if (localeCookie && locales.includes(localeCookie)) {
    return {
      locale: localeCookie,
      messages: (await import(`./messages/${localeCookie}.json`)).default,
    };
  }

  // Try to detect country from headers (Vercel provides this)
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country') || '';

  if (country) {
    const detectedLocale = getLocaleFromCountry(country);
    return {
      locale: detectedLocale,
      messages: (await import(`./messages/${detectedLocale}.json`)).default,
    };
  }

  // Try Accept-Language header
  const acceptLanguage = headersList.get('accept-language') || '';
  const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();

  if (preferredLocale && locales.includes(preferredLocale as Locale)) {
    return {
      locale: preferredLocale as Locale,
      messages: (await import(`./messages/${preferredLocale}.json`)).default,
    };
  }

  // Default to English
  return {
    locale: defaultLocale,
    messages: (await import(`./messages/${defaultLocale}.json`)).default,
  };
});
