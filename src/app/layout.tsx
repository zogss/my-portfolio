import React, { PropsWithChildren } from 'react';

import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import Script from 'next/script';
import { cn } from '@/utils';
import { Analytics } from '@vercel/analytics/next';
import { dir } from 'i18next';

import getCookie from '@/actions/getCookie';
import { cookieName, fallbackLng } from '@/i18n/settings';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const i18nCookie = await getCookie(cookieName);
  const lng = i18nCookie || fallbackLng;

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-44CL7KD2J4"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
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
      </body>
    </html>
  );
};

export default RootLayout;
