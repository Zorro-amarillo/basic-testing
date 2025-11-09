import { simpleCalculator, Action } from './index';

const { Add, Subtract, Divide, Multiply, Exponentiate } = Action;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 5, action: Subtract })).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Multiply })).toBe(30);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 2, action: Divide })).toBe(50);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Exponentiate })).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 4, action: 'some action' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'string', b: 6, action: Add })).toBeNull();
    expect(simpleCalculator({ a: 7, b: true, action: Divide })).toBeNull();
    expect(simpleCalculator({ a: null, b: 9, action: Multiply })).toBeNull();
    expect(
      simpleCalculator({ a: 7, b: undefined, action: Exponentiate }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: { key: '1' }, b: 3, action: Subtract }),
    ).toBeNull();
    expect(simpleCalculator({ a: 5, b: ['1', 2], action: Add })).toBeNull();
  });
});
