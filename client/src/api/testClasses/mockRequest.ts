import catchAxiosAsync, { CatchAxiosAsyncOptions } from '@/api/catchAxiosAsync';
import { ApiClient } from '@/models/APIClient';
import { EndpointData } from '@/models/EndpointData';
import { SuiteData } from '@/models/SuiteData';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export class MockApiClient implements ApiClient {
  private axiosInstance = axios.create();
  private mockAdapter = new MockAdapter(this.axiosInstance);

  constructor(
    private testSuites: SuiteData[],
    private testEndpoints: { [key: string]: { data: EndpointData[] } }
  ) {
    this.setupMockResponses();
  }

  private setupMockResponses() {
    this.mockAdapter.onGet('/suites').reply(200, this.testSuites);

    Object.entries(this.testEndpoints).forEach(([endpoint, endpointData]) => {
      this.mockAdapter.onGet(endpoint).reply(200, endpointData);

      // THIS IS LIKELY INCORRECT, `endpointData`
      // IS BEING USED TO MOCK RESPONSES WHERE
      // IT SHOULD NOT
      endpointData.data.forEach((subEndpoint) => {
        const [method, url] = subEndpoint.endpoint.split(' ');

        if (method === 'GET') {
          this.mockAdapter.onGet(url).reply(200, endpointData);
        } else if (method === 'DELETE') {
          this.mockAdapter.onDelete(url).reply(200, endpointData);
        }
      });
    });
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
