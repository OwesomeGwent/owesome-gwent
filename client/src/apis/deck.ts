import axios from 'axios';
import { IAddDeck } from '../types/user';

const instance = axios.create({
  baseURL: '/api/deck',
  timeout: 3000,
});
interface IFetchCollection {
  search?: string;
  skip?: number;
  limit?: number;
}
export const fetchDecks = () => instance.get('/');
export const addDeck = (deck: IAddDeck) => instance.post('/', { deck });
export const updateDeck = (deck: IAddDeck) => instance.put('/', { deck });
export const fetchCollection = ({
  search = '',
  skip = 0,
  limit = 30,
}: IFetchCollection) => {
  return instance.get(`/collection?q=${search}&skip=${skip}&limit=${limit}`);
};
