import produce from 'immer';
import { CardData } from '../../../shared/ICardData';
import { SET_DECKMAKER_STATUS } from '../actions/ActionTypes';
import { DeckMakerStatus, IDeckActions } from '../actions/deck';

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
      default:
        return;
    }
  });

export default deck;
