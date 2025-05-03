import React, { PropsWithChildren } from 'react';
import { Metadata } from 'next';

import { WithLanguageParams } from '@/@types/i18n.types';
import getCookie from '@/actions/getCookie';
import { cookieName, languages } from '@/i18n/settings';
import { AppProvider } from '@/providers/app-provider';
import { AppLayout } from '@/components/layout/app-layout';
import withTranslation from '@/components/with-translation';

const APP_NAME = 'PriceTrack';
const APP_DEFAULT_TITLE = 'PriceTrack ';
const APP_TITLE_TEMPLATE = '%s - PriceTrack';
const APP_DESCRIPTION = 'Powered by TrackingTrade';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  formatDetection: {
    telephone: false,
  },
};

export const generateStaticParams = async () => {
  return languages.map((lng) => ({ lng }));
};

const RootLayout: React.FC<WithLanguageParams<PropsWithChildren>> = async ({
  children,
}) => {
  const i18nCookie = await getCookie(cookieName);

  return (
    <>
      {/* <AnimatePresenceLayout> */}
      <AppProvider i18nCookie={i18nCookie}>
        <AppLayout>{children}</AppLayout>
      </AppProvider>
      {/* </AnimatePresenceLayout> */}
    </>
  );
};

export default withTranslation(RootLayout);
