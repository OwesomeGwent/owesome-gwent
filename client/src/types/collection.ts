import { Deck } from '../../../shared/IDeck';

export type ICollection = Deck;

export interface ISearchQuery {
  q?: string;
  faction?: string;
  leaderId?: string;
}
export interface ICollectionQuery {
  search?: ISearchQuery;
  skip?: number;
  limit?: number;
}
