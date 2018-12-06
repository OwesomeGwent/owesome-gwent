import produce from 'immer';
import * as UserActions from '../actions/ActionTypes';
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

const reducer = (state: IUserState = initialState, action: IUserAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case UserActions.LOGIN_REQUEST: {
        draft.login.status = 'FETCHING';
        break;
      }
      case UserActions.LOGIN_SUCCESS:
      case UserActions.VERIFY_SUCCESS: {
        draft.login.status = 'SUCCESS';
        draft.verify.status = 'SUCCESS';
        draft.user = action.user;
        draft.loggedIn = true;
        break;
      }
      case UserActions.LOGIN_FAILURE:
      case UserActions.VERIFY_FAILURE: {
        draft.login.status = 'FAILURE';
        draft.verify.status = 'FAILURE';
        draft.user = undefined;
        draft.loggedIn = false;
        break;
      }
      case UserActions.SIGNUP_REQUEST: {
        draft.signup.status = 'FETCHING';
        break;
      }
      case UserActions.SIGNUP_SUCCESS: {
        draft.signup = {
          status: 'SUCCESS',
          username: action.username,
          error: '',
        };
        break;
      }
      case UserActions.SIGNUP_FAILURE: {
        draft.signup = {
          status: 'FAILURE',
          username: '',
          error: action.error,
        };
        break;
      }
      case UserActions.VERIFY_REQUEST: {
        draft.verify.status = 'FETCHING';
        break;
      }
      case UserActions.LOGOUT_REQUEST: {
        draft.loggedIn = false;
        draft.user = undefined;
        break;
      }
      case UserActions.FETCH_DECKS_REQUEST: {
        draft.decks.status = 'FETCHING';
        break;
      }
      case UserActions.FETCH_DECKS_SUCCESS: {
        draft.decks = {
          decks: action.decks,
          status: 'SUCCESS',
          error: '',
        };
        break;
      }
      case UserActions.FETCH_DECKS_FAILURE: {
        draft.decks.status = 'FAILURE';
        draft.decks.error = '';
        break;
      }
    }
  });
};

export default reducer;
