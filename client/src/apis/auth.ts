import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: '/api/auth',
  timeout: 3000,
});

export const signup = async (
  username: string,
  password: string,
  decks?: string[],
) => {
  try {
    const result = await instance.post('/signup', {
      username,
      password,
      decks,
    });
  } catch (err) {}
};

export const login = (username: string, password: string) => {
  return instance.post('/login', { username, password });
};

export const verify = () => {
  return instance.get('/verify');
};
