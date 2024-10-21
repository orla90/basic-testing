// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1500)).toThrowError(
      new InsufficientFundsError(1000),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const srcAccount = getBankAccount(initialBalance);
    const destAccount = getBankAccount(initialBalance);
    expect(() => srcAccount.transfer(1500, destAccount)).toThrowError(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(1500, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(1500);
    expect(account.getBalance()).toBe(2500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(200);
    expect(account.getBalance()).toBe(800);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const srcAccount = getBankAccount(initialBalance);
    const destAccount = getBankAccount(initialBalance);
    srcAccount.transfer(initialBalance, destAccount);
    expect(srcAccount.getBalance()).toBe(initialBalance - initialBalance);
    expect(destAccount.getBalance()).toBe(initialBalance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const fetchBalanceSpy = jest.spyOn(account, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValueOnce(500);
    const balance = await account.fetchBalance();
    expect(balance).toBe(500);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    const fetchBalanceSpy = jest.spyOn(account, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValueOnce(500);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    const fetchBalanceSpy = jest.spyOn(account, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
