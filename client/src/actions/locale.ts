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
  return async (dispatch, getState) => {
    const checkLocale = () => getState().card.detail.localeData[locale];
    if (checkLocale()) {
      dispatch({
        type: SET_LOCALE,
        locale,
      });
    } else {
      await dispatch(fetchDetails(locale));
      if (checkLocale()) {
        dispatch({
          type: SET_LOCALE,
          locale,
        });
      }
    }
  };
};
