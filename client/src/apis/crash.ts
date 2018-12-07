import axios from 'axios';

const instance = axios.create({
  baseURL: '/crash-report',
  timeout: 3000,
});

export const connectCR = () => instance.get('/');
export const postCR = (content: string) => instance.post('/', { content });
