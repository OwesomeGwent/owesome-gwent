import produce from 'immer';
import { Locale } from '../../../shared/ILocaleData';
import { SET_LOCALE } from '../actions/ActionTypes';
import { LOCALE_ACTION } from '../actions/locale';
import localeMapper from '../helpers/localeMapper';

export type ILocaleState = Locale;
const initialState: Locale = localeMapper();

const reducer = (
  state: Locale = initialState,
  action: LOCALE_ACTION,
): Locale => {
  return produce<Locale>(state, draft => {
    switch (action.type) {
      case SET_LOCALE:
        draft = action.locale;
        break;
      default:
        break;
    }
  });
};

export default reducer;
