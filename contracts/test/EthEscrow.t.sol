// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol"; 
import "../src/EthEscrow.sol";

contract EthEscrowTest is Test {
    EthEscrow escrow;
    address payer = address(1);
    address payee = address(2);
    uint256 amount = 2 ether;

    function setUp() public {
        vm.deal(payer, 2 ether); // Fund payer
        vm.deal(payee, 1 ether); // Optional: seed payee for balance check
        vm.prank(payer);
        escrow = new EthEscrow(payer, payee, amount);
    }

function testFundSuccess() public {
    // Log pre-fund balances
    console.log("Before funding:");
    console.log("Escrow contract balance: %s", address(escrow).balance);
    console.log("Payer balance: %s", payer.balance);

    vm.prank(payer);
    escrow.fund{value: amount}();

    // Log post-fund balances
    console.log("After funding:");
    console.log("Escrow contract balance: %s", address(escrow).balance);
    console.log("Payer balance: %s", payer.balance);

    assertEq(address(escrow).balance, amount);
}

}