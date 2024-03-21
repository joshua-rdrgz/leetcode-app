import catchAxiosAsync, { CatchAxiosAsyncOptions } from '@/api/catchAxiosAsync';
import { ApiClient } from '@/models/APIClient';
import axios from 'axios';

export class AxiosApiClient implements ApiClient {
  async get(url: string, options: CatchAxiosAsyncOptions = {}) {
    return catchAxiosAsync(async () => await axios.get(url), options);
  }
  async delete(url: string, options: CatchAxiosAsyncOptions = {}) {
    return catchAxiosAsync(async () => await axios.delete(url), options);
  }
}

const request = new AxiosApiClient();

export default request;
export type HTTPMethod = keyof AxiosApiClient;
