// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Escrow.sol";
import "./SmartWallet.sol";

contract Factory {
    using Clones for address;

    address public immutable escrowImplementation;
    address public immutable walletImplementation;

    struct WalletInfo {
        address escrow;
        address wallet;
    }

    // Mapping from user to their deployed wallets
    mapping(address => WalletInfo[]) public userWallets;
    // Arrays to track all deployed escrows and wallets
    address[] public allEscrows;
    address[] public allWallets;

    event WalletDeployed(address indexed user, address escrow, address wallet);

    constructor(address _escrowImplementation, address _walletImplementation) {
        require(_escrowImplementation != address(0), "Invalid escrow implementation");
        require(_walletImplementation != address(0), "Invalid wallet implementation");
        escrowImplementation = _escrowImplementation;
        walletImplementation = _walletImplementation;
    }

    function deployWallet(uint256 escrowPin, uint256 walletPin,string memory _name, string memory _occupation, string memory _details) external returns (address escrowAddr, address walletAddr) {
        // Clone Escrow
        address escrow = Clones.clone(escrowImplementation);
        Escrow(escrow).initialize(escrowPin);
        // Clone SmartWallet
        address wallet = Clones.clone(walletImplementation);
        SmartWallet(payable(wallet)).initialize(escrow, walletPin, _name, _occupation, _details);
        // Track deployments
        userWallets[msg.sender].push(WalletInfo(escrow, wallet));
        allEscrows.push(escrow);
        allWallets.push(wallet);
        emit WalletDeployed(msg.sender, escrow, wallet);
        return (escrow, wallet);
    }

    function getUserWallets(address user) external view returns (WalletInfo[] memory) {
        return userWallets[user];
    }

    function getAllEscrows() external view returns (address[] memory) {
        return allEscrows;
    }

    function getAllWallets() external view returns (address[] memory) {
        return allWallets;
    }
}
