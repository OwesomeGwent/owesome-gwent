import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/defs',
  timeout: 3000,
});
export const BASE_IMAGE_PATH =
  'https://res.cloudinary.com/godsenal/image/upload/c_scale,h_288,w_144/v1541344512/gwent/card';

export const fetchDefs = (type: string) => {
  return instance.get(`/${type}`);
};
