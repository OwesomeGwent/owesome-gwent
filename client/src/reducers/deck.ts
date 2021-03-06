import produce from 'immer';
import { CardData } from '../../../shared/ICardData';
import {
  ADD_DECK_FAILURE,
  ADD_DECK_REQUEST,
  ADD_DECK_SUCCESS,
  DELETE_DECK_FAILURE,
  DELETE_DECK_REQUEST,
  DELETE_DECK_SUCCESS,
  FETCH_DECK_FAILURE,
  FETCH_DECK_REQUEST,
  FETCH_DECK_SUCCESS,
  LOGOUT_REQUEST,
  REMOVE_CARD,
  REMOVE_LEADER,
  RESET_CARD,
  RESET_DECK,
  SELECT_CARD,
  SELECT_LEADER,
  SET_CURRENT_DECK,
  SET_DECKMAKER_STATUS,
  STAR_DECK_FAILURE,
  STAR_DECK_REQUEST,
  STAR_DECK_SUCCESS,
  UPDATE_DECK_FAILURE,
  UPDATE_DECK_REQUEST,
  UPDATE_DECK_SUCCESS,
} from '../actions/ActionTypes';
import { IDeckActions } from '../actions/deck';
import { DeckMakerStatus, IDeck } from '../types/deck';

import { IUserAction } from '../actions/user';
import { sortByProvision } from '../helpers/card';
import { Status } from '../types/status';
export interface IDeckState {
  readonly currentDeck: IDeck;
  readonly cards: CardData[];
  readonly deckMakerStatus: DeckMakerStatus;
  readonly leader: CardData | undefined;
  readonly add: {
    status: Status;
    error: string;
  };
  readonly update: {
    deck: IDeck | {};
    status: Status;
    error: string;
  };
  readonly delete: {
    status: Status;
    error: string;
  };
  readonly fetch: {
    deck: IDeck | undefined;
    status: Status;
    error: string;
  };
  readonly star: {
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
    faction: '',
    completed: false,
    star: 0,
    starIds: [],
  },
  add: {
    status: 'INIT',
    error: '',
  },
  update: {
    status: 'INIT',
    deck: {},
    error: '',
  },
  // collection view의 deck
  fetch: {
    deck: undefined,
    status: 'INIT',
    error: '',
  },
  delete: {
    status: 'INIT',
    error: '',
  },
  star: {
    status: 'INIT',
    error: '',
  },
  deckMakerStatus: 'INIT',
  leader: undefined,
  cards: [],
};

const deck = (
  state: IDeckState = initialState,
  action: IDeckActions | IUserAction,
) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_DECKMAKER_STATUS: {
        draft.deckMakerStatus = action.payload.status;
        break;
      }
      case SELECT_LEADER: {
        // 리더 같은 팩션이면 카드 그대로
        if (
          !draft.leader ||
          draft.leader.faction !== action.payload.card.faction
        ) {
          draft.cards = [];
        }
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

      case ADD_DECK_REQUEST: {
        draft.add.status = 'FETCHING';
        break;
      }
      case ADD_DECK_SUCCESS: {
        draft.add.status = 'SUCCESS';
        draft.currentDeck = action.deck;
        break;
      }
      case ADD_DECK_FAILURE: {
        draft.add = {
          status: 'FAILURE',
          error: action.error,
        };
        break;
      }
      case UPDATE_DECK_REQUEST: {
        draft.update.status = 'FETCHING';
        break;
      }
      case UPDATE_DECK_SUCCESS: {
        draft.update.status = 'SUCCESS';
        break;
      }
      case UPDATE_DECK_FAILURE: {
        draft.update.status = 'FAILURE';
        draft.update.error = action.error;
        break;
      }
      case DELETE_DECK_REQUEST: {
        draft.delete.status = 'FETCHING';
        break;
      }
      case DELETE_DECK_SUCCESS: {
        draft.delete.status = 'SUCCESS';
        if (draft.fetch.deck && draft.fetch.deck.id === action.deckId) {
          draft.fetch.deck = undefined;
        }
        break;
      }
      case DELETE_DECK_FAILURE: {
        draft.delete.status = 'FAILURE';
        draft.delete.error = action.error;
        break;
      }
      case FETCH_DECK_REQUEST: {
        draft.fetch.status = 'FETCHING';
        break;
      }
      case FETCH_DECK_SUCCESS: {
        draft.fetch.deck = action.deck;
        draft.fetch.status = 'SUCCESS';
        break;
      }
      case FETCH_DECK_FAILURE: {
        draft.fetch.deck = undefined;
        draft.fetch.status = 'FAILURE';
        draft.fetch.error = action.error;
        break;
      }
      case STAR_DECK_REQUEST: {
        draft.star.status = 'FETCHING';
        break;
      }
      case STAR_DECK_SUCCESS: {
        draft.star.status = 'SUCCESS';
        draft.currentDeck.star = action.star;
        if (draft.fetch.deck && draft.fetch.deck.id === action.deckId) {
          draft.fetch.deck.star = action.star;
        }
        break;
      }
      case STAR_DECK_FAILURE: {
        draft.star.status = 'FAILURE';
        draft.star.error = action.error;
        break;
      }
      case SET_CURRENT_DECK: {
        draft.currentDeck = {
          ...action.deck,
        };
        break;
      }
      case RESET_DECK:
      case LOGOUT_REQUEST: {
        // handle logout
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
