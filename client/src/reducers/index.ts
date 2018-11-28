import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './auth';
import cardReducer, { ICardState } from './card';
import deckReducer, { IDeckState } from './deck';
import filterReducer, { IFilterState } from './filter';
import localeReducer, { ILocaleState } from './locale';

export interface IRootState {
  auth: IAuthState;
  card: ICardState;
  locale: ILocaleState;
  deck: IDeckState;
  filter: IFilterState;
}

export default combineReducers<IRootState>({
  auth: authReducer,
  card: cardReducer,
  locale: localeReducer,
  deck: deckReducer,
  filter: filterReducer,
});
