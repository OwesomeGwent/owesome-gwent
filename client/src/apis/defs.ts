import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/defs',
  timeout: 3000,
});
export const BASE_IMAGE_PATH =
  'https://res.cloudinary.com/godsenal/image/upload/c_scale,h_288,w_144/v1541344512/gwent/card';
export const LEADER_IMAGE_PATH =
  'https://res.cloudinary.com/godsenal/image/upload/c_crop,g_xy_center,h_600,r_0,w_480,x_0,y_0/v1541344420/gwent/card';
export const THUMBNAIL_IMAGE_PATH =
  'https://res.cloudinary.com/godsenal/image/upload/c_crop,g_north,h_208,w_480,x_0,y_100/v1541344420/gwent/card';
export const fetchDefs = (type: string) => {
  return instance.get(`/${type}`);
};
