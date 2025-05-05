export type WithLanguageParams<T = object> = T & {
  params: Promise<{ lng: string }>;
};

export type WithLanguage<T = object> = T & { lng: string };
