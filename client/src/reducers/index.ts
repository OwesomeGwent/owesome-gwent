import { combineReducers } from 'redux';
import cardReducer, { ICardState } from './card';
import collectionReducer, { ICollectionState } from './collection';
import deckReducer, { IDeckState } from './deck';
import filterReducer, { IFilterState } from './filter';
import localeReducer, { ILocaleState } from './locale';
import userReducer, { IUserState } from './user';

export interface IRootState {
  user: IUserState;
  card: ICardState;
  collection: ICollectionState;
  locale: ILocaleState;
  deck: IDeckState;
  filter: IFilterState;
}

export default combineReducers<IRootState>({
  user: userReducer,
  card: cardReducer,
  collection: collectionReducer,
  locale: localeReducer,
  deck: deckReducer,
  filter: filterReducer,
});
