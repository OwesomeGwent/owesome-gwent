import { Locale } from '../../../shared/ILocaleData';
import { SET_LOCALE } from '../actions/ActionTypes';
import { ILocaleAction } from '../actions/locale';
import localeMapper from '../helpers/localeMapper';

const defaultLocale = localeMapper();
export interface ILocaleState {
  locale: Locale;
}
const initialState: ILocaleState = {
  locale: defaultLocale,
};

const reducer = (
  state: ILocaleState = initialState,
  action: ILocaleAction,
): ILocaleState => {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, locale: action.locale };
    default:
      return state;
  }
};

export default reducer;
