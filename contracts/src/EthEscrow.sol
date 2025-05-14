// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EthEscrow {
    address public payer;
    address public payee;
    uint256 public amount;
    bool public isFunded;
    bool public isReleased;
    bool public isRefunded;

    event Funded(address indexed from, uint256 amount);
    event Released(address indexed to, uint256 amount);
    event Refunded(address indexed to, uint256 amount);

    constructor(address _payer, address _payee, uint256 _amount) {
        require(_payer != address(0), "Invalid payer");
        require(_payee != address(0), "Invalid payee");
        require(_amount > 0, "Amount must be > 0");

        payer = _payer;
        payee = _payee;
        amount = _amount;
    }

    function fund() external payable {
        require(msg.sender == payer, "Only payer can fund");
        require(!isFunded, "Already funded");
        require(msg.value == amount, "Incorrect ETH amount");

        isFunded = true;
        emit Funded(msg.sender, msg.value);
    }

    
    function release() external {
        require(msg.sender == payer, "Only payer can release");
        require(isFunded, "Funds not yet added");
        require(!isReleased && !isRefunded, "Already finalized");

        isReleased = true;

        (bool sent, ) = payable(payee).call{value: amount}("");
        require(sent, "ETH transfer to payee failed");

        emit Released(payee, amount);
    }

    function refund() external {
        require(msg.sender == payer, "Only payer can refund");
        require(isFunded, "Funds not yet added");
        require(!isReleased && !isRefunded, "Already finalized");

        isRefunded = true;

        (bool sent, ) = payable(payer).call{value: amount}("");
        require(sent, "ETH refund to payer failed");

        emit Refunded(payer, amount);
    }

    receive() external payable {
        revert("Use fund() only");
    }
}
