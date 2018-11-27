import * as authApi from '../apis/auth';
import { ThunkResult } from '../types/thunk';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
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
}
export interface ILoginFailure {
  type: typeof LOGIN_FAILURE;
}
export interface ISignupRequest {
  type: typeof SIGNUP_REQUEST;
  username: string;
  password: string;
  decks?: string[];
}
export interface ISignupSuccess {
  type: typeof SIGNUP_SUCCESS;
}
export interface ISignupFailure {
  type: typeof SIGNUP_FAILURE;
}
export interface IVerifyRequest {
  type: typeof VERIFY_REQUEST;
}
export interface IVerifySuccess {
  type: typeof VERIFY_SUCCESS;
}
export interface IVerifyFailure {
  type: typeof VERIFY_FAILURE;
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
  | IVerifySuccess;

export const signup = (
  username: string,
  password: string,
  decks?: string[],
): ThunkResult<void, IAuthAction> => {
  return async dispatch => {
    try {
      await authApi.signup(username, password, decks);
    } catch (err) {}
  };
};
