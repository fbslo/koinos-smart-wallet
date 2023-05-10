import { chain, System, MockVM, Base58, Base64, Token, Crypto, claim, Arrays, StringBytes, authority } from "@koinos/sdk-as";
import { Protobuf } from "as-proto";
import { token, error } from "@koinos/proto-as";

import { Wallet } from '../Wallet';
import { wallet } from '../proto/wallet';

const CONTRACT_ID = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
const TOKEN_ID = Base58.decode("1MbsVfNw6yzQqA8499d8KQj8qdLyRs8CzW");
const RECEIVER = Base58.decode("1No51W4kkkm8RLSzHJmmdRjA7rx1GF1QTT");

const OWNER = "0x0E61A8fb14f6AC999646212D30b2192cd02080Dd".toLowerCase();

describe('wallet', () => {
  beforeEach(() => {
    MockVM.reset();
    MockVM.setContractId(CONTRACT_ID);
    MockVM.setCaller(new chain.caller_data(null, chain.privilege.user_mode));
  });

  it("should deploy and initialize wallet", () => {
    const c = new Wallet();
    const args = new wallet.initialize_arguments(Arrays.fromHexString(OWNER));
    const init = c.initialize(args);

    expect(init.value).toStrictEqual(true);
    expect(Arrays.toHexString(c.owner)).toStrictEqual(OWNER);
    expect(c.isInitialized).toStrictEqual(true);
    expect(c.nonce).toStrictEqual(0);
  });

  it("should revert on re-initialization", () => {
    expect(() => {
      const c = new Wallet();
      const args = new wallet.initialize_arguments(Arrays.fromHexString(OWNER));

      c.initialize(args);
      c.initialize(args);
    }).toThrow();
    expect(MockVM.getErrorMessage()).toStrictEqual("already initialized");
  });

  it("should call another contract", () => {
    // Create a token, mint 1000 tokens to wallet contract, send them to receiver address
    const tkn = new Token(TOKEN_ID);
    const m = tkn.mint(CONTRACT_ID, 1000);

    const c = new Wallet();
    const initArgs = new wallet.initialize_arguments(Arrays.fromHexString(OWNER));
    const i = c.initialize(initArgs);

    const from = CONTRACT_ID;
    const to = RECEIVER;
    const amount = 500;
    const args = new token.transfer_arguments(from, to, amount);

    // Prepare transaction
    const contractId = CONTRACT_ID;
    const entryPoint = 0x27f576ca; // Transfer
    const contractArgs = Protobuf.encode(args, token.transfer_arguments.encode); // Already protobuf encoded, in Uint8Array
    const nonce = 0;

    const contractIdString = Arrays.toHexString(contractId);

    const signature = `MjAzODhlYTA0MDE0M2JiZDU0MjM3YjEzYmI0MzMwYjBkY2JjZTNiN2Q2ZDU4YTI5MDVjNjJjYTQ2OTYyY2Y2NzU3NmZiNmYwZGY1YTQ4MGEyMTQxZTFlNzhmOTA2Mzk0YjI1ZjhmZTM1MjQ4M2FlNjRjODgwNjg4Mjk1Nzk0MmUxMQ==`;
    const signature2 = `388ea040143bbd54237b13bb4330b0dcbce3b7d6d58a2905c62ca46962cf67576fb6f0df5a480a2141e1e78f906394b25f8fe352483ae64c8806882957942e111c`;
    const s = StringBytes.stringToBytes(signature2);
    c.call(new wallet.call_arguments(contractId, entryPoint, contractArgs, nonce, s));
  });
});