import { SET_LOCALE } from './ActionTypes';
import { Locale } from '../../../shared/ILocaleData';

export interface ISET_LOCALE {
  type: typeof SET_LOCALE;
  locale: Locale;
}

export type LOCALE_ACTION = ISET_LOCALE;

export const setLocale = (locale: Locale) => {
  return {
    type: SET_LOCALE,
    locale,
  };
};
