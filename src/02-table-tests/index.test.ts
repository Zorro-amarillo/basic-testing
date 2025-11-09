import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 1, b: 4, action: 'some action', expected: null },
  { a: 'string', b: 6, action: Action.Add, expected: null },
  { a: 7, b: true, action: Action.Divide, expected: null },
  { a: null, b: 9, action: Action.Multiply, expected: null },
  { a: 7, b: undefined, action: Action.Exponentiate, expected: null },
  { a: { key: '1' }, b: 3, action: Action.Subtract, expected: null },
  { a: 5, b: ['1', 2], action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a, $b, $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
