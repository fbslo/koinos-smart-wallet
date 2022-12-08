import { chain, System, Base58, Token, Crypto, claim, Arrays, StringBytes, authority } from "@koinos/sdk-as";
import { wallet } from "./proto/wallet";

export class Wallet {
  owner: Uint8Array;
  nonce: u32;
  isInitialized: bool;

  constructor(){
    this.isInitialized = false;
  }

  authorize(args: authority.authorize_arguments): authority.authorize_result {
    return new authority.authorize_result(!isInitialized);
  }

  initialize(args: wallet.initialize_arguments): wallet.initialize_result {
    this.owner = args.owner!;
    this.isInitialized = true;

    return new wallet.initialize_result(true);
  }

  callContract(args: args.transfer_token): void {
    const contractId = args.contractId!;
    const entryPoint = args.entryPoint!;
    const contractArgs = args.contractArgs!;
    const nonce = args.nonce!;

    System.require(nonce == this.nonce, "Nonce not valid");

    const ownerAddress = Arrays.toHexString(this.owner);
    const message = `koinos-smart-wallet-call-${args.contractId}-${args.entryPoint}-${args.contractArgs}-${args.nonce}`;
    const signedMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`;

    let multihashBytes = System.hash(Crypto.multicodec.keccak_256, StringBytes.stringToBytes(signedMessage));
    const pubKey = System.recoverPublicKey(signature, multihashBytes!, chain.dsa.ecdsa_secp256k1, false);

    multihashBytes = System.hash(Crypto.multicodec.keccak_256, pubKey!.subarray(1));
    let mh = new Crypto.Multihash();
    mh.deserialize(multihashBytes!);

    System.require(Arrays.equal(mh.digest.subarray(-20), ownerAddress), "Owner and signer ethereum address mismatch");

    this.nonce += 1;

    const callResult = System.call(contract_id, entry_point, contract_args);
  }
}
