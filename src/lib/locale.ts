import { DEFAULT_LOCALE, isLocale, type Locale } from './i18n';

export function localeFromValue(v: unknown): Locale {
  return isLocale(v) ? v : DEFAULT_LOCALE;
}
