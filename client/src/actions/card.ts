import { Dispatch } from 'redux';
import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_FAILURE,
  FETCH_CARDS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS,
  SET_CARDS,
} from './ActionTypes';
import { CardData, RawCardData } from '../../../shared/ICardData';
import { CardLocaleDataList } from '../../../shared/ILocaleData';
import { Locale } from '../types/locale';
import { fetchDefs } from '../apis/defs';
import { ThunkResult } from '../types/thunk';

// TODO: Error handling
export interface IFetchCards {
  type: typeof FETCH_CARDS_REQUEST;
}
export interface IFetchCardsFailure {
  type: typeof FETCH_CARDS_FAILURE;
}
export interface IFetchCardsSuccess {
  type: typeof FETCH_CARDS_SUCCESS;
  cards: RawCardData;
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
  cards: CardData[];
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
export const fetchDetails = (
  locale: Locale = Locale['KR'],
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
        type: FETCH_DETAILS_SUCCESS,
        locale,
        localeData,
      });
    } catch (err) {
      dispatch({
        type: FETCH_DETAILS_FAILURE,
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
