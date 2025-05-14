// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "../src/SmartWallet.sol";
import "../src/EthEscrow.sol";

contract SmartWalletTest is Test {
    SmartWallet wallet;
    EthEscrow escrow;

    address user = address(0x1);
    address other = address(0x2);
    bytes32 uuid = keccak256("user-uuid");

    function setUp() public {
        // Fund user with ETH for testing
        vm.deal(user, 10 ether);

        // Deploy Escrow
        escrow = new EthEscrow(user, other, 1 ether);

        // Deploy SmartWallet linked to escrow
        vm.prank(address(this)); // factory
        wallet = new SmartWallet(uuid, user, address(escrow));
    }

    function testWalletAutoForwardsToEscrow() public {
        // Send ETH to wallet as user
        vm.prank(user);
        (bool sent, ) = address(wallet).call{value: 1 ether}("");
        assertTrue(sent, "Send failed");

        // Escrow should be funded
        assertTrue(escrow.isFunded(), "Escrow not funded");

        // Only user (payer) can release
        vm.prank(user);
        escrow.release();

        assertTrue(escrow.isReleased(), "Escrow not released");
        assertEq(other.balance, 1 ether);
    }

    function testRefundFlow() public {
        vm.prank(user);
        (bool sent, ) = address(wallet).call{value: 1 ether}("");
        assertTrue(sent, "Send failed");

        // Refund instead of release
        vm.prank(user);
        escrow.refund();

        assertTrue(escrow.isRefunded(), "Escrow not refunded");
        assertEq(user.balance, 10 ether); // user got funds back
    }

    function testExecuteCall() public {
        // Dummy call to some target
        address target = address(0x100);

        // Deploy a contract at target that stores data
        vm.etch(target, hex"6080604052348015600f57600080fd5b50600160008190555060fffea264697066735822122033dfab6863f05b23f0e991aaaf77628733c6a2d39b3e3ff0664d158b560f6f5564736f6c63430008140033"); // stores 1 in slot 0

        // executeCall to call target
        vm.prank(user);
        wallet.executeCall(target, hex"");

        // Check no revert
        assertTrue(true);
    }
}
