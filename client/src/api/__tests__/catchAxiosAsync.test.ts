import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import catchAxiosAsync from '../catchAxiosAsync';

describe('catchAxiosAsync.ts', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
    jest.clearAllMocks();
  });

  it('should return response data on success', async () => {
    const expectedData = { test: 'data' };
    mock.onGet('https://api.example.com').reply(200, expectedData);

    jest.spyOn(console, 'log');

    const result = await catchAxiosAsync(async () =>
      axios.get('https://api.example.com')
    );

    expect(result).toEqual(expectedData);

    const successLogs = (console.log as jest.Mock).mock.calls[0];
    expect(successLogs).toBeDefined();
    expect(successLogs).toContainEqual(expectedData);
  });

  it('should log the correct error message on failure', async () => {
    const errorMessage = 'Network Error';
    mock.onGet('https://api.example.com').networkError();

    jest.spyOn(console, 'log');

    await catchAxiosAsync(async () => axios.get('https://api.example.com'));

    const errorLogs = (console.log as jest.Mock).mock.calls[0];

    expect(errorLogs).toBeDefined();
    expect(errorLogs).toContain(errorMessage);
  });

  it('should log details of unknown errors', async () => {
    const errorMessage = 'Some non-Axios error';
    const error = new Error(errorMessage);

    jest.spyOn(console, 'log');

    await catchAxiosAsync(async () => {
      throw error;
    });

    const errorLogs = (console.log as jest.Mock).mock.calls[0];

    expect(errorLogs).toBeDefined();
    expect(errorLogs).toContain(error);
  });
});
