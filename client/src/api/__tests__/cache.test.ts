import { APICache } from '../cache';
import { SuiteData } from '@/models/SuiteData';
import { EndpointData } from '@/models/EndpointData';

describe('APICache', () => {
  let apiCache: APICache;

  beforeEach(() => {
    apiCache = new APICache();
  });

  describe('Suites', () => {
    it('handles empty suites', () => {
      expect(apiCache.getSuites()).toEqual([]);
    });

    it('gets and sets suites', () => {
      const testSuites: SuiteData[] = [
        {
          name: 'Suite 1',
          shortDescription: 'sd',
          longDescription: 'ld',
          endpoint: 'e',
        },
      ];
      apiCache.setSuites(testSuites);
      expect(apiCache.getSuites()).toEqual(testSuites);
    });

    it('handles suite not found with getSuiteByName', () => {
      expect(apiCache.getSuiteByName('notfound')).toBeUndefined();
    });

    it('gets existing suite with getSuiteByName', () => {
      const testSuites: SuiteData[] = [
        {
          name: 'Suite 1',
          shortDescription: 'test',
          longDescription: 'test',
          endpoint: 'test',
        },
      ];

      apiCache.setSuites(testSuites);
      expect(apiCache.getSuiteByName('Suite 1')).toEqual(testSuites[0]);
    });
  });

  describe('Endpoints', () => {
    it('handles empty endpoints', () => {
      expect(apiCache.getEndpoints('test')).toBeUndefined();
    });

    it('gets and sets endpoints', () => {
      const testEndpoints: EndpointData[] = [
        {
          name: 'Endpoint 1',
          description: 'test',
          endpoint: 'test',
        },
      ];

      apiCache.setEndpoints('test', testEndpoints);
      expect(apiCache.getEndpoints('test')).toEqual(testEndpoints);
    });
  });
});
