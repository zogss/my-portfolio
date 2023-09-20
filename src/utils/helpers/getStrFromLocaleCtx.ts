export const getStrFromLocaleCtx = (locales: string, key: string) => {
  const localesObj = JSON.parse(locales) as { [key: string]: string }

  return Object.keys(localesObj).includes(key) ? localesObj[key] : key
}
