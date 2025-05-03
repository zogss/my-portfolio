import React, { PropsWithChildren } from 'react';

import { TranslationCookieProvider } from './cookie-provider';

interface AppProviderProps extends PropsWithChildren {
  i18nCookie?: string;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  i18nCookie,
}) => {
  return (
    <TranslationCookieProvider i18nCookie={i18nCookie}>
      {children}
    </TranslationCookieProvider>
  );
};
