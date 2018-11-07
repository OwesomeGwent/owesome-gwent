import produce from 'immer';
import { CardData } from '../../../shared/CardData';
import { ICardAction } from '../actions/card';
import {
  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  SET_CARDS,
} from '../actions/ActionTypes';
import { IRootState } from '.';

interface ICardList {
  [cardId: string]: CardData;
}
interface IRawCards {
  readonly cards: ICardList;
  readonly status: 'SUCCESS' | 'ERROR' | 'INIT' | 'FETCHING';
}
export interface ICardState {
  readonly rawCards: IRawCards;
  readonly cards: CardData[];
}

const initialState: ICardState = {
  rawCards: {
    cards: {},
    status: 'INIT',
  },
  cards: [],
};
const reducer = (
  state: ICardState = initialState,
  action: ICardAction,
): ICardState => {
  return produce<ICardState>(state, draft => {
    switch (action.type) {
      case FETCH_CARDS: {
        draft.rawCards.status = 'FETCHING';
        return;
        // return 의미가 없지만 안하면 밑에서 타입추론을 못함.
      }
      case FETCH_CARDS_SUCCESS: {
        draft.rawCards.status = 'SUCCESS';
        draft.rawCards.cards = action.cards;
        return;
      }
      case FETCH_CARDS_FAILURE:
        draft.rawCards.status = 'ERROR';
        return;
      case SET_CARDS:
        draft.cards = action.cards;
        return;
      default:
        return;
    }
  });
};

export default reducer;
