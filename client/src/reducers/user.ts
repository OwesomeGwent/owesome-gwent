import produce from 'immer';
import * as ActionTypes from '../actions/ActionTypes';
import { IDeckActions } from '../actions/deck';
import { IUserAction } from '../actions/user';
import { IDeck } from '../types/deck';
import { Status } from '../types/status';
import { IUser } from '../types/user';
export interface IUserState {
  user: IUser | undefined;
  loggedIn: boolean;
  login: {
    status: Status;
  };
  signup: {
    username: string;
    status: Status;
    error: string;
  };
  verify: {
    status: Status;
  };
  decks: {
    decks: IDeck[];
    status: Status;
    error: string;
  };
}

const initialState: IUserState = {
  user: undefined,
  loggedIn: false,
  login: {
    status: 'INIT',
  },
  signup: {
    username: '',
    status: 'INIT',
    error: '',
  },
  verify: {
    status: 'INIT',
  },
  decks: {
    decks: [],
    status: 'INIT',
    error: '',
  },
};

const reducer = (
  state: IUserState = initialState,
  action: IUserAction | IDeckActions,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.LOGIN_REQUEST: {
        draft.login.status = 'FETCHING';
        break;
      }
      case ActionTypes.LOGIN_SUCCESS:
      case ActionTypes.VERIFY_SUCCESS: {
        draft.login.status = 'SUCCESS';
        draft.verify.status = 'SUCCESS';
        draft.user = action.user;
        draft.loggedIn = true;
        break;
      }
      case ActionTypes.LOGIN_FAILURE:
      case ActionTypes.VERIFY_FAILURE: {
        draft.login.status = 'FAILURE';
        draft.verify.status = 'FAILURE';
        draft.user = undefined;
        draft.loggedIn = false;
        break;
      }
      case ActionTypes.SIGNUP_REQUEST: {
        draft.signup.status = 'FETCHING';
        break;
      }
      case ActionTypes.SIGNUP_SUCCESS: {
        draft.signup = {
          status: 'SUCCESS',
          username: action.username,
          error: '',
        };
        break;
      }
      case ActionTypes.SIGNUP_FAILURE: {
        draft.signup = {
          status: 'FAILURE',
          username: '',
          error: action.error,
        };
        break;
      }
      case ActionTypes.VERIFY_REQUEST: {
        draft.verify.status = 'FETCHING';
        break;
      }
      case ActionTypes.LOGOUT_REQUEST: {
        draft.loggedIn = false;
        draft.user = undefined;
        break;
      }
      case ActionTypes.FETCH_DECKS_REQUEST: {
        draft.decks.status = 'FETCHING';
        break;
      }
      case ActionTypes.FETCH_DECKS_SUCCESS: {
        draft.decks = {
          decks: action.decks,
          status: 'SUCCESS',
          error: '',
        };
        break;
      }
      case ActionTypes.FETCH_DECKS_FAILURE: {
        draft.decks.status = 'FAILURE';
        draft.decks.error = '';
        break;
      }
      // Deck Action
      case ActionTypes.DELETE_DECK_SUCCESS: {
        draft.decks.decks = draft.decks.decks.filter(
          deck => deck.id !== action.deckId,
        );
        break;
      }
    }
  });
};

export default reducer;
