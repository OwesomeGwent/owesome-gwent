import { CardData } from '../../../shared/ICardData';
import { DeckMakerStatus } from '../types/deck';
import { FilterType } from '../types/filter';
import { ThunkResult } from '../types/thunk';
import {
  REMOVE_CARD,
  REMOVE_LEADER,
  RESET_CARD,
  SELECT_CARD,
  SELECT_LEADER,
  SET_DECKMAKER_STATUS,
} from './ActionTypes';
import { IFilterAction, setFilter } from './filter';

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

export interface IRemoveCard {
  type: typeof REMOVE_CARD;
  payload: {
    card: CardData;
  };
}
export interface IResetCard {
  type: typeof RESET_CARD;
}
export type IDeckActions =
  | ISetDeckMakerStatus
  | ISelectCard
  | IRemoveCard
  | IResetCard
  | ISelectLeader
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
export const removeCard = (card: CardData): IRemoveCard => ({
  type: REMOVE_CARD,
  payload: { card },
});
// 필요할 듯?
export const resetCard = (): IResetCard => ({
  type: RESET_CARD,
});
export const selectLeader = (
  card: CardData,
): ThunkResult<void, ISelectLeader | IResetCard | IFilterAction> => {
  return (dispatch, getState) => {
    // 현재 리더와 faction이 같지 않은 경우 faction 등록
    const currentLeader = getState().deck.leader;
    const currentFaction = getState().filter.filter.faction;
    if (!currentLeader || currentLeader.faction !== card.faction) {
      dispatch(resetCard());
    }
    if (!currentFaction || currentFaction !== card.faction) {
      dispatch(setFilter('faction', card.faction as FilterType));
    }
    dispatch({
      type: SELECT_LEADER,
      payload: { card },
    });
  };
};

export const removeLeader = (): IRemoveLeader => ({
  type: REMOVE_LEADER,
});
