import axios from 'axios';
import catchAxiosAsync from '@/api/catchAxiosAsync';

const request = {
  get: (url: string) => catchAxiosAsync(async () => await axios.get(url)),
  delete: (url: string) => catchAxiosAsync(async () => await axios.delete(url)),
};

export type RequestObj = typeof request;
export type HTTPMethod = keyof RequestObj;
export default request;
