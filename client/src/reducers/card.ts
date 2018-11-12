import produce from 'immer';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { CardLocaleData, Locale } from '../../../shared/ILocaleData';
import * as ActionType from '../actions/ActionTypes';
import { ICardAction } from '../actions/card';

interface IRawCards {
  readonly cards: CardDataList;
  readonly status: 'SUCCESS' | 'ERROR' | 'INIT' | 'FETCHING';
}
interface ICards {
  readonly leader: CardData[];
  readonly normal: CardData[];
}
export interface ICardState {
  readonly rawCards: IRawCards;
  readonly cards: ICards;
  readonly currentCards: CardData[];
  readonly detail: {
    readonly status: 'SUCCESS' | 'ERROR' | 'INIT' | 'FETCHING';
    readonly localeData: { [locale in Locale]?: CardLocaleData };
  };
}

const initialState: ICardState = {
  cards: {
    leader: [],
    normal: [],
  },
  currentCards: [],
  detail: {
    localeData: {},
    status: 'INIT',
  },
  rawCards: {
    cards: {
      leader: {},
      normal: {},
    },
    status: 'INIT',
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
          localeData: {
            [action.locale]: action.localeData,
          },
          status: 'SUCCESS',
        };
        break;
      }
      case ActionType.FETCH_DETAILS_FAILURE: {
        draft.detail.status = 'ERROR';
        break;
      }
      case ActionType.SET_CARDS:
        draft.cards = {
          leader: action.leader,
          normal: action.normal,
        };
        break;
      default:
        return;
    }
  });
};

export default reducer;
