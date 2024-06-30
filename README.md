# Piggy Bank Smart Contract

This Solidity smart contract implements a simple Piggy Bank where funds can be deposited and withdrawn, with access restricted to the contract owner.

## Features

- **Deposit:** Owner can deposit Ether into the Piggy Bank.
- **Withdraw:** Owner can withdraw Ether, ensuring sufficient balance.
- **Get Balance:** Anyone can view the current balance.

## Usage

1. **Deploy Contract:**
   - Deploy the contract with an initial balance using a tool like Hardhat.

2. **Interact with the Contract:**
   - Use methods like `deposit()` to add funds and `withdraw()` to take funds out.
   - Ensure transactions are sent by the owner address.

3. **Testing:**
   - Run tests using Hardhat to verify contract functionality.

## License

This project is licensed under the UNLICENSED license.

## Author

- Milan Gupta
