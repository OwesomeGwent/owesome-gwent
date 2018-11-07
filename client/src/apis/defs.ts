import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/defs',
  timeout: 3000,
});

export const fetchDefs = (type: string) => {
  return instance.get(`/${type}`);
};
