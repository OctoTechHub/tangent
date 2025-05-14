// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "../src/SmartWallet.sol";
import "../src/EthEscrow.sol";
import "forge-std/Test.sol";

contract SmartWalletTest is Test {
    SmartWallet public wallet;
    EthEscrow public escrow;

    address public payer = address(1);
    address public owner = address(2);

    function setUp() public {
        vm.deal(payer, 10 ether);
        escrow = new EthEscrow(address(0)); // initialize with zero to bypass require
        vm.prank(payer);
        wallet = new SmartWallet("uuid123", owner, address(escrow));

        // override escrow payer to wallet address after deployment
        vm.etch(
            address(escrow),
            abi.encodePacked(type(EthEscrow).runtimeCode)
        );
        vm.store(address(escrow), bytes32(uint256(0)), bytes32(uint256(uint160(address(wallet)))));
    }

    function testWalletAutoForwardsToEscrow() public {
        vm.prank(payer);
        (bool sent, ) = address(wallet).call{value: 1 ether}("");
        assertTrue(sent, "Send failed");
        assertEq(address(escrow).balance, 1 ether, "Escrow did not receive funds");
    }
}