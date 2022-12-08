import { Wallet } from '../Wallet';
import { wallet } from '../proto/wallet';

describe('contract', () => {
  it("should return 'hello, NAME!'", () => {
    const c = new Wallet();

    const args = new wallet.hello_arguments('World');
    const res = c.hello(args);

    expect(res.value).toStrictEqual('Hello, World!');
  });
});
