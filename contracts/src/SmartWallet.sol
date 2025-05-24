// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEscrow {
    function deposit() external payable;
    function transfer(address to, uint256 amount, uint256 pinHash) external;
    function getBalance() external view returns (uint256);
}
import {Initializable} from "openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
/**
 * @title SmartWallet
 * @dev A smart wallet contract that interfaces with an escrow system
 * @notice This contract manages deposits, transfers, and emergency controls
 */
contract SmartWallet is Initializable {
    IEscrow public escrow;
    bool public paused;
    bytes32 public pinHash;

    // User details
    string public name;
    string public occupation;
    string public details;

    // Events
    event Paused();
    event Unpaused();
    event DepositReceived(address indexed from, uint256 amount);
    event TransferInitiated(address indexed to, uint256 amount);
    event PinChanged();
    event UserDetailsSet(string name, string occupation, string details);

    // TODO: Add identity component fields
    // bytes32 public uuid;
    // address public sbtContract;

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    modifier onlyWithPin(uint256 _pin) {
        require(keccak256(abi.encodePacked(_pin)) == pinHash, "Invalid PIN");
        _;
    }

    /**
     * @dev Initializer instead of constructor for use with clones
     * @param _escrow Address of the escrow contract
     * @param _pin Initial PIN for the wallet
     * @param _name User's name
     * @param _occupation User's occupation
     * @param _details General user details
     */
    function initialize(address _escrow, uint256 _pin, string memory _name, string memory _occupation, string memory _details) public initializer {
        require(_escrow != address(0), "Invalid escrow address");
        require(_pin != 0, "Invalid PIN");
        escrow = IEscrow(_escrow);
        pinHash = keccak256(abi.encodePacked(_pin));
        name = _name;
        occupation = _occupation;
        details = _details;
        emit UserDetailsSet(_name, _occupation, _details);
    }

    /**
     * @dev Receive function to handle direct ETH deposits
     */
    receive() external payable whenNotPaused {
        emit DepositReceived(msg.sender, msg.value);
        IEscrow(escrow).deposit{value: msg.value}();
    }

    /**
     * @dev Fallback function to handle ETH deposits
     */
    fallback() external payable whenNotPaused {
        emit DepositReceived(msg.sender, msg.value);
        IEscrow(escrow).deposit{value: msg.value}();
    }

    /**
     * @dev Transfer funds to a recipient
     * @param to Recipient address
     * @param amount Amount to transfer
     * @param _pin PIN for authorization
     */
    function transfer(
        address to,
        uint256 amount,
        uint256 _pin
    ) external whenNotPaused onlyWithPin(_pin) {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        emit TransferInitiated(to, amount);
        IEscrow(escrow).transfer(to, amount, _pin);
    }

    /**
     * @dev Get the current balance in the escrow
     * @return Current balance
     */
    function getBalance() external view returns (uint256) {
        return IEscrow(escrow).getBalance();
    }

    /**
     * @dev Pause the contract
     * @param _pin PIN for authorization
     */
    function pause(uint256 _pin) external onlyWithPin(_pin) {
        paused = true;
        emit Paused();
    }

    /**
     * @dev Unpause the contract
     * @param _pin PIN for authorization
     */
    function unpause(uint256 _pin) external onlyWithPin(_pin) {
        paused = false;
        emit Unpaused();
    }

    /**
     * @dev Change the PIN
     * @param oldPin Current PIN
     * @param newPin New PIN
     */
    function changePin(
        uint256 oldPin,
        uint256 newPin
    ) external onlyWithPin(oldPin) {
        require(newPin != 0, "Invalid new PIN");
        pinHash = keccak256(abi.encodePacked(newPin));
        emit PinChanged();
    }
}
