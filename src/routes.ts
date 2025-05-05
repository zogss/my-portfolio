import { languages } from './i18n/settings';

/**
 * The prefix for locale routes
 * Routes that start with this prefix are used for locale purposes
 * @type {string}
 */
export const LOCALE_PREFIX_REGEX: string = `/(${languages.join('|')})`;
