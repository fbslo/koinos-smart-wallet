# Wallet

This smart contract wallet allows users to interact with contracts by signing messages using their Ethereum keys.

## Build
```sh
# build the debug version
yarn build:debug
# or
yarn exec koinos-sdk-as-cli build-all debug wallet.proto

# build the release version
yarn build:release
# or
yarn exec koinos-sdk-as-cli build-all release wallet.proto
```

## Test
```sh
yarn test
# or
yarn exec koinos-sdk-as-cli run-tests
```
