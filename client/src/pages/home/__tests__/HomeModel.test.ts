import { SuiteData } from '@/models/SuiteData';
import { TestHomeModel } from '@/pages/home/testClasses/TestHomeModel';

describe('HomeModel', () => {
  const model = new TestHomeModel();

  beforeEach(() => {
    model.clearSuitesData();
  });

  describe('getSuitesData()', () => {
    it('should return data from its internal apiCache', () => {
      const testSuites: SuiteData[] = [
        {
          name: 'Suite 1',
          shortDescription: 'short description 1',
          longDescription: 'long description 1',
          endpoint: '/suite1',
        },
        {
          name: 'Suite 2',
          shortDescription: 'short description 2',
          longDescription: 'long description 2',
          endpoint: '/suite2',
        },
      ];

      model.setSuites(testSuites);
      const result = model.getSuitesData();
      expect(result).toEqual(testSuites);
    });

    it('should return an empty array if no suites are in the cache', () => {
      const result = model.getSuitesData();
      expect(result).toEqual([]);
    });
  });
});
