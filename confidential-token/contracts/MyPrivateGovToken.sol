// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/extensions/ConfidentialFungibleTokenVotes.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract MyPrivateGovToken is ConfidentialFungibleTokenVotes {
    constructor()
        ConfidentialFungibleToken("GovCoin", "GVC", "ipfs://govcoin-meta")
        EIP712("GovCoin", "1")
    {}
    
    // Implementation required by HandleAccessManager
    function _validateHandleAllowance(bytes32) internal view override {}
}
