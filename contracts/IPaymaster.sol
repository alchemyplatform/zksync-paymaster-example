// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./Transaction.sol";

enum ExecutionResult {
    Revert,
    Success
}

bytes4 constant PAYMASTER_VALIDATION_SUCCESS_MAGIC = IPaymaster.validateAndPayForPaymasterTransaction.selector;

interface IPaymaster {
    /// @dev Called by the bootloader to verify that the paymaster agrees to pay for the
    /// fee for the transaction. This transaction should also send the necessary amount of funds onto the bootloader
    /// address.
    /// @param _txHash The hash of the transaction
    /// @param _suggestedSignedHash The hash of the transaction that is signed by an EOA
    /// @param _transaction The transaction itself.
    /// @return magic The value that should be equal to the signature of the validateAndPayForPaymasterTransaction
    /// if the paymaster agrees to pay for the transaction.
    /// @return context The "context" of the transaction: an array of bytes of length at most 1024 bytes, which will be
    /// passed to the `postTransaction` method of the account.
    /// @dev The developer should strive to preserve as many steps as possible both for valid
    /// and invalid transactions as this very method is also used during the gas fee estimation
    /// (without some of the necessary data, e.g. signature).
    function validateAndPayForPaymasterTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable returns (bytes4 magic, bytes memory context);
}