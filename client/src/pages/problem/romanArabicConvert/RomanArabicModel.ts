import { SuiteData } from '@/models/SuiteData';
import { EndpointData } from '@/models/EndpointData';
import { CacheProvider } from '@/models/CacheProvider';
import { ApiClient } from '@/models/APIClient';
import { HTTPMethod } from '@/api/request';

export class RomanArabicModel {
  protected cacheProvider: CacheProvider;
  protected apiClient: ApiClient;

  constructor(cacheProvider: CacheProvider, apiClient: ApiClient) {
    this.cacheProvider = cacheProvider;
    this.apiClient = apiClient;
  }

  async getEndpoints(suiteData: SuiteData): Promise<EndpointData[]> {
    const accessEndpoint = suiteData.endpoint;

    const cachedEndpoints = this.cacheProvider.getEndpoints(accessEndpoint);
    if (cachedEndpoints) {
      return cachedEndpoints;
    }

    const response = await this.apiClient.get(accessEndpoint, {
      toastSuccessResult: false,
      logSuccessResult: false,
    });
    this.cacheProvider.setEndpoints(accessEndpoint, response.data);
    return response.data;
  }

  async onConvert(method: HTTPMethod, url: string, inputTag: HTMLInputElement) {
    try {
      const response = await this.apiClient[method](
        url.replace('{romanOrArabic}', inputTag.value)
      );
      return response?.data;
    } catch (error) {
      console.error('Conversion error:', error);
      throw error;
    }
  }

  async onFlushCache(method: HTTPMethod, url: string) {
    await this.apiClient[method](url);
    console.log('🗑️ Cache Flushed');
  }
}

export type OnConvertFn = InstanceType<typeof RomanArabicModel>['onConvert'];
export type OnFlushCacheFn = InstanceType<
  typeof RomanArabicModel
>['onFlushCache'];
