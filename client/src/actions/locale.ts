import { Locale } from '../../../shared/ILocaleData';
import { ThunkResult } from '../types/thunk';
import { SET_LOCALE } from './ActionTypes';
import { fetchDetails } from './card';
export interface ISetLocale {
  type: typeof SET_LOCALE;
  locale: Locale;
}

export type ILocaleAction = ISetLocale;
export const setLocale = (locale: Locale): ThunkResult<void, ISetLocale> => {
  return dispatch => {
    dispatch({
      type: SET_LOCALE,
      locale,
    });
    dispatch(fetchDetails(locale));
  };
};
