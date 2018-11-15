import produce from 'immer';
import { CLEAR_FILTER, SET_FILTER } from '../actions/ActionTypes';
import { IFilterAction } from '../actions/filter';
import { FilterField, FilterType } from '../types/filter';

type IFilter = Partial<Record<FilterField, FilterType>>;

export interface IFilterState {
  filter: IFilter;
}

const initialState: IFilterState = {
  filter: {},
};

const reducer = (state: IFilterState = initialState, action: IFilterAction) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_FILTER: {
        draft.filter[action.field] = action.value;
        break;
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
