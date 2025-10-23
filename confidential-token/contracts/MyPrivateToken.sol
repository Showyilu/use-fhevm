// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/confidential-contracts/token/ConfidentialFungibleToken.sol";

contract MyPrivateToken is ConfidentialFungibleToken {
    constructor()
        ConfidentialFungibleToken(
            "PrivateCoin",
            "PRV",
            "ipfs://example-token-metadata"
        )
    {}
}
