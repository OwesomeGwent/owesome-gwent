import { Dispatch } from 'redux';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { CardLocaleDataList } from '../../../shared/ILocaleData';
import { fetchDefs } from '../apis/defs';
import { Locale } from '../types/locale';
import { ThunkResult } from '../types/thunk';
import {
  FETCH_CARDS_FAILURE,
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS,
  SET_CARDS,
} from './ActionTypes';

// TODO: Error handling
export interface IFetchCards {
  type: typeof FETCH_CARDS_REQUEST;
}
export interface IFetchCardsFailure {
  type: typeof FETCH_CARDS_FAILURE;
}
export interface IFetchCardsSuccess {
  type: typeof FETCH_CARDS_SUCCESS;
  cards: CardDataList;
}
export interface IFetchDetails {
  type: typeof FETCH_DETAILS_REQUEST;
}
export interface IFetchDetailsSuccess {
  type: typeof FETCH_DETAILS_SUCCESS;
  locale: Locale;
  localeData: CardLocaleDataList;
}
export interface IFetchDetailsFailure {
  type: typeof FETCH_DETAILS_FAILURE;
}
export interface ISetCards {
  type: typeof SET_CARDS;
  leader: CardData[];
  normal: CardData[];
}
export type ICardAction =
  | IFetchCards
  | IFetchCardsFailure
  | IFetchCardsSuccess
  | IFetchDetails
  | IFetchDetailsSuccess
  | IFetchDetailsFailure
  | ISetCards;

export type ICardThunkAction = ThunkResult<void, ICardAction>;

export const fetchCards = (): ThunkResult<void, IFetchCards> => {
  return async (dispatch: Dispatch<ICardAction>) => {
    dispatch({
      type: FETCH_CARDS_REQUEST,
    });
    try {
      const {
        data: { data: cards },
      } = await fetchDefs('card-data');
      dispatch({
        cards,
        type: FETCH_CARDS_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: FETCH_CARDS_FAILURE,
      });
    }
  };
};
export const fetchDetails = (
  locale: Locale,
): ThunkResult<void, ICardAction> => {
  return async (dispatch: Dispatch<ICardAction>) => {
    dispatch({
      type: FETCH_DETAILS_REQUEST,
    });
    try {
      const {
        data: { data: localeData },
      } = await fetchDefs(`${locale}`);
      dispatch({
        locale,
        localeData,
        type: FETCH_DETAILS_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: FETCH_DETAILS_FAILURE,
      });
    }
  };
};
export const setCards = (leader: CardData[], normal: CardData[]): ISetCards => {
  return {
    leader,
    normal,
    type: SET_CARDS,
  };
};
