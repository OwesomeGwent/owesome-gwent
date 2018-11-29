import produce from 'immer';
import { CardData, CardDataList } from '../../../shared/ICardData';
import {
  CardLocaleDataList,
  CategoryLocaleDataList,
  KeyWordLocaleDataList,
  Locale,
} from '../../../shared/ILocaleData';
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
    readonly localeData: { [locale in Locale]?: CardLocaleDataList };
    readonly localeKeywords: { [locale in Locale]?: KeyWordLocaleDataList };
    readonly localeCategories: { [locale in Locale]?: CategoryLocaleDataList };
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
    localeKeywords: {},
    localeCategories: {},
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
          status: 'SUCCESS',
          localeData: {
            ...draft.detail.localeData,
            [action.locale]: action.localeData,
          },
          localeKeywords: {
            ...draft.detail.localeKeywords,
            [action.locale]: action.localeKeywords,
          },
          localeCategories: {
            ...draft.detail.localeCategories,
            [action.locale]: action.localeCategories,
          },
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
