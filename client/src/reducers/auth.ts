import produce from 'immer';
import { User } from '../../../shared/IAuth';
import { Status } from '../types/status';

interface IAuthState {
  user: Partial<User>;
  loggedIn: boolean;
  login: {
    status: Status;
  };
  signup: {
    username: string;
    status: Status;
  };
}

const initialState: IAuthState = {
  user: {},
  loggedIn: false,
};

const reducer = (state: IAuthState, action) => {
  return produce(state, draft => {});
};
