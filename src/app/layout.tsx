import React, { PropsWithChildren } from 'react';

import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { APP_DEFAULT_TITLE, APP_NAME } from '@/constants';
import { cn } from '@/utils';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { dir } from 'i18next';

import getCookie from '@/actions/getCookie';
import { cookieName, fallbackLng } from '@/i18n/settings';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
  description:
    'Yan Lucas, software engineer passionate about developing interactive interfaces and high-quality digital experiences.',
  applicationName: APP_NAME,
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const lng = (await getCookie(cookieName)) || fallbackLng;

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
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
      <body
        className={cn(
          'font-inter bg-charcoal-black-700 flex min-h-screen p-0 antialiased',
          inter.variable,
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
