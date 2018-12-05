import axios from 'axios';
import queryString from 'query-string';
import { ICollectionQuery } from '../types/collection';
import { IAddDeck } from '../types/deck';
const instance = axios.create({
  baseURL: '/api/deck',
  timeout: 3000,
});

export const addDeck = (deck: IAddDeck) => instance.post('/', { deck });
export const updateDeck = (deck: IAddDeck) => instance.put('/', { deck });
export const fetchDeck = (deckId: string) => instance.get(`/view/${deckId}`);
export const fetchDecks = () => instance.get('/list');
export const starDeck = (deckId: string) => instance.put('/star', { deckId });
export const fetchCollection = ({
  search,
  skip = 0,
  limit = 30,
}: ICollectionQuery) => {
  const query = {
    ...search,
    skip,
    limit,
  };
  return instance.get(`/collection?${queryString.stringify(query)}`);
};
