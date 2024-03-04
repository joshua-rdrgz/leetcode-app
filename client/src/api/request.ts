import axios from 'axios';
import catchAxiosAsync, { CatchAxiosAsyncOptions } from '@/api/catchAxiosAsync';

const request = {
  get: (url: string, options: CatchAxiosAsyncOptions = {}) =>
    catchAxiosAsync(async () => await axios.get(url), options),
  delete: (url: string, options: CatchAxiosAsyncOptions = {}) =>
    catchAxiosAsync(async () => await axios.delete(url), options),
};

export type RequestObj = typeof request;
export type HTTPMethod = keyof RequestObj;
export default request;
