import { combineReducers } from 'redux';
import cardReducer, { ICardState } from './card';
import localeReducer, { ILocaleState } from './locale';
export interface IRootState {
  card: ICardState;
  locale: ILocaleState;
}

export default combineReducers<IRootState>({
  card: cardReducer,
  locale: localeReducer,
});
