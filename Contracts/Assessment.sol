// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Importing console.sol from hardhat for debugging purposes
// import "hardhat/console.sol";

contract Assessment {
    address public owner;
    uint256 public balance;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdraw(address indexed withdrawer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 initBalance) payable {
        owner = msg.sender;
        balance = initBalance;
    }

    function getBalance() external view returns(uint256) {
        return balance;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    error InsufficientBalance(uint256 availableBalance, uint256 requestedAmount);

    function withdraw(uint256 _withdrawAmount) external onlyOwner {
        require(_withdrawAmount > 0, "Withdraw amount must be greater than zero");
        require(balance >= _withdrawAmount, "Insufficient balance");

        uint256 _previousBalance = balance;
        balance -= _withdrawAmount;

        emit Withdraw(msg.sender, _withdrawAmount);
    }
}
