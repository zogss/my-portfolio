import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { lng } from 'next/root-params';
import { getTranslation } from '@/i18n';

import { fallbackLng } from '@/i18n/settings';
import HomeEclipse from '@/components/svgs/HomeEclipse';

/**
 * 404 inside a locale. `not-found` receives no props, so the locale is read with
 * the root-param getter — unlike the cookie it replaced, that keeps the page
 * static.
 */
const NotFound: React.FC = async () => {
  const locale = (await lng()) ?? fallbackLng;
  const { t } = await getTranslation(locale);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden p-6 text-neutral-100 sm:p-10 lg:gap-8 lg:p-24">
      <div className="absolute top-1/2 left-1/2 h-auto w-[150vw] -translate-x-1/2 -translate-y-1/2">
        <HomeEclipse className="size-full opacity-35" />
      </div>
      <div className="relative flex max-w-xl flex-col items-center text-center">
        <Image
          src="/images/404-illustration.png"
          alt="404 illustration"
          priority
          width={300}
          height={300}
          className="mb-4 rounded-lg shadow-lg sm:mb-6 sm:size-80"
        />
        <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:mb-4 lg:text-4xl">
          {t('not_found_title')}
        </h1>
        <p className="mb-4 text-base text-gray-300 sm:text-lg lg:mb-6 lg:text-xl">
          {t('not_found_description')}
        </p>
        <Link
          href={`/${locale}`}
          className="mt-4 flex items-center gap-4 rounded-md px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:mt-6 sm:px-8 sm:py-4 sm:text-base"
        >
          {t('not_found_button')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
