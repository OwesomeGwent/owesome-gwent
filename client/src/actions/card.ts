import { Dispatch } from 'redux';
import {
  FETCH_CARDS,
  FETCH_CARDS_FAILURE,
  FETCH_CARDS_SUCCESS,
  SET_CARDS,
} from './ActionTypes';
import { CardData } from '../../../shared/CardData';
import { fetchDefs } from '../apis/defs';
import { ThunkResult } from '../types/thunk';

export interface IFetchCards {
  type: typeof FETCH_CARDS;
}
export interface IFetchCardsFailure {
  type: typeof FETCH_CARDS_FAILURE;
}
export interface IFetchCardsSuccess {
  type: typeof FETCH_CARDS_SUCCESS;
  cards: {
    [cardId: string]: CardData;
  };
}

export interface ISetCards {
  type: typeof SET_CARDS;
  cards: CardData[];
}

export type ICardAction =
  | IFetchCards
  | IFetchCardsFailure
  | IFetchCardsSuccess
  | ISetCards;

export type ICardThunkAction = ThunkResult<void, ICardAction>;

export const fetchCards = (): ThunkResult<void, ICardAction> => {
  return async (dispatch: Dispatch<ICardAction>) => {
    dispatch({
      type: FETCH_CARDS,
    });
    try {
      const {
        data: { data: cards },
      } = await fetchDefs('card-data');
      dispatch({
        type: FETCH_CARDS_SUCCESS,
        cards,
      });
    } catch (err) {
      dispatch({
        type: FETCH_CARDS_FAILURE,
      });
    }
  };
};
export const setCards = (cards: CardData[]): ISetCards => {
  return {
    type: SET_CARDS,
    cards,
  };
};
