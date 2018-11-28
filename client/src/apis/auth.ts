import axios from 'axios';
import { ISignupUser, IUser } from '../types/user';

const instance = axios.create({
  baseURL: '/api/auth',
  timeout: 3000,
});

export const signup = (user: ISignupUser) => {
  return instance.post('/signup', user);
};

export const login = (username: string, password: string) => {
  return instance.post('/login', { username, password });
};

export const verify = () => {
  return instance.get('/verify');
};
