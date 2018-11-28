import produce from 'immer';
import * as AuthActions from '../actions/ActionTypes';
import { IAuthAction } from '../actions/auth';
import { Status } from '../types/status';
import { ISignupUser, IUser } from '../types/user';

export interface IAuthState {
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
}

const initialState: IAuthState = {
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
};

const reducer = (state: IAuthState = initialState, action: IAuthAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.LOGIN_REQUEST: {
        draft.login.status = 'FETCHING';
        break;
      }
      case AuthActions.LOGIN_SUCCESS:
      case AuthActions.VERIFY_SUCCESS: {
        draft.login.status = 'SUCCESS';
        draft.verify.status = 'SUCCESS';
        draft.user = action.user;
        draft.loggedIn = true;
        break;
      }
      case AuthActions.LOGIN_FAILURE:
      case AuthActions.VERIFY_FAILURE: {
        draft.login.status = 'FAILURE';
        draft.verify.status = 'FAILURE';
        draft.user = undefined;
        draft.loggedIn = false;
        break;
      }
      case AuthActions.SIGNUP_REQUEST: {
        draft.signup.status = 'FETCHING';
        break;
      }
      case AuthActions.SIGNUP_SUCCESS: {
        draft.signup = {
          status: 'SUCCESS',
          username: action.username,
          error: '',
        };
        break;
      }
      case AuthActions.SIGNUP_FAILURE: {
        draft.signup = {
          status: 'FAILURE',
          username: '',
          error: action.error,
        };
        break;
      }
      case AuthActions.VERIFY_REQUEST: {
        draft.verify.status = 'FETCHING';
        break;
      }
      case AuthActions.LOGOUT_REQUEST: {
        draft.loggedIn = false;
        draft.user = undefined;
        break;
      }
    }
  });
};

export default reducer;
