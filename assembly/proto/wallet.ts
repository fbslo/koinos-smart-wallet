import { Writer, Reader } from "as-proto";

export namespace wallet {
  export class initialize_arguments {
    static encode(message: initialize_arguments, writer: Writer): void {
      const unique_name_owner = message.owner;
      if (unique_name_owner !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_owner);
      }
    }

    static decode(reader: Reader, length: i32): initialize_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new initialize_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.owner = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    owner: Uint8Array | null;

    constructor(owner: Uint8Array | null = null) {
      this.owner = owner;
    }
  }

  @unmanaged
  export class initialize_result {
    static encode(message: initialize_result, writer: Writer): void {
      if (message.value != false) {
        writer.uint32(8);
        writer.bool(message.value);
      }
    }

    static decode(reader: Reader, length: i32): initialize_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new initialize_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export class call_arguments {
    static encode(message: call_arguments, writer: Writer): void {
      const unique_name_contractId = message.contractId;
      if (unique_name_contractId !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_contractId);
      }

      if (message.entryPoint != 0) {
        writer.uint32(16);
        writer.uint32(message.entryPoint);
      }

      const unique_name_contractArgs = message.contractArgs;
      if (unique_name_contractArgs !== null) {
        writer.uint32(26);
        writer.bytes(unique_name_contractArgs);
      }

      if (message.nonce != 0) {
        writer.uint32(32);
        writer.uint32(message.nonce);
      }

      const unique_name_signature = message.signature;
      if (unique_name_signature !== null) {
        writer.uint32(42);
        writer.bytes(unique_name_signature);
      }
    }

    static decode(reader: Reader, length: i32): call_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contractId = reader.bytes();
            break;

          case 2:
            message.entryPoint = reader.uint32();
            break;

          case 3:
            message.contractArgs = reader.bytes();
            break;

          case 4:
            message.nonce = reader.uint32();
            break;

          case 5:
            message.signature = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contractId: Uint8Array | null;
    entryPoint: u32;
    contractArgs: Uint8Array | null;
    nonce: u32;
    signature: Uint8Array | null;

    constructor(
      contractId: Uint8Array | null = null,
      entryPoint: u32 = 0,
      contractArgs: Uint8Array | null = null,
      nonce: u32 = 0,
      signature: Uint8Array | null = null
    ) {
      this.contractId = contractId;
      this.entryPoint = entryPoint;
      this.contractArgs = contractArgs;
      this.nonce = nonce;
      this.signature = signature;
    }
  }

  @unmanaged
  export class call_result {
    static encode(message: call_result, writer: Writer): void {
      if (message.value != false) {
        writer.uint32(8);
        writer.bool(message.value);
      }
    }

    static decode(reader: Reader, length: i32): call_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }
}
