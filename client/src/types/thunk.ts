import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IRootState } from '../reducers';

// T - thunk안에서 return시 return 타입
// A - action 타입

// ThunkResult - thunk의 패턴을 이용하는 action이 반환하는 타입
// ThunkFunc - 위 반환값을 받을 수 있는 dispatch 타입
export type ThunkResult<T, A> = ThunkAction<
  T,
  IRootState,
  undefined,
  Action<A>
>;
export type ThunkFunc = ThunkDispatch<IRootState, undefined, Action>;
