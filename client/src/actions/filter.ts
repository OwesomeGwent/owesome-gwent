import { FilterField, FilterType } from '../types/filter';
import { CLEAR_FILTER, SET_FILTER } from './ActionTypes';

interface ISetFilter {
  type: typeof SET_FILTER;
  field: FilterField;
  value: FilterType;
}
interface IClearFilter {
  type: typeof CLEAR_FILTER;
}

export type IFilterAction = ISetFilter | IClearFilter;

export const setFilter = (
  field: FilterField,
  value: FilterType,
): IFilterAction => {
  return {
    type: SET_FILTER,
    field,
    value,
  };
};
export const clearFilter = (): IFilterAction => {
  return {
    type: CLEAR_FILTER,
  };
};
