// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WagmiClub is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    Ownable
{
    using Strings for uint256;
    using Counters for Counters.Counter;

    string public baseURI;
    string public baseExtension = ".json";
    Counters.Counter private _tokenIdCounter;

    uint256[999] public ids;
    uint256 private index;

    uint256 public totalSuperNova;
    uint256 public totalNova;
    uint256 public totalAurora;
    uint256 public totalGenesis;

    uint256 public costSuperNova = 0 ether;
    uint256 public costNova = 0 ether;
    uint256 public costAurora = 0 ether;
    uint256 public costGenesis = 0 ether;

    uint256 public maxSupply = 999;
    bool public onlyWhitelisted = true;

    address[] public whitelistSuperNova;
    address[] public whitelistNova;
    address[] public whitelistAurora;
    address[] public whitelistGenesis;

    mapping(address => uint256) public addressMintedBalance;

    constructor() ERC721("Wagmi Club", "WC") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mintSuperNova(uint256 mintAmount) public payable {
        uint256 supply = totalSupply();
        require(supply + mintAmount <= maxSupply, "Exceeds Max Supply");
        require(msg.value >= costSuperNova * mintAmount, "Insufficient Funds");

        setBaseURI(
            "https://gateway.pinata.cloud/ipfs/Qmb4CmubG1m1DWbScWrAoLQaVmcC4wY6BSU2bS6UXq6sgx/"
        );

        if (msg.sender != owner()) {
            if (onlyWhitelisted == true) {
                require(isSuperNova(msg.sender), "User Is Not Whitelisted");
            }
        }
        uint256 tokenId = 0;
        totalSuperNova += mintAmount;
        _safeMint(msg.sender, tokenId + totalSuperNova);
    }

    function mintNova(uint256 mintAmount) public payable {
        uint256 supply = totalSupply();
        require(supply + mintAmount <= maxSupply, "Exceeds Max Supply");
        require(msg.value >= costNova * mintAmount, "Insufficient Funds");

        setBaseURI(
            "https://gateway.pinata.cloud/ipfs/QmZnbPYvzatXfUbMk1XUUA3UqFqkomqBq1BmuELwgPzJTh/"
        );

        if (msg.sender != owner()) {
            if (onlyWhitelisted == true) {
                require(isNova(msg.sender), "User Is Not Whitelisted");
            }
        }
        uint256 tokenId = 9;
        totalNova += mintAmount;
        _safeMint(msg.sender, tokenId + totalNova);
    }

    function mintAurora(uint256 mintAmount) public payable {
        uint256 supply = totalSupply();
        require(supply + mintAmount <= maxSupply, "Exceeds Max Supply");
        require(msg.value >= costAurora * mintAmount, "Insufficient Funds");

        setBaseURI(
            "https://gateway.pinata.cloud/ipfs/QmNc1XfEf6UNfXRxa5hAsNmCsk1UUk2DNQp3CUtcyqDssf/"
        );

        if (msg.sender != owner()) {
            if (onlyWhitelisted == true) {
                require(isAurora(msg.sender), "User Is Not Whitelisted");
            }
        }
        uint256 tokenId = 99;
        totalAurora += mintAmount;
        _safeMint(msg.sender, tokenId + totalAurora);
    }

    function mintGenesis(uint256 mintAmount) public payable {
        uint256 supply = totalSupply();
        require(supply + mintAmount <= maxSupply, "Exceeds Max Supply");
        require(msg.value >= costGenesis * mintAmount, "Insufficient Funds");

        setBaseURI(
            "https://gateway.pinata.cloud/ipfs/QmZFjowfLsEX5bRbRgv9ojvKCgyTjoqRB6Qk9xqV74v8Bi/"
        );

        if (msg.sender != owner()) {
            if (onlyWhitelisted == true) {
                require(isGenesis(msg.sender), "User Is Not Whitelisted");
            }
        }
        uint256 tokenId = 449;
        totalGenesis += mintAmount;
        _safeMint(msg.sender, tokenId + totalGenesis);
    }

    function isSuperNova(address _user) public view returns (bool) {
        for (uint256 i = 0; i < whitelistSuperNova.length; i++) {
            if (whitelistSuperNova[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function isNova(address _user) public view returns (bool) {
        for (uint256 i = 0; i < whitelistNova.length; i++) {
            if (whitelistNova[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function isAurora(address _user) public view returns (bool) {
        for (uint256 i = 0; i < whitelistAurora.length; i++) {
            if (whitelistAurora[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function isGenesis(address _user) public view returns (bool) {
        for (uint256 i = 0; i < whitelistGenesis.length; i++) {
            if (whitelistGenesis[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function setBaseURI(string memory _newBaseURI) private {
        baseURI = _newBaseURI;
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        Strings.toString(tokenId),
                        baseExtension
                    )
                )
                : "";
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function withdraw() external payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function setOnlyWhitelisted(bool _state) public onlyOwner {
        onlyWhitelisted = _state;
    }

    function goSuperNova(address[] calldata _users) public onlyOwner {
        delete whitelistSuperNova;
        whitelistSuperNova = _users;
    }

    function goNova(address[] calldata _users) public onlyOwner {
        delete whitelistNova;
        whitelistNova = _users;
    }

    function goAurora(address[] calldata _users) public onlyOwner {
        delete whitelistAurora;
        whitelistAurora = _users;
    }

    function goGenesis(address[] calldata _users) public onlyOwner {
        delete whitelistGenesis;
        whitelistGenesis = _users;
    }

    function setCostSuperNova(uint256 _newCostSuperNova) public onlyOwner {
        costSuperNova = _newCostSuperNova;
    }

    function setCostNova(uint256 _newCostNova) public onlyOwner {
        costNova = _newCostNova;
    }

    function setCostAurora(uint256 _newCostAurora) public onlyOwner {
        costAurora = _newCostAurora;
    }

    function setCostGenesis(uint256 _newCostGenesis) public onlyOwner {
        costGenesis = _newCostGenesis;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
