import { Locale } from '../../../shared/ILocaleData';
import { SET_LOCALE } from './ActionTypes';

export interface ISETLOCALE {
  type: typeof SET_LOCALE;
  locale: Locale;
}

export type LOCALE_ACTION = ISETLOCALE;

export const setLocale = (locale: Locale) => {
  return {
    type: SET_LOCALE,
    locale,
  };
};
