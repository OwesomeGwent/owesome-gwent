import produce from 'immer';
import { CardData } from '../../../shared/ICardData';
import {
  REMOVE_CARD,
  REMOVE_LEADER,
  RESET_CARD,
  RESET_DECK,
  SELECT_CARD,
  SELECT_LEADER,
  SET_CURRENT_DECK,
  SET_DECKMAKER_STATUS,
} from '../actions/ActionTypes';
import { IDeckActions } from '../actions/deck';
import { DeckMakerStatus } from '../types/deck';

import { sortByProvision } from '../helpers/card';
import { IDeck } from '../types/user';
export interface IDeckState {
  readonly currentDeck: IDeck;
  readonly deckMakerStatus: DeckMakerStatus;
  readonly leader: CardData | undefined;
  readonly cards: CardData[];
}

const initialState: IDeckState = {
  currentDeck: {
    id: '',
    name: '',
    url: '',
    leaderId: '',
  },
  deckMakerStatus: 'INIT',
  leader: undefined,
  cards: [],
};

const deck = (state: IDeckState = initialState, action: IDeckActions) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_DECKMAKER_STATUS: {
        draft.deckMakerStatus = action.payload.status;
        break;
      }
      case SELECT_LEADER: {
        draft.leader = action.payload.card;
        break;
      }
      case REMOVE_LEADER: {
        draft.leader = undefined;
        draft.cards = [];
        break;
      }
      case SELECT_CARD: {
        const { card } = action.payload;
        if (Array.isArray(card)) {
          draft.cards = card;
        } else {
          draft.cards.push(card);
        }
        draft.cards.sort(sortByProvision);
        break;
      }
      case REMOVE_CARD: {
        const removeIdx = draft.cards.findIndex(
          card => card.ingameId === action.payload.cardId,
        );
        draft.cards.splice(removeIdx, 1);
        break;
      }
      case RESET_CARD: {
        draft.cards = [];
        break;
      }
      case SET_CURRENT_DECK: {
        draft.currentDeck = {
          ...action.deck,
        };
        break;
      }
      case RESET_DECK: {
        draft.leader = undefined;
        draft.cards = [];
        draft.currentDeck = initialState.currentDeck;
        break;
      }
      default:
        return;
    }
  });

export default deck;
