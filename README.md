# Wallet

## Build
```sh
# build the debug version
yarn build:debug
# or
yarn exec koinos-sdk-as-cli build-all debug 0 wallet.proto 

# build the release version
yarn build:release
# or
yarn exec koinos-sdk-as-cli build-all release 0 wallet.proto 
```

## Test
```sh
yarn test
# or
yarn exec koinos-sdk-as-cli run-tests
```