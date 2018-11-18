import { Locale } from '../../../shared/ILocaleData';

export const localeMap: { [locale: string]: Locale } = {
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  'es-MX': 'es-MX',
  fr: 'fr-FR',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pl: 'pl-PL',
  br: 'pt-BR',
  ru: 'ru-RU',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
};
const localeMapper = (locale: string = 'ko'): Locale => {
  const mappedLocale = localeMap[locale];
  if (!mappedLocale) {
    return localeMap.ko;
  }
  return mappedLocale;
};

export default localeMapper;
