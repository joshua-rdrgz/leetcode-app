import { MockAxiosApiClient } from '@/api/testClasses/mockRequest';
import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { MockCacheProvider } from '@/models/testClasses/MockCacheProvider';
import { RomanArabicController } from '../RomanArabicController';
import { RomanArabicModel } from '../RomanArabicModel';
import { RomanArabicView } from '../RomanArabicView';
import { findEndpointData } from '../__test-helpers__/findEndpointData';
import { requestResponseData, suite } from '../__test-helpers__/testData';

describe('RomanArabicController', () => {
  let endpointData: any;
  let mockCacheProvider: MockCacheProvider;
  let mockApiClient: MockAxiosApiClient;
  let model: RomanArabicModel;
  let view: RomanArabicView;
  let controller: RomanArabicController;

  const cacheSetups = [
    { description: 'empty cache', data: {} },
    {
      description: 'pre-filled cache',
      data: {
        [suite.endpoint]: findEndpointData(requestResponseData, suite.endpoint),
      },
    },
  ];

  describe.each(cacheSetups)('$description', ({ description, data }) => {
    beforeEach(() => {
      if (description === 'empty cache') {
        data = {}; // clear data between each empty cache test
      }

      endpointData = findEndpointData(requestResponseData, suite.endpoint);
      mockCacheProvider = new MockCacheProvider([suite], data);
      mockApiClient = new MockAxiosApiClient(requestResponseData);
      model = new RomanArabicModel(mockCacheProvider, mockApiClient);
      view = new RomanArabicView();

      TestBaseView.setupTestDOM();

      jest.spyOn(view, 'render');
      jest.spyOn(mockApiClient, 'get');

      controller = new RomanArabicController(model, view);
    });

    afterEach(() => {
      TestBaseView.teardownTestDOM();
    });

    describe('initialize()', () => {
      const emptyCacheIt = description === 'empty cache' ? it : it.skip;
      const prefilledCacheIt =
        description === 'pre-filled cache' ? it : it.skip;

      emptyCacheIt(
        'should fetch endpoints from the API and store in cache when the cache is empty',
        async () => {
          await controller.initialize(suite);
          expect(mockApiClient.get).toHaveBeenCalled();
        }
      );

      prefilledCacheIt(
        'should retrieve endpoints from cache when the cache is populated',
        async () => {
          await controller.initialize(suite);
          expect(mockApiClient.get).not.toHaveBeenCalled();
        }
      );

      it('should fetch endpoints, then render the view with the endpoints and model methods', async () => {
        await controller.initialize(suite);

        expect(view.render).toHaveBeenCalledWith(
          endpointData,
          expect.any(Function),
          expect.any(Function)
        );
      });
    });
  });
});
