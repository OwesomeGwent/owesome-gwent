import { Dispatch } from 'react';
import * as DeckApis from '../apis/deck';
import { ICollection, ICollectionQuery } from '../types/collection';
import { ThunkResult } from '../types/thunk';
import {
  FETCH_COLLECTION_FAILURE,
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
} from './ActionTypes';

export interface IFetchCollectionRequest {
  type: typeof FETCH_COLLECTION_REQUEST;
}
export interface IFetchCollectionSuccess {
  type: typeof FETCH_COLLECTION_SUCCESS;
  collection: ICollection[];
  isInit: boolean;
  isLast: boolean;
}
export interface IFetchCollectionFailure {
  type: typeof FETCH_COLLECTION_FAILURE;
  error: string;
}
export type ICollectionActions =
  | IFetchCollectionFailure
  | IFetchCollectionRequest
  | IFetchCollectionSuccess;
export const fetchCollection = ({
  skip = 0,
  limit = 30,
  search = {
    q: '',
    faction: '',
    leaderId: '',
  },
}: ICollectionQuery): ThunkResult<void, ICollectionActions> => {
  return async (dispatch: Dispatch<ICollectionActions>) => {
    dispatch({
      type: FETCH_COLLECTION_REQUEST,
    });
    try {
      const {
        data: { deck },
      } = await DeckApis.fetchCollection({ skip, limit, search });
      dispatch({
        type: FETCH_COLLECTION_SUCCESS,
        collection: deck,
        isInit: skip === 0,
        isLast: deck.length < limit || deck.length === 0,
      });
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: FETCH_COLLECTION_FAILURE,
        error,
      });
    }
  };
};
