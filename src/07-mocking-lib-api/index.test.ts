// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const path = '/mock-path';

  test('should create instance with provided base url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    axiosGetSpy.mockResolvedValue({ data: 'mock data' });

    await throttledGetDataFromApi(path);
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValue({ data: 'mock data' });

    await throttledGetDataFromApi(path);
    expect(axiosGetSpy).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValue({ data: 'mock data' });

    const result = await throttledGetDataFromApi(path);
    expect(result).toBe('mock data');
  });
});
