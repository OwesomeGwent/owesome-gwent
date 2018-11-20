import produce from 'immer';
import {
  CLEAR_FILTER,
  SET_FILTER,
  SET_MULTI_FILTER,
  SET_SEARCH_FILTER,
} from '../actions/ActionTypes';
import { IFilterAction } from '../actions/filter';
import { IFilter, MultiFilterType } from '../types/filter';

export interface IFilterState {
  filter: IFilter;
  search: string;
}

const initialState: IFilterState = {
  filter: {},
  search: '',
};

const reducer = (state: IFilterState = initialState, action: IFilterAction) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_FILTER: {
        draft.filter[action.field] === action.value
          ? (draft.filter[action.field] = initialState.filter[action.field])
          : (draft.filter[action.field] = action.value);
        break;
      }
      case SET_MULTI_FILTER: {
        (draft.filter[action.field] as MultiFilterType) = action.value;
        break;
      }
      case SET_SEARCH_FILTER: {
        draft.search = action.search;
      }
      case CLEAR_FILTER: {
        draft = initialState;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
