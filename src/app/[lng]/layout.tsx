import React, { PropsWithChildren } from 'react';

import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
  BASE_KEYWORDS_EN,
  BASE_KEYWORDS_PT,
} from '@/constants';
import { getTranslation } from '@/i18n';
import { cn } from '@/utils';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { dir } from 'i18next';

import { env } from '@env';
import { WithLanguageParams } from '@/@types/i18n.types';
import { getProjects } from '@/actions/getProjects';
import { fallbackLng, languages } from '@/i18n/settings';
import { AppProvider } from '@/providers/app-provider';
import CommandPalette from '@/components/CommandPalette';
import { AppLayout } from '@/components/layout/app-layout';
import withTranslation from '@/components/with-translation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

// Only the locales from generateStaticParams exist; anything else 404s straight
// away. Without this, a bot probing /wp-login.php (which matches this segment)
// renders the layout with "wp-login.php" as the locale and getTranslation
// throws.
export const dynamicParams = false;

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
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yanlucasp',
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description,
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
  const { lng = fallbackLng } = await params;
  const projects = await getProjects();

  // This is the root layout. <html> lives here rather than in app/layout.tsx so
  // `lang` comes from the [lng] segment: the old root layout read the i18next
  // cookie to set it, and that one cookies() call made every route dynamic —
  // a function invocation on every page view.
  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={cn(
          'font-inter bg-charcoal-black-700 flex min-h-screen p-0 antialiased',
          inter.variable,
        )}
      >
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-44CL7KD2J4"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-44CL7KD2J4');`}
        </Script>
        <AppProvider i18nCookie={lng}>
          <AppLayout>{children}</AppLayout>
          <CommandPalette projects={projects} />
        </AppProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default withTranslation(RootLayout);
