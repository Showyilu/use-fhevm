// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/ConfidentialFungibleToken.sol";

contract TokenB is ConfidentialFungibleToken {
    constructor()
        ConfidentialFungibleToken(
            "Token B",
            "TKNB",
            ""
        )
    {}
}
