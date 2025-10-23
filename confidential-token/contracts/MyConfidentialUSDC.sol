// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/extensions/ConfidentialFungibleTokenERC20Wrapper.sol";

contract MyConfidentialUSDC is ConfidentialFungibleTokenERC20Wrapper {
    constructor(address underlying_)
        ConfidentialFungibleToken("Confidential USDC", "cUSDC", "")
        ConfidentialFungibleTokenERC20Wrapper(IERC20(underlying_))
    {}
}
