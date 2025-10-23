// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/extensions/ConfidentialFungibleTokenVotes.sol";
import {FHE, euint64, ebool} from "@fhevm/solidity/lib/FHE.sol";

contract ConfidentialGovernor {
    ConfidentialFungibleTokenVotes public govToken;

    struct Proposal {
        string description;
        euint64 yes;
        euint64 no;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed id, string description);
    event VoteCast(uint256 indexed id, address voter, bool support);
    event ProposalExecuted(uint256 indexed id, bool passed);

    constructor(address _token) {
        govToken = ConfidentialFungibleTokenVotes(_token);
    }

    function propose(string memory desc) external {
        proposals[++proposalCount] = Proposal({
            description: desc,
            yes: FHE.asEuint64(0),
            no: FHE.asEuint64(0),
            executed: false
        });
        emit ProposalCreated(proposalCount, desc);
    }

    function vote(uint256 id, bool support, euint64 encryptedWeight) external {
        require(!proposals[id].executed, "executed");

        if (support) {
            proposals[id].yes = FHE.add(proposals[id].yes, encryptedWeight);
        } else {
            proposals[id].no = FHE.add(proposals[id].no, encryptedWeight);
        }

        emit VoteCast(id, msg.sender, support);
    }

    function execute(uint256 id) external {
        Proposal storage p = proposals[id];
        require(!p.executed, "already done");
        p.executed = true;
        
        // Note: Comparison of encrypted values returns encrypted bool
        // For real execution, this would need gateway decryption to determine if passed
        // ebool encryptedPassed = FHE.gt(p.yes, p.no);
        
        // For demo purposes, we emit without decrypting
        // In production, use gateway callback to get actual result
        emit ProposalExecuted(id, true); // Placeholder
    }

    function getEncryptedResults(uint256 id) external view returns (euint64, euint64) {
        return (proposals[id].yes, proposals[id].no);
    }
}
