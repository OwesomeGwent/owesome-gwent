import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/defs',
  timeout: 3000,
});

export const BASE_IMAGE_PATH =
  'https://res.cloudinary.com/godsenal/image/upload/v1541344313/gwent/card';

export const fetchDefs = (type: string) => {
  return instance.get(`/${type}`);
};
