import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { type ProblemData } from '../ProblemData';
import { TestProblemModel } from '../tests/TestProblemModel';

describe('ProblemModel', () => {
  const problemModel = new TestProblemModel();

  describe('fetchProblems', () => {
    let mock: MockAdapter;

    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
      mock.restore();
      problemModel.clearData();
    });

    it('should fetch problems and update the data property', async () => {
      const mockData: ProblemData[] = [
        { endpoint: '/1', name: 'Two Sum', description: '...' },
        { endpoint: '/2', name: 'Add Two Numbers', description: '...' },
      ];
      mock.onGet('/api/v1/leetcode/problems').reply(200, { data: mockData });

      await problemModel.fetchProblems();

      expect(problemModel.getData()).toEqual(mockData);
    });

    it('should set data to empty array if errors occur in the request', async () => {
      mock.onGet('/api/v1/leetcode/problems').networkError();

      await problemModel.fetchProblems();

      expect(problemModel.getData()).toEqual([]);
    });

    it('should set data to empty array if the request has no data property', async () => {
      mock.onGet('/api/v1/leetcode/problems').reply(200);

      await problemModel.fetchProblems();

      expect(problemModel.getData()).toEqual([]);
    });
  });
});