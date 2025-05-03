/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

import { useTranslationCookie } from '@/providers/cookie-provider';

import { getOptions, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

interface I18nOptions {
  lng: string | undefined;
  detection: {
    order: string[];
  };
  preload: string[];
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      async (language: string, namespace: string) =>
        import(`../../public/locales/${language}/${namespace}.json`),
    ),
  )
  .init<I18nOptions>({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

export const useTranslation = (
  _lng?: string,
  ns?: string | string[],
  options:
    | {
        keyPrefix?: string;
      }
    | undefined = {},
) => {
  if (_lng && !languages.includes(_lng)) {
    throw new Error(`Invalid language: ${_lng}`);
  }
  const { cookie } = useTranslationCookie();
  const lng = _lng || cookie;

  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    const [activeLng, setActiveLng] = useState<string>(
      i18n.resolvedLanguage || '',
    );

    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage || '');
    }, [activeLng, i18n.resolvedLanguage]);

    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }
  return ret;
};
