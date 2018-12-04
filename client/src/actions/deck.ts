import { CardData } from '../../../shared/ICardData';
import * as deckApi from '../apis/deck';
import { parseUrl } from '../helpers/deckUrl';
import { DeckMakerStatus, IAddDeck, IDeck } from '../types/deck';
import { ThunkResult } from '../types/thunk';
import {
  ADD_DECK_FAILURE,
  ADD_DECK_REQUEST,
  ADD_DECK_SUCCESS,
  REMOVE_CARD,
  REMOVE_LEADER,
  RESET_CARD,
  RESET_DECK,
  SELECT_CARD,
  SELECT_DECK_URL,
  SELECT_LEADER,
  SET_CURRENT_DECK,
  SET_DECKMAKER_STATUS,
  STAR_DECK_FAILURE,
  STAR_DECK_REQUEST,
  STAR_DECK_SUCCESS,
  UPDATE_DECK_FAILURE,
  UPDATE_DECK_REQUEST,
  UPDATE_DECK_SUCCESS,
} from './ActionTypes';

export interface ISetDeckMakerStatus {
  type: typeof SET_DECKMAKER_STATUS;
  payload: {
    status: DeckMakerStatus;
  };
}

export interface ISelectLeader {
  type: typeof SELECT_LEADER;
  payload: {
    card: CardData;
  };
}

export interface IRemoveLeader {
  type: typeof REMOVE_LEADER;
}

export interface ISelectCard {
  type: typeof SELECT_CARD;
  payload: {
    card: CardData | CardData[];
  };
}

export interface ISelectDeckUrl {
  type: typeof SELECT_DECK_URL;
  url: string;
}
export interface IRemoveCard {
  type: typeof REMOVE_CARD;
  payload: {
    cardId: string;
  };
}
export interface IResetCard {
  type: typeof RESET_CARD;
}
export interface IResetDeck {
  type: typeof RESET_DECK;
}

export interface IAddDeckRequest {
  type: typeof ADD_DECK_REQUEST;
}
export interface IAddDeckSuccess {
  type: typeof ADD_DECK_SUCCESS;
  deck: IDeck;
}
export interface IAddDeckFailure {
  type: typeof ADD_DECK_FAILURE;
  error: string;
}
export interface IUpdateDeckRequest {
  type: typeof UPDATE_DECK_REQUEST;
}
export interface IUpdateDeckSuccess {
  type: typeof UPDATE_DECK_SUCCESS;
  deck: IDeck;
}
export interface IUpdateDeckFailure {
  type: typeof UPDATE_DECK_FAILURE;
  error: string;
}
export interface IStarDeckRequest {
  type: typeof STAR_DECK_REQUEST;
  deckId: string;
}
export interface IStarDeckSuccess {
  type: typeof STAR_DECK_SUCCESS;
  deck: IDeck;
}
export interface IStarDeckFailure {
  type: typeof STAR_DECK_FAILURE;
  error: string;
}
export interface ISetCurrentDeck {
  type: typeof SET_CURRENT_DECK;
  deck: IDeck;
}
export type IDeckActions =
  | ISetDeckMakerStatus
  | ISelectCard
  | IRemoveCard
  | IResetCard
  | IResetDeck
  | IAddDeckRequest
  | IAddDeckSuccess
  | IAddDeckFailure
  | IUpdateDeckRequest
  | IUpdateDeckSuccess
  | IUpdateDeckFailure
  | IStarDeckRequest
  | IStarDeckSuccess
  | IStarDeckFailure
  | ISelectLeader
  | ISelectDeckUrl
  | ISetCurrentDeck
  | IRemoveLeader;

export const setDeckMakerStatus = (
  status: DeckMakerStatus,
): ISetDeckMakerStatus => ({
  type: SET_DECKMAKER_STATUS,
  payload: {
    status,
  },
});

export const selectCard = (card: CardData | CardData[]): ISelectCard => ({
  type: SELECT_CARD,
  payload: { card },
});
export const removeCard = (cardId: string): IRemoveCard => ({
  type: REMOVE_CARD,
  payload: { cardId },
});
// 필요할 듯?
export const resetCard = (): IResetCard => ({
  type: RESET_CARD,
});
export const resetDeck = (): IResetDeck => ({
  type: RESET_DECK,
});
export const updateDeck = (deck: IDeck): ThunkResult<void, IDeckActions> => {
  // 현재 deck id에 맞는 db deck을 업데이트
  return async dispatch => {
    dispatch({
      type: UPDATE_DECK_REQUEST,
    });
    try {
      const {
        data: { deck: newDeck },
      } = await deckApi.updateDeck(deck);
      dispatch({
        type: UPDATE_DECK_SUCCESS,
        deck: newDeck,
      });
    } catch (err) {
      const {
        response: { data: error },
      } = err;
      dispatch({
        type: UPDATE_DECK_FAILURE,
        error,
      });
    }
  };
};
export const starDeck = (deckId: string): ThunkResult<void, IDeckActions> => {
  return async dispatch => {
    dispatch({
      type: STAR_DECK_REQUEST,
      deckId,
    });
    try {
      const {
        data: { deck },
      } = await deckApi.starDeck(deckId);
      dispatch({
        type: STAR_DECK_SUCCESS,
        deck,
      });
    } catch (err) {
      const { response } = err;
      const error = response ? (response.data ? response.data.error : '') : '';
      dispatch({
        type: STAR_DECK_FAILURE,
        error,
      });
    }
  };
};
export const selectLeader = (card: CardData): IDeckActions => {
  // 현재 리더와 faction이 같지 않은 경우 faction 등록은 Reducer 확인.
  return {
    type: SELECT_LEADER,
    payload: { card },
  };
};

export const removeLeader = (): IRemoveLeader => ({
  type: REMOVE_LEADER,
});

export const selectDeckUrl = (url: string): ThunkResult<void, IDeckActions> => {
  return (dispatch, getState) => {
    const state = getState();
    if (url) {
      // url에 따라 변경
      const [leaderId, cardIds] = parseUrl(url);
      const { leader, normal } = state.card.cards;
      const selectedLeader = leader.find(card => card.ingameId === leaderId);
      const selectedCard = normal.reduce((acc: CardData[], card) => {
        cardIds.forEach(cardId => {
          if (cardId === card.ingameId) {
            acc.push(card);
          }
        });
        return acc;
      }, []);
      if (selectedLeader) {
        dispatch(setDeckMakerStatus('DECKMAKE'));
        dispatch(selectLeader(selectedLeader));
        dispatch(selectCard(selectedCard));
      } else {
        dispatch(resetDeck());
      }
      // history.push(url);
      // history.pushState({}, url, url);
    } else {
      dispatch(resetDeck());
    }
  };
};

export const setCurrentDeck = (deck: IDeck): IDeckActions => ({
  type: SET_CURRENT_DECK,
  deck,
});

export const addDeck = (deck: IAddDeck): ThunkResult<void, IDeckActions> => {
  return async dispatch => {
    dispatch({
      type: ADD_DECK_REQUEST,
    });
    try {
      const {
        data: { deck: newDeck },
      } = await deckApi.addDeck(deck);
      dispatch({
        type: ADD_DECK_SUCCESS,
        deck: newDeck,
      });
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: ADD_DECK_FAILURE,
        error,
      });
    }
  };
};
