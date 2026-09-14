import '@/styles/globals.css';

import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { cn } from '@/utils';

import HomeEclipse from '@/components/svgs/HomeEclipse';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Page not found | Yan Lucas',
  description: 'The page you are looking for does not exist.',
};

/**
 * Served for URLs that match no route at all. It bypasses every layout, so it
 * brings its own stylesheet and font, and has no locale to read — English.
 */
const GlobalNotFound: React.FC = () => (
  <html lang="en">
    <body
      className={cn(
        'font-inter bg-charcoal-black-700 flex min-h-screen p-0 antialiased',
        inter.variable,
      )}
    >
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden p-6 text-center text-neutral-100">
        <div className="absolute top-1/2 left-1/2 h-auto w-[150vw] -translate-x-1/2 -translate-y-1/2">
          <HomeEclipse className="size-full opacity-35" />
        </div>
        <h1 className="relative text-3xl font-extrabold text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="relative text-base text-gray-300 sm:text-lg">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="relative rounded-md px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Back to home
        </Link>
      </main>
    </body>
  </html>
);

export default GlobalNotFound;
