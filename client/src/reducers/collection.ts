import produce from 'immer';
import * as ActionTypes from '../actions/ActionTypes';
import { ICollectionActions } from '../actions/collection';
import { ICollection } from '../types/collection';
import { Status } from '../types/status';
export interface ICollectionState {
  collection: ICollection[];
  status: Status;
  isLast: boolean;
  error: string;
}

const initialState: ICollectionState = {
  collection: [],
  status: 'INIT',
  isLast: false,
  error: '',
};

const reducer = (
  state: ICollectionState = initialState,
  action: ICollectionActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.FETCH_COLLECTION_REQUEST: {
        draft.status = 'FETCHING';
        break;
      }
      case ActionTypes.FETCH_COLLECTION_SUCCESS: {
        draft.status = 'SUCCESS';
        draft.collection = action.isInit
          ? action.collection
          : [...draft.collection, ...action.collection];
        draft.isLast = action.isLast;
        break;
      }
      case ActionTypes.FETCH_COLLECTION_FAILURE: {
        draft.status = 'FAILURE';
        draft.error = action.error;
        break;
      }
      default:
        return draft;
    }
  });

export default reducer;
