import { combineReducers } from 'redux';
import cardReducer, { ICardState } from './card';
import deckReducer, { IDeckState } from './deck';
import filterReducer, { IFilterState } from './filter';
import localeReducer, { ILocaleState } from './locale';
export interface IRootState {
  card: ICardState;
  locale: ILocaleState;
  deck: IDeckState;
  filter: IFilterState;
}

export default combineReducers<IRootState>({
  card: cardReducer,
  locale: localeReducer,
  deck: deckReducer,
  filter: filterReducer,
});
