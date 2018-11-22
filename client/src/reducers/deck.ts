import produce from 'immer';
import { CardData } from '../../../shared/ICardData';
import {
  REMOVE_LEADER,
  SELECT_LEADER,
  SET_DECKMAKER_STATUS,
} from '../actions/ActionTypes';
import { IDeckActions } from '../actions/deck';
import { DeckMakerStatus } from '../types/deck';

export interface IDeckState {
  readonly deckMakerStatus: DeckMakerStatus;
  readonly leader: CardData | undefined;
  readonly cards: CardData[];
}

const initialState: IDeckState = {
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
      }
      default:
        return;
    }
  });

export default deck;
