import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { languageCtx } from '@/lib/server-ctx';

import { getOptions, languages } from './settings';

export const initI18next = async (
  lng?: string,
  ns?: string | string[],
): Promise<ReturnType<typeof createInstance>> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export const getTranslation = async (
  _lng?: string,
  ns?: string | string[],
  options:
    | {
        keyPrefix?: string;
      }
    | undefined = {},
) => {
  console.log(_lng);
  if (_lng && !languages.includes(_lng)) {
    throw new Error(`Invalid language: ${_lng}`);
  }
  const ctx = languageCtx.get();
  const lng = _lng || ctx.lng;

  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(
      lng ? lng : [],
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
};
