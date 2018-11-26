import { FilterField, FilterType, MultiFilterField } from '../types/filter';
import {
  CLEAR_FILTER,
  SET_FILTER,
  SET_MULTI_FILTER,
  SET_SEARCH_FILTER,
} from './ActionTypes';

interface ISetFilter {
  type: typeof SET_FILTER;
  field: FilterField;
  value: FilterType;
}
interface ISetMultiFilter {
  type: typeof SET_MULTI_FILTER;
  field: MultiFilterField;
  value: string[];
}
interface IClearFilter {
  type: typeof CLEAR_FILTER;
}

interface ISetSearchFilter {
  type: typeof SET_SEARCH_FILTER;
  search: string;
}

export type IFilterAction =
  | ISetFilter
  | ISetMultiFilter
  | ISetSearchFilter
  | IClearFilter;

export const setFilter = (
  field: FilterField,
  value: FilterType,
): ISetFilter => {
  return {
    type: SET_FILTER,
    field,
    value,
  };
};
export const setMultiFilter = (
  field: MultiFilterField,
  value: string[],
): IFilterAction => {
  return {
    type: SET_MULTI_FILTER,
    field,
    value,
  };
};
export const setSearchFilter = (search: string): IFilterAction => {
  return {
    type: SET_SEARCH_FILTER,
    search,
  };
};

export const clearFilter = (): IFilterAction => {
  return {
    type: CLEAR_FILTER,
  };
};
