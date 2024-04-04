import { createApiResponse } from '@/api/testClasses/createApiResponse';
import { MockAxiosApiClient } from '@/api/testClasses/mockRequest';
import { EndpointData } from '@/models/EndpointData';
import { SuiteData } from '@/models/SuiteData';
import { MockCacheProvider } from '@/models/testClasses/MockCacheProvider';
import { TestRomanArabicModel } from '@/pages/problem/romanArabicConvert/__test-helpers__/TestRomanArabicModel';
import { requestResponseData, suite } from '../__test-helpers__/testData';
import { Toast } from '@/ui/toast';

function createModel(
  requestResponseData: { [key: string]: any },
  suites: SuiteData,
  endpointData?: { [key: string]: EndpointData[] }
) {
  const apiClient = new MockAxiosApiClient(requestResponseData);
  const cacheProvider = new MockCacheProvider([suites], endpointData);
  return new TestRomanArabicModel(cacheProvider, apiClient);
}

function setToastContainer(container: HTMLElement) {
  (Toast as any).container = container;
}

describe('RomanArabicModel', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    setToastContainer(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.removeChild(container);
  });

  describe('getEndpoints()', () => {
    it('should fetch endpoints from the API if not cached', async () => {
      const endpointData =
        requestResponseData['GET /api/v1/leetcode/solve/roman-arabic-convert']
          .data;

      const model = createModel(requestResponseData, suite);

      const apiClient = model.APIClient as MockAxiosApiClient;
      const cacheProvider = model.CacheProvider as MockCacheProvider;

      jest.spyOn(apiClient.axiosInstance, 'get');
      jest.spyOn(cacheProvider, 'setEndpoints');

      const result = await model.getEndpoints(suite);

      expect(apiClient.axiosInstance.get).toHaveBeenCalledWith(suite.endpoint);
      expect(cacheProvider.setEndpoints).toHaveBeenCalledWith(
        suite.endpoint,
        endpointData
      );
      expect(result).toEqual(endpointData);
    });

    it('should retrieve endpoints from the cache if available', async () => {
      const endpointData =
        requestResponseData['GET /api/v1/leetcode/solve/roman-arabic-convert']
          .data;

      const model = createModel(requestResponseData, suite, {
        [suite.endpoint]: endpointData,
      });

      const apiClient = model.APIClient as MockAxiosApiClient;
      const cacheProvider = model.CacheProvider as MockCacheProvider;

      jest.spyOn(apiClient.axiosInstance, 'get');
      jest.spyOn(cacheProvider, 'getEndpoints');

      const result = await model.getEndpoints(suite);

      expect(cacheProvider.getEndpoints).toHaveBeenCalledWith(suite.endpoint);
      expect(apiClient.axiosInstance.get).not.toHaveBeenCalled();
      expect(result).toEqual(endpointData);
    });
  });

  describe('onConvert()', () => {
    it('should perform a conversion request with the correct method and URL', async () => {
      const mockUrl = '/api/v1/conversion';
      const mockInput = 'XXV';

      const model = createModel(
        {
          [mockUrl]: createApiResponse('success', 200, {
            /* ...mock conversion data */
            mockInput,
          }),
        },
        suite
      );
      const apiClient = model.APIClient as MockAxiosApiClient;

      jest.spyOn(apiClient.axiosInstance, 'get');

      await model.onConvert('get', mockUrl, {
        value: mockInput,
      } as HTMLInputElement);

      expect(apiClient.axiosInstance.get).toHaveBeenCalledWith(
        mockUrl.replace('{romanOrArabic}', mockInput)
      );
    });
  });

  describe('onFlushCache()', () => {
    it('should perform a cache flush request', async () => {
      const mockUrl = '/api/v1/cache/flush';

      const model = createModel(
        {
          [mockUrl]: createApiResponse('success', 204, null),
        },
        suite
      );
      const apiClient = model.APIClient as MockAxiosApiClient;

      jest.spyOn(apiClient.axiosInstance, 'delete');

      await model.onFlushCache('delete', mockUrl);

      expect(apiClient.axiosInstance.delete).toHaveBeenCalledWith(mockUrl);
    });
  });
});
