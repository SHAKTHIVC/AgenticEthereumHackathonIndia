// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DNAConsent {
    struct DNARecord {
        address owner;
        string ipfsHash;
        string[] tags;
        uint256 price;
        uint256 duration;
        bool isActive;
        bytes32 contentHash;
    }

    mapping(uint => DNARecord) public records;
    mapping(address => bool) public hasUploaded;
    mapping(bytes32 => bool) public usedHashes;
    uint public recordCount = 0;

    event DNAUploaded(uint id, address owner, string ipfsHash);
    event AccessPurchased(uint id, address buyer);

    function uploadDNA(
        string memory _ipfsHash,
        string[] memory _tags,
        uint256 _price,
        uint256 _duration,
        bytes32 _contentHash
    ) public {
        require(!hasUploaded[msg.sender], "You already uploaded DNA");
        require(!usedHashes[_contentHash], "This DNA file is already uploaded");

        records[recordCount] = DNARecord(
            msg.sender,
            _ipfsHash,
            _tags,
            _price,
            _duration,
            true,
            _contentHash
        );

        hasUploaded[msg.sender] = true;
        usedHashes[_contentHash] = true;

        emit DNAUploaded(recordCount, msg.sender, _ipfsHash);
        recordCount++;
    }

    function deactivate(uint _id) public {
        require(records[_id].owner == msg.sender, "Not your record");
        records[_id].isActive = false;
    }

    function getTags(uint _id) public view returns (string[] memory) {
        return records[_id].tags;
    }
}
