import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Wallet as ContractClass } from "./Wallet";
import { wallet as ProtoNamespace } from "./proto/wallet";

export function main(): i32 {
  const contractArgs = System.getArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ContractClass();

  switch (contractArgs.entry_point) {
    case 0x470ebe82: {
      const args = Protobuf.decode<ProtoNamespace.initialize_arguments>(
        contractArgs.args,
        ProtoNamespace.initialize_arguments.decode
      );
      const res = c.initialize(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.initialize_result.encode);
      break;
    }

    case 0x7edb360f: {
      const args = Protobuf.decode<ProtoNamespace.call_arguments>(
        contractArgs.args,
        ProtoNamespace.call_arguments.decode
      );
      const res = c.call(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.call_result.encode);
      break;
    }

    default:
      System.exit(1);
      break;
  }

  System.exit(0, retbuf);
  return 0;
}

main();
