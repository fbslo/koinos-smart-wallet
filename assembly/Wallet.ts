import { chain, System, Base58, Base64, Token, Crypto, claim, Arrays, StringBytes, authority } from "@koinos/sdk-as";
import { wallet } from "./proto/wallet";

export class Wallet {
  /// @dev Ethereum address of the owner
  owner: Uint8Array;
  /// @dev Nonce to prevent replay attacks
  nonce: u32;
  /// @dev Keeps track of initialization status
  isInitialized: bool;

  constructor(){
    this.owner = new Uint8Array(0);
    this.nonce = 0;
    this.isInitialized = false;
  }

  /// @dev Authorization override to prevent contract upgrades after initialization
  // authorize(args: authority.authorize_arguments): authority.authorize_result {
  //   return new authority.authorize_result(!this.isInitialized);
  // }

  /// @dev Sets first contract owner and disables contract upgradeability
  initialize(args: wallet.initialize_arguments): wallet.initialize_result {
    System.require(!this.isInitialized, "already initialized");

    this.owner = args.owner!;
    this.isInitialized = true;

    return new wallet.initialize_result(true);
  }

  /// @dev Make an external call to any other contract
  /// Can be called by anyone with valid signature
  call(args: wallet.call_arguments): wallet.call_result {
    const contractId   = args.contractId!;
    const entryPoint   = args.entryPoint;
    const contractArgs = args.contractArgs!;
    const nonce        = args.nonce;
    const signature    = args.signature!;

    // TODO: convert everyting to lowercase

    System.require(nonce == this.nonce, "Nonce not valid");
    this.nonce += 1;

    const contractIdString = Arrays.toHexString(contractId);

    // Prepare original signed message
    const message       = `koinos`; // `koinos-smart-wallet-call-${contractIdString}-${entryPoint}-${contractArgs}-${nonce}`;
    const signedMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`;

    // Hash recreated message and recover public key from provided signature
    let multihashBytes  = System.hash(Crypto.multicodec.keccak_256, StringBytes.stringToBytes(signedMessage));
    let publicKey       = System.recoverPublicKey(signature, multihashBytes!, chain.dsa.ecdsa_secp256k1, false);

    multihashBytes      = System.hash(Crypto.multicodec.keccak_256, publicKey!.subarray(1));
    let mh              = new Crypto.Multihash();
    mh.deserialize(multihashBytes!);

    System.log(`Owner:  ` + Arrays.toHexString(this.owner));
    System.log(`signer: ` + Arrays.toHexString(mh.digest.subarray(-20)));

    System.require(Arrays.equal(mh.digest.subarray(-20), this.owner), "signer != owner: ethereum address mismatch");

    // // Make external call
    // const callResult = System.call(contractId, entryPoint, contractArgs);
    // System.require(callResult, `callResult != null`);

    return new wallet.call_result(true)
  } 
}
