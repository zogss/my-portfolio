import React, { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { getTranslation } from '@/i18n';

import { env } from '@env';
import { WithLanguageParams } from '@/@types/i18n.types';
import getCookie from '@/actions/getCookie';
import { cookieName, languages } from '@/i18n/settings';
import { AppProvider } from '@/providers/app-provider';
import { AppLayout } from '@/components/layout/app-layout';
import withTranslation from '@/components/with-translation';

const APP_NAME = 'Yan Lucas';
const APP_DEFAULT_TITLE = 'Yan Lucas ';
const APP_TITLE_TEMPLATE = '%s - Yan Lucas';
const APP_DESCRIPTION = 'seo_description';

export const generateStaticParams = async () => {
  return languages.map((lng) => ({ lng }));
};

export const generateMetadata = async ({
  params,
}: WithLanguageParams<PropsWithChildren>): Promise<Metadata> => {
  const { lng } = await params;
  const {
    t,
    i18n: { language },
  } = await getTranslation(lng);

  return {
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: t(APP_DESCRIPTION),
    keywords:
      language === 'en'
        ? [
            'Yan',
            'Lucas',
            'Yan Lucas',
            'Yan lucas pereira branco',
            'Yan Lucas software engineer',
            'Yan Lucas frontend developer',
            'Yan Lucas front-end developer',
            'Web development',
            'Software engineer',
            'Frontend',
            'FrontEnd',
            'Front-end',
            'Front end',
            'Front end developer',
            'Front-end developer',
            'FrontEnd developer',
            'Tech',
            'Programming',
            'Games',
            'Gaming',
            'Digital marketing',
            'Marketing',
            'Developer',
            'JavaScript',
            'TypeScript',
            'React',
            'Vue',
            'Angular',
            'Node.js',
            'CSS',
            'HTML',
            'Web design',
            'UI/UX',
            'GitHub',
            'Open source',
          ]
        : [
            'Yan',
            'Lucas',
            'Yan Lucas',
            'Yan lucas pereira branco',
            'Yan Lucas software engineer',
            'Yan Lucas engenheiro de software',
            'Yan Lucas frontend developer',
            'Yan Lucas front-end developer',
            'Yan Lucas desenvolvedor de frontend',
            'Yan Lucas desenvolvedor de front-end',
            'Web development',
            'Desenvolvimento web',
            'Software engineer',
            'Engenheiro de software',
            'Frontent',
            'Front-end',
            'Front end',
            'FrontEnd',
            'Frontend developer',
            'Front-end developer',
            'Front end developer',
            'FrontEnd developer',
            'Desenvolvedor de frontend',
            'Desenvolvedor de front-end',
            'Desenvolvedor front end',
            'Desenvolvedor front-end',
            'Desenvolvedor frontend',
            'Desenvolvedor frontEnd',
            'Tech',
            'Programming',
            'Games',
            'Gaming',
            'Programming',
            'Digital marketing',
            'Marketing',
            'Marketing digital',
            'Marketing-digital',
            'Developer',
            'JavaScript',
            'TypeScript',
            'React',
            'Vue',
            'Angular',
            'Node.js',
            'CSS',
            'HTML',
            'Web design',
            'UI/UX',
            'GitHub',
            'Open source',
          ],
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
      notranslate: lng === 'pt-BR',
    },
    alternates: {
      languages: {
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
      description: t(APP_DESCRIPTION),
      locale: lng,
      images: [
        {
          url: `${env.APP_URL}/images/logo.png`,
          width: 1600,
          height: 1600,
          alt: APP_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary',
      creator: 'Yan Lucas',
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: t(APP_DESCRIPTION),
      images: [
        {
          url: `${env.APP_URL}/images/logo.png`,
          width: 1600,
          height: 1600,
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
