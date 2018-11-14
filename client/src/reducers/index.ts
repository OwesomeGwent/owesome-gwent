import { combineReducers } from 'redux';
import cardReducer, { ICardState } from './card';
import deckReducer, { IDeckState } from './deck';
import localeReducer, { ILocaleState } from './locale';
export interface IRootState {
  card: ICardState;
  locale: ILocaleState;
  deck: IDeckState;
}

export default combineReducers<IRootState>({
  card: cardReducer,
  locale: localeReducer,
  deck: deckReducer,
});
