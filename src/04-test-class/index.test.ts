import { random } from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.mock('lodash', () => {
  return { random: jest.fn() };
});

describe('BankAccount', () => {
  const initBalance = 50;
  const moreThanBalance = 60;
  const money = 10;
  let mainAccount: BankAccount;

  beforeEach(() => {
    mainAccount = getBankAccount(initBalance);
  });

  test('should create account with initial balance', () => {
    expect(mainAccount.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => mainAccount.withdraw(moreThanBalance)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const secondAccount = getBankAccount(initBalance);

    expect(() => mainAccount.transfer(moreThanBalance, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => mainAccount.transfer(10, mainAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    mainAccount.deposit(money);

    expect(mainAccount.getBalance()).toBe(initBalance + money);
  });

  test('should withdraw money', () => {
    mainAccount.withdraw(money);

    expect(mainAccount.getBalance()).toBe(initBalance - money);
  });

  test('should transfer money', () => {
    const secondAccount = getBankAccount(initBalance);

    mainAccount.transfer(money, secondAccount);

    expect(mainAccount.getBalance()).toBe(initBalance - money);
    expect(secondAccount.getBalance()).toBe(initBalance + money);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.mocked(random).mockReturnValueOnce(20).mockReturnValueOnce(1);

    const result = await mainAccount.fetchBalance();

    expect(result).toBe(20);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.mocked(random).mockReturnValueOnce(20).mockReturnValueOnce(1);

    await mainAccount.synchronizeBalance();

    expect(mainAccount.getBalance()).toBe(20);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.mocked(random).mockReturnValueOnce(20).mockReturnValueOnce(0);

    await expect(mainAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
