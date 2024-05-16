// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./IPaymaster.sol";

address constant BOOTLOADER = address(0x8001);

contract Paymaster is IPaymaster {
    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable returns (bytes4 magic, bytes memory context) {
      require(BOOTLOADER == msg.sender);

      context = "";
      magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
      
      uint requiredEth = _transaction.gasLimit * _transaction.maxFeePerGas;

      (bool success, ) = BOOTLOADER.call{ value: requiredEth }("");
      require(success);
    }

    receive() external payable {}
}