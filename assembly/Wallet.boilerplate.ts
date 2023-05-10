import { System, Protobuf, authority } from "@koinos/sdk-as";
import { wallet } from "./proto/wallet";

export class Wallet {
  initialize(args: wallet.initialize_arguments): wallet.initialize_result {
    // const owner = args.owner;

    // YOUR CODE HERE

    const res = new wallet.initialize_result();
    // res.value = ;

    return res;
  }

  call(args: wallet.call_arguments): wallet.call_result {
    // const contractId = args.contractId;
    // const entryPoint = args.entryPoint;
    // const contractArgs = args.contractArgs;
    // const nonce = args.nonce;
    // const signature = args.signature;

    // YOUR CODE HERE

    const res = new wallet.call_result();
    // res.value = ;

    return res;
  }
}
