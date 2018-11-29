import axios from 'axios';
import { IAddDeck } from '../types/user';

const instance = axios.create({
  baseURL: '/api/deck',
  timeout: 3000,
});

export const fetchDecks = () => instance.get('/');
export const addDeck = (deck: IAddDeck) => instance.post('/', { deck });
