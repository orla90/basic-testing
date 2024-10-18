// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: -1, b: 0, action: Action.Subtract, expected: -1 },

  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
  { a: -2, b: -2, action: Action.Multiply, expected: 4 },

  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 9, b: 0, action: Action.Divide, expected: Infinity },
  { a: 9, b: -3, action: Action.Divide, expected: -3 },

  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
];

const invalidTestCases = [
  { a: 2, b: 3, action: 'INVALID_ACTION' },
  { a: 'a', b: 2, action: Action.Divide },
  { a: 1, b: null, action: Action.Multiply },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should implement ${action} operation: ${a} ${action} ${b} = ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });

  invalidTestCases.forEach(({ a, b, action }) => {
    test(`should implement ${action} operation: ${a} ${action} ${b} = null`, () => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    });
  });
});
