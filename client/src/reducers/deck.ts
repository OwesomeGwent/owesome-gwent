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
  UPDATE_DECK_FAILURE,
  UPDATE_DECK_REQUEST,
  UPDATE_DECK_SUCCESS,
} from '../actions/ActionTypes';
import { IDeckActions } from '../actions/deck';
import { DeckMakerStatus } from '../types/deck';

import { sortByProvision } from '../helpers/card';
import { Status } from '../types/status';
import { IDeck } from '../types/user';
export interface IDeckState {
  readonly currentDeck: IDeck;
  readonly cards: CardData[];
  readonly deckMakerStatus: DeckMakerStatus;
  readonly leader: CardData | undefined;
  readonly update: {
    deck: IDeck | {};
    status: Status;
    error: string;
  };
}

const initialState: IDeckState = {
  currentDeck: {
    id: '',
    name: '',
    url: '',
    leaderId: '',
  },
  update: {
    status: 'INIT',
    deck: {},
    error: '',
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
      case UPDATE_DECK_REQUEST: {
        draft.update.status = 'FETCHING';
        break;
      }
      case UPDATE_DECK_SUCCESS: {
        draft.update.status = 'SUCCESS';
        draft.update.deck = action.deck;
        break;
      }
      case UPDATE_DECK_FAILURE: {
        draft.update.status = 'FAILURE';
        draft.update.error = action.error;
        break;
      }
      case SET_CURRENT_DECK: {
        draft.currentDeck = {
          ...action.deck,
        };
        break;
      }
      case RESET_DECK: {
        Object.keys(draft).forEach(key => {
          const assertion = key as keyof IDeckState;
          draft[assertion] = initialState[assertion];
        });
        break;
      }
      default:
        return;
    }
  });

export default deck;
