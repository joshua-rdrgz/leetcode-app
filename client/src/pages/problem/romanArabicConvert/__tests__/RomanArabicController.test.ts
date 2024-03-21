import { APICache } from '@/api/cache';
import { createApiResponse } from '@/api/testClasses/createApiResponse';
import { MockAxiosApiClient } from '@/api/testClasses/mockRequest';
import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { SuiteData } from '@/models/SuiteData';
import { RomanArabicController } from '../RomanArabicController';
import { RomanArabicModel } from '../RomanArabicModel';
import { RomanArabicView } from '../RomanArabicView';
import { findEndpointData } from '../__test-helpers__/findEndpointData';

const suite: SuiteData = {
  name: '...',
  shortDescription: '...',
  longDescription: '...',
  endpoint: '/api/v1/leetcode/solve/roman-arabic-convert',
};

const requestResponseData: { [key: string]: any } = {
  'GET /api/v1/leetcode/solve/roman-arabic-convert': createApiResponse(
    'success',
    200,
    [
      {
        name: 'Roman Numeral Conversion Endpoint',
        description: 'Converts between Roman and Arabic numerals',
        endpoint:
          'GET /api/v1/leetcode/solve/roman-arabic-convert/{romanOrArabic}',
      },
      {
        name: 'Flush Cache Endpoint',
        description: 'Flushes the cache',
        endpoint: 'DELETE /api/v1/leetcode/solve/roman-arabic-convert/cache',
      },
    ]
  ),
};

describe('RomanArabicController', () => {
  let controller: RomanArabicController;
  let model: RomanArabicModel;
  let view: RomanArabicView;
  let apiCache: APICache;
  let mockApiClient: MockAxiosApiClient;

  beforeEach(() => {
    apiCache = new APICache();
    mockApiClient = new MockAxiosApiClient(requestResponseData);
    model = new RomanArabicModel(apiCache, mockApiClient);
    view = new RomanArabicView();

    TestBaseView.setupTestDOM();

    jest.spyOn(view, 'render');

    controller = new RomanArabicController(model, view);
  });

  afterEach(() => {
    TestBaseView.teardownTestDOM();
  });

  describe('initialize()', () => {
    it('should fetch endpoints, then render the view with the endpoints and model methods', async () => {
      const endpointData = findEndpointData(
        requestResponseData,
        suite.endpoint
      );

      await controller.initialize(suite);

      expect(view.render).toHaveBeenCalledWith(
        endpointData,
        expect.any(Function),
        expect.any(Function)
      );
    });
  });
});
