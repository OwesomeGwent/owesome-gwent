import * as authApi from '../apis/auth';
import { ThunkResult } from '../types/thunk';
import { ISignupUser, IUser } from '../types/user';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  VERIFY_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from './ActionTypes';

export interface ILoginRequest {
  type: typeof LOGIN_REQUEST;
  username: string;
  password: string;
}
export interface ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
  user: IUser;
}
export interface ILoginFailure {
  type: typeof LOGIN_FAILURE;
}
export interface ISignupRequest {
  type: typeof SIGNUP_REQUEST;
  user: ISignupUser;
}
export interface ISignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  username: string;
}
export interface ISignupFailure {
  type: typeof SIGNUP_FAILURE;
  error: string;
}
export interface IVerifyRequest {
  type: typeof VERIFY_REQUEST;
}
export interface IVerifySuccess {
  type: typeof VERIFY_SUCCESS;
  user: IUser;
}
export interface IVerifyFailure {
  type: typeof VERIFY_FAILURE;
}

export interface ILogoutRequest {
  type: typeof LOGOUT_REQUEST;
}
export type IAuthAction =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailure
  | ISignupFailure
  | ISignupRequest
  | ISignupSuccess
  | IVerifyFailure
  | IVerifyRequest
  | IVerifySuccess
  | ILogoutRequest;

export const signup = (user: ISignupUser): ThunkResult<void, IAuthAction> => {
  return async dispatch => {
    dispatch({
      type: SIGNUP_REQUEST,
      user,
    });
    try {
      await authApi.signup(user);
      dispatch({
        type: SIGNUP_SUCCESS,
        username: user.username,
      });
    } catch (err) {
      const { error } = err.response.data;
      dispatch({
        type: SIGNUP_FAILURE,
        error,
      });
    }
  };
};

export const login = (
  username: string,
  password: string,
): ThunkResult<void, IAuthAction> => {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      username,
      password,
    });
    try {
      const {
        data: { user },
      } = await authApi.login(username, password);
      dispatch({
        type: LOGIN_SUCCESS,
        user,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  };
};

export const logout = (): ThunkResult<void, IAuthAction> => {
  return async dispatch => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    await authApi.logout();
  };
};
export const verify = (): ThunkResult<void, IAuthAction> => {
  return async dispatch => {
    dispatch({
      type: VERIFY_REQUEST,
    });
    try {
      const {
        data: { user },
      } = await authApi.verify();
      dispatch({
        type: VERIFY_SUCCESS,
        user,
      });
    } catch (err) {
      dispatch({
        type: VERIFY_FAILURE,
      });
    }
  };
};
