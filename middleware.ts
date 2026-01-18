import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, countryToLocale, type Locale } from './i18n/config';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Create response to pass through
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // Handle locale detection for non-admin routes
  if (!pathname.startsWith('/admin')) {
    // Check if user already has a locale preference in cookie
    const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;

    if (!localeCookie) {
      // Try to detect locale from Accept-Language header first
      const acceptLanguage = req.headers.get('accept-language');
      let detectedLocale: Locale = defaultLocale;

      if (acceptLanguage) {
        const browserLocales = acceptLanguage
          .split(',')
          .map(lang => lang.split(';')[0].trim().split('-')[0]);

        for (const browserLocale of browserLocales) {
          if (locales.includes(browserLocale as Locale)) {
            detectedLocale = browserLocale as Locale;
            break;
          }
        }
      }

      // Try to detect from Cloudflare country header (if available)
      const country = req.headers.get('cf-ipcountry');
      if (country && countryToLocale[country]) {
        detectedLocale = countryToLocale[country];
      }

      // Also try Vercel's geo header
      const vercelCountry = req.headers.get('x-vercel-ip-country');
      if (vercelCountry && countryToLocale[vercelCountry]) {
        detectedLocale = countryToLocale[vercelCountry];
      }

      // Set the detected locale in a cookie
      response.cookies.set('NEXT_LOCALE', detectedLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        sameSite: 'lax',
      });
    }
  }

  // Handle admin routes with Supabase auth
  if (pathname.startsWith('/admin')) {
    // Create supabase client to refresh session cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              req.cookies.set(name, value)
            );
            response = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            // Preserve the NEXT_LOCALE cookie when setting auth cookies
            const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;
            if (localeCookie) {
              response.cookies.set('NEXT_LOCALE', localeCookie, {
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
                sameSite: 'lax',
              });
            }
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Use getUser() to validate and refresh the session token
    // getSession() only reads from cookies, getUser() actually validates with the server
    // This ensures tokens are refreshed before they expire
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next|api|.*\\..*).*)',
  ],
};
