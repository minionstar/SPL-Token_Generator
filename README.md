# Instructions

1: Install node modules by running 'yarn' on termial.
node version : 18.19.0

2: Place wallet private key to be used for deployment inside .env.devnet, .env.mainnet files.
note: The private keys should be from Solana, not EVM

devnet faucet link: <https://faucet.solana.com/>

3: Inside package.json, defined two scripts for deploying on devent and mainnet.
    npm run deploy-dev : deploy token on devnet
    npm run deploy-main : deploy token on mainnet

Run 'npm run deploy-dev' or 'yarn deploy-dev' on terminal to deploy on devnet.

4: Input required information for deployment.
Simly press Enter to proceed with default values.
