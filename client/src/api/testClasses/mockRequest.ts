import catchAxiosAsync, { CatchAxiosAsyncOptions } from '@/api/catchAxiosAsync';
import { ApiClient } from '@/models/APIClient';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export class MockAxiosApiClient implements ApiClient {
  public axiosInstance = axios.create();
  public mockAdapter = new MockAdapter(this.axiosInstance);

  constructor(requestResponseData: { [key: string]: any }) {
    for (const [request, response] of Object.entries(requestResponseData)) {
      const [_, url] = request.split(' ');
      this.mockAdapter.onAny(url).reply(response.statusCode, response);
    }
  }

  async get(url: string, options: CatchAxiosAsyncOptions = {}) {
    return catchAxiosAsync(async () => {
      const response = await this.axiosInstance.get(url);
      return response;
    }, options);
  }

  async delete(url: string, options: CatchAxiosAsyncOptions = {}) {
    return catchAxiosAsync(async () => {
      const response = await this.axiosInstance.delete(url);
      return response;
    }, options);
  }
}
