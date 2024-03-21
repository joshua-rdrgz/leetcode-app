import { CatchAxiosAsyncOptions } from '@/api/catchAxiosAsync';

export interface ApiClient {
  get(url: string, options?: CatchAxiosAsyncOptions): Promise<any>;
  delete(url: string, options?: CatchAxiosAsyncOptions): Promise<any>;
}
