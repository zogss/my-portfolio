import { NextRequest, NextResponse } from 'next/server';
import type { ProxyConfig } from 'next/server';
import acceptLanguage from 'accept-language';

import {
  cookieName,
  fallbackLng,
  languages,
  setLngCookieOnResponse,
} from '@/i18n/settings';

acceptLanguage.languages(languages);

export const config: ProxyConfig = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const proxy = async (req: NextRequest): Promise<NextResponse | void> => {
  const { nextUrl } = req;

  const isException = [
    '/img',
    '/preview',
    '/icons',
    '/logo.svg',
    '/api',
    '/manifest.json',
    '/sw.js',
    '/favicon.ico',
    '/__next',
  ].some((allowedPath) => nextUrl.pathname.startsWith(allowedPath));
  if (isException) {
    return;
  }

  const pathnameIsMissingLocale = languages.every(
    (loc) =>
      !nextUrl.pathname.startsWith(`/${loc}/`) &&
      nextUrl.pathname !== `/${loc}`,
  );

  let lng: string | null = null;
  if (!pathnameIsMissingLocale) {
    const pathSegment = nextUrl.pathname.split('/')[1] || '';
    lng = languages.includes(pathSegment) ? pathSegment : null;
  }
  if (!lng) {
    const lngPresentOnCookie = req.cookies.get(cookieName)?.value || '';
    lng = languages.includes(lngPresentOnCookie) ? lngPresentOnCookie : null;
  }
  if (!lng) {
    lng = fallbackLng;
  }

  if (pathnameIsMissingLocale && !nextUrl.pathname.startsWith('/_next')) {
    return setLngCookieOnResponse(
      NextResponse.redirect(
        new URL(`/${lng}${nextUrl.pathname}${nextUrl.search}`, nextUrl),
      ),
      lng,
    );
  }

  return setLngCookieOnResponse(NextResponse.next(), lng);
};

export default proxy;
