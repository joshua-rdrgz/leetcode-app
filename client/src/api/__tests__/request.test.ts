import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from '../request';
import catchAxiosAsync from '../catchAxiosAsync';

jest.mock('../catchAxiosAsync'); // Mock catchAxiosAsync behavior

describe('request.ts', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('get', () => {
    it('should call catchAxiosAsync with the correct arguments', async () => {
      const url = 'https://api.example.com';
      const mockedResponse = { data: 'test data' };

      mock.onGet(url).reply(200, mockedResponse);

      await request.get(url);

      expect(catchAxiosAsync).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
