import { combineReducers } from 'redux';
import cardReducer, { ICardState } from './card';
export interface IRootState {
  card: ICardState;
}

export default combineReducers<IRootState>({
  card: cardReducer,
});
