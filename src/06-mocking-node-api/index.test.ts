// Uncomment the code below and write your tests
import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));


describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const interval = 1000;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);
    expect(intervalSpy).toHaveBeenCalledWith(callback, interval);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'mock-file.txt';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(path.join as jest.Mock).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValueOnce(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'file content';
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(mockContent);
  });
});
