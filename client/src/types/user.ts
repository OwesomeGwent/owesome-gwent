import { Deck, User } from '../../../shared/IAuth';

export type ISignupUser = Pick<User, 'username' | 'password'> &
  Pick<Partial<User>, 'email' | 'decks'>;

export type IUser = Pick<User, 'id' | 'username'> &
  Pick<Partial<User>, keyof Partial<User>>;

export type IAddDeck = Pick<Deck, 'name' | 'url' | 'leaderId'>;
export type IDeck = Pick<Deck, 'id' | 'leaderId' | 'name' | 'url'> &
  Partial<Deck>;
