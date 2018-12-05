import { Deck } from '../../../shared/IDeck';

export type ICollection = Deck;

export type IOrderQuery = 'star' | ''; // default: latest
export interface ISearchQuery {
  q?: string;
  faction?: string;
  leaderId?: string;
  order?: IOrderQuery;
  [key: string]: any;
}
export interface ICollectionQuery {
  search?: ISearchQuery;
  skip?: number;
  limit?: number;
}
