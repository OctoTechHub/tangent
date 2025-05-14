// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEthEscrow {
    function fund() external payable;
}

contract SmartWallet {
    address public owner;
    address public factory;
    bytes32 public uuid;
    address public fallbackTarget;
    address public linkedEscrow;
    bool public paused;

    event Received(address indexed from, uint256 amount);
    event Forwarded(address indexed to, uint256 amount);
    event Executed(address indexed target, bytes data);
    event Paused();
    event Unpaused();
    event SelfDestructed();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == factory, "Not factory");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    constructor(
        bytes32 _uuid,
        address _owner,
        address _linkedEscrow
    ) {
        require(_owner != address(0), "Invalid owner");
        require(_linkedEscrow != address(0), "Invalid escrow");

        uuid = _uuid;
        owner = _owner;
        factory = msg.sender;
        linkedEscrow = _linkedEscrow;
    }

    function setFallbackTarget(address _target) external onlyOwner {
        fallbackTarget = _target;
    }

    function executeCall(address target, bytes calldata data) external onlyOwner whenNotPaused {
        (bool success, ) = target.call(data);
        require(success, "Call failed");
        emit Executed(target, data);
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused();
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused();
    }

    function destroy() external onlyOwner {
        emit SelfDestructed();
        selfdestruct(payable(owner));
    }

    receive() external payable {
        require(!paused, "Paused");
        emit Received(msg.sender, msg.value);

        IEthEscrow(linkedEscrow).fund{value: msg.value}();
        emit Forwarded(linkedEscrow, msg.value);
    }

    fallback() external payable {
        require(!paused, "Paused");

        if (fallbackTarget != address(0)) {
            (bool success, ) = fallbackTarget.call{value: msg.value}(msg.data);
            require(success, "Fallback call failed");
        } else {
            IEthEscrow(linkedEscrow).fund{value: msg.value}();
        }
    }
}
