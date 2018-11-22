import { CardData } from '../../../shared/ICardData';
import { DeckMakerStatus } from '../types/deck';
import {
  REMOVE_CARD,
  REMOVE_LEADER,
  SELECT_CARD,
  SELECT_LEADER,
  SET_DECKMAKER_STATUS,
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
  payload: {
    card: CardData;
  };
}

export interface ISelectCard {
  type: typeof SELECT_CARD;
  payload: {
    card: CardData;
  };
}

export interface IRemoveCard {
  type: typeof REMOVE_CARD;
  payload: {
    card: CardData;
  };
}

export type IDeckActions =
  | ISetDeckMakerStatus
  | ISelectCard
  | IRemoveCard
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

export const selectCard = (card: CardData): ISelectCard => ({
  type: SELECT_CARD,
  payload: { card },
});

export const removeCard = (card: CardData): IRemoveCard => ({
  type: REMOVE_CARD,
  payload: { card },
});

export const selectLeader = (card: CardData): ISelectLeader => ({
  type: SELECT_LEADER,
  payload: { card },
});

export const removeLeader = (card: CardData): IRemoveLeader => ({
  type: REMOVE_LEADER,
  payload: { card },
});
