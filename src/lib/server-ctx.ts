import { cache } from 'react';

const serverContext = <T>(
  defaultValue: T,
): { get: () => T; set: (v: T) => void } => {
  const getRef = cache(() => ({ current: defaultValue }));

  const getValue = (): T => getRef().current;

  const setValue = (value: T) => {
    getRef().current = value;
  };

  return { get: getValue, set: setValue };
};

// Contexts
export const languageCtx = serverContext({ lng: 'en' });
