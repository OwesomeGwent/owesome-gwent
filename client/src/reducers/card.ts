import produce from 'immer';
import { CardData, RawCardData } from '../../../shared/ICardData';
import { CardLocaleData, Locale } from '../../../shared/ILocaleData';
import { ICardAction } from '../actions/card';
import * as ActionType from '../actions/ActionTypes';

interface IRawCards {
  readonly cards: RawCardData;
  readonly status: 'SUCCESS' | 'ERROR' | 'INIT' | 'FETCHING';
}
export interface ICardState {
  readonly rawCards: IRawCards;
  readonly cards: CardData[];
  readonly currentCards: CardData[];
  readonly detail: {
    readonly status: 'SUCCESS' | 'ERROR' | 'INIT' | 'FETCHING';
    readonly localeData: { [locale in Locale]?: CardLocaleData };
  };
}

const initialState: ICardState = {
  rawCards: {
    cards: {},
    status: 'INIT',
  },
  cards: [],
  currentCards: [],
  detail: {
    status: 'INIT',
    localeData: {},
  },
};
const reducer = (
  state: ICardState = initialState,
  action: ICardAction,
): ICardState => {
  return produce<ICardState>(state, draft => {
    switch (action.type) {
      case ActionType.FETCH_CARDS_REQUEST: {
        draft.rawCards.status = 'FETCHING';
        break;
      }
      case ActionType.FETCH_CARDS_SUCCESS: {
        draft.rawCards.status = 'SUCCESS';
        draft.rawCards.cards = action.cards;
        break;
      }
      case ActionType.FETCH_CARDS_FAILURE:
        draft.rawCards.status = 'ERROR';
        break;
      case ActionType.FETCH_DETAILS_REQUEST: {
        draft.rawCards.status = 'FETCHING';
        break;
      }
      case ActionType.FETCH_DETAILS_SUCCESS: {
        draft.detail = {
          status: 'SUCCESS',
          localeData: {
            [action.locale]: action.localeData,
          },
        };
        break;
      }
      case ActionType.FETCH_DETAILS_FAILURE: {
        draft.detail.status = 'ERROR';
        break;
      }
      case ActionType.SET_CARDS:
        draft.cards = action.cards;
        break;
      default:
        return;
    }
  });
};

export default reducer;
