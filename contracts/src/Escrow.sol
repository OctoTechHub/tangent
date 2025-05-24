// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Initializable} from "openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
contract Escrow  is Initializable {
    uint256 public pin;
    bool public paused;
    uint256 public constant MAX_TRANSFER_AMOUNT = 100 ether;
    uint256 public constant COOLDOWN_PERIOD = 1 days;
    uint256 public lastTransferTimestamp;
    
    event Transfer(address indexed to, uint256 amount);
    event Paused();
    event Unpaused();
    event EmergencyWithdraw(uint256 amount);
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    modifier cooldownCheck() {
        require(block.timestamp >= lastTransferTimestamp + COOLDOWN_PERIOD, "Cooldown period not elapsed");
        _;
    }
    
    // Remove the constructor and add initializer
    function initialize(uint256 _pin) public initializer {
        require(_pin != 0, "Invalid PIN");
        pin = _pin;
    }
    
    function deposit() external payable whenNotPaused {
        require(msg.value > 0, "Must send ETH");
    }
    
    function transfer(address to, uint256 amount, uint256 _pin) external whenNotPaused cooldownCheck {
        require(_pin == pin, "Invalid PIN");
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= MAX_TRANSFER_AMOUNT, "Amount exceeds maximum");
        require(amount <= address(this).balance, "Insufficient balance");
        
        lastTransferTimestamp = block.timestamp;
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Transfer(to, amount);
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function pause(uint256 _pin) external {
        require(_pin == pin, "Invalid PIN");
        paused = true;
        emit Paused();
    }
    
    function unpause(uint256 _pin) external {
        require(_pin == pin, "Invalid PIN");
        paused = false;
        emit Unpaused();
    }
    
    function emergencyWithdraw(uint256 _pin) external {
        require(_pin == pin, "Invalid PIN");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit EmergencyWithdraw(balance);
    }
    
    function getTimeUntilNextTransfer() external view returns (uint256) {
        if (block.timestamp >= lastTransferTimestamp + COOLDOWN_PERIOD) {
            return 0;
        }
        return (lastTransferTimestamp + COOLDOWN_PERIOD) - block.timestamp;
    }
}