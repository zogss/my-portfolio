import { NextResponse } from 'next/server';

// import { env } from '@env';

export const fallbackLng = 'en';

export const languages = [fallbackLng, 'pt-BR'];

export const defaultNS = 'translations';

export const cookieName = 'i18next';

export const getOptions = (
  lng: string | undefined = fallbackLng,
  ns: string | string[] | undefined = defaultNS,
) => {
  return {
    // debug: env.NODE_ENV === 'development',
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
};

export const setLngCookieOnResponse = (response: NextResponse, lng: string) => {
  const currCookie = response.cookies.get(cookieName)?.value;
  if (currCookie !== lng) {
    response.cookies.set(cookieName, lng);
  }
  return response;
};
