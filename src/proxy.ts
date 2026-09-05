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
  const { pathname } = nextUrl;

  // Nothing here is a localized page, so none of it may be locale-redirected: a
  // 307 to /{lng}{path} lands on a 404 because no such route exists.
  //
  // This used to be a hand-maintained allowlist, which silently broke anything
  // that was not on it — /icon.svg (the SVG favicon) and, more importantly,
  // /_vercel/insights and /_vercel/speed-insights, so no analytics ever loaded.
  // Matching on "has a file extension" covers every current and future public
  // asset; no route in this app has a dot in its path.
  const isPublicFile = /\.[a-z0-9]+$/i.test(pathname);
  const isInfraPath = ['/api', '/_next', '/__next', '/_vercel'].some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (isPublicFile || isInfraPath) {
    return;
  }

  const pathnameIsMissingLocale = languages.every(
    (loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`,
  );

  let lng: string | null = null;
  if (!pathnameIsMissingLocale) {
    const pathSegment = pathname.split('/')[1] || '';
    lng = languages.includes(pathSegment) ? pathSegment : null;
  }
  if (!lng) {
    const lngPresentOnCookie = req.cookies.get(cookieName)?.value || '';
    lng = languages.includes(lngPresentOnCookie) ? lngPresentOnCookie : null;
  }
  if (!lng) {
    lng = fallbackLng;
  }

  if (pathnameIsMissingLocale) {
    return setLngCookieOnResponse(
      NextResponse.redirect(
        new URL(`/${lng}${pathname}${nextUrl.search}`, nextUrl),
      ),
      lng,
    );
  }

  return setLngCookieOnResponse(NextResponse.next(), lng);
};

export default proxy;
