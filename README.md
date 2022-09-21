# Environment Setup

1. Metamask setup

- Install Metamask browser extension and create a wallet.
- Store the Mnenomic seed phrase somwhere.
- Ensure that Rinkeby testnet is available.
- Ensure you have 2 contract accounts available
- Get test ether from faucets & deposit in both contract accounts

2. Infura node provider setup\

- Go to infura.io
- create a new project
- Select rinkeby
- Store the API link

3. Local development setup

- Get project files
- Go to deploy.js and update mnenomic seedphrase & infura API link
- Go to web3.js and update infura API link
- Run command to install modules (npm install)
- Open terminal and go to Ethereum directory (cd ethereum) and run (node compile.js) then (deploy.js). Store the newly deployed contract address.
- Go to factory.js and update address with newly deployed one
- Run the project using (npm run dev)
