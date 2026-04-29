import React, { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
  BASE_KEYWORDS_EN,
  BASE_KEYWORDS_PT,
} from '@/constants';
import { getTranslation } from '@/i18n';

import { env } from '@env';
import { WithLanguageParams } from '@/@types/i18n.types';
import { fallbackLng, languages } from '@/i18n/settings';
import { AppProvider } from '@/providers/app-provider';
import { AppLayout } from '@/components/layout/app-layout';
import withTranslation from '@/components/with-translation';

export const generateStaticParams = async () => {
  return languages.map((lng) => ({ lng }));
};

export const generateMetadata = async ({
  params,
}: WithLanguageParams): Promise<Metadata> => {
  const { lng } = await params;
  const {
    t,
    i18n: { language },
  } = await getTranslation(lng);

  const description = t(APP_DESCRIPTION);
  const ogImageUrl = `${env.APP_URL}/images/logo.png`;

  return {
    metadataBase: new URL(env.APP_URL),
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description,
    keywords: language === 'en' ? BASE_KEYWORDS_EN : BASE_KEYWORDS_PT,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: APP_DEFAULT_TITLE,
    },
    authors: {
      name: 'Yan Lucas',
      url: env.APP_URL,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${env.APP_URL}/${lng}`,
      languages: {
        'x-default': `${env.APP_URL}/en`,
        'pt-BR': `${env.APP_URL}/pt-BR`,
        en: `${env.APP_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      url: `${env.APP_URL}/${lng}`,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description,
      locale: language === 'pt-BR' ? 'pt_BR' : 'en_US',
      alternateLocale: language === 'pt-BR' ? 'en_US' : 'pt_BR',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: APP_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yanlucasp',
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description,
      images: [
        {
          url: ogImageUrl,
          alt: APP_NAME,
        },
      ],
    },
    formatDetection: {
      telephone: false,
    },
  };
};

const RootLayout: React.FC<WithLanguageParams<PropsWithChildren>> = async ({
  children,
  params,
}) => {
  const { lng } = await params;

  return (
    <AppProvider i18nCookie={lng ?? fallbackLng}>
      <AppLayout>{children}</AppLayout>
    </AppProvider>
  );
};

export default withTranslation(RootLayout);
