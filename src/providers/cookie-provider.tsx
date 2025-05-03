'use client';

import React, { PropsWithChildren, useMemo } from 'react';

import { createContext } from '@/lib/react-utils';

interface CookieContextType {
  cookie?: string;
}

const [Provider, useTranslationCookie] = createContext<CookieContextType>();

interface CookieProviderProps extends PropsWithChildren {
  i18nCookie?: string;
}

const TranslationCookieProvider: React.FC<CookieProviderProps> = ({
  children,
  i18nCookie,
}) => {
  const providerValue = useMemo(
    () => ({
      cookie: i18nCookie,
    }),
    [i18nCookie],
  );

  return <Provider value={providerValue}>{children}</Provider>;
};

export { TranslationCookieProvider, useTranslationCookie };
