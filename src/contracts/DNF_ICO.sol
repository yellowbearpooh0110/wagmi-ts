// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DNF_ICO is Ownable {
    using SafeMath for uint256;

    address public tokenAddress =
        address(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    IERC20Metadata tokenContract = IERC20Metadata(tokenAddress);
    address public fundCollector =
        address(0x982de5B01b906Ed996D18Aa73af70AA1735a89D8);
    mapping(address => uint256) public contributedAmount;

    uint256 public minContribution = 1 * 10**6;
    uint256 public maxContribution = 2000 * 10**6;
    uint256 public totalContribution = 0;
    uint256 public maxCap = 80000 * 10**6;

    bool public isFinalized = false;

    event InitialContribute(address indexed _contributor);
    event Contribute(address indexed _contributor, uint256 _value);
    event Finalize();
    event Resume();
    event TokenUpdate(address indexed _tokenAddress);

    function contribute(uint256 _amount) external {
        require(
            add256(contributedAmount[msg.sender], _amount) <= maxContribution,
            "CONTRIBUTION AMOUNT EXCEEDS MAX__TOTALCONTRIBUTION"
        );
        require(
            add256(contributedAmount[msg.sender], _amount) >= minContribution,
            "MIN_CONTRIBUTION IS NOT FULLFILLED"
        );
        require(
            add256(totalContribution, _amount) <= maxCap,
            "EXCEEDS MAX_CAP"
        );
        require(!isFinalized, "PRESALE IS FINALIZED");
        require(
            tokenContract.allowance(msg.sender, address(this)) >= _amount,
            "Allowance Error"
        );
        tokenContract.transferFrom(msg.sender, address(this), _amount);
        contributedAmount[msg.sender] = add256(
            contributedAmount[msg.sender],
            _amount
        );
        totalContribution = add256(totalContribution, _amount);
        if (add256(totalContribution, minContribution) > maxCap) {
            isFinalized = true;
        }
        if (contributedAmount[msg.sender] == _amount)
            emit InitialContribute(msg.sender);
        emit Contribute(msg.sender, _amount);
    }

    function tokenBalance() external view returns (uint256) {
        return tokenContract.balanceOf(address(this));
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = tokenContract.balanceOf(address(this));
        require(balance > 0);
        tokenContract.transfer(fundCollector, balance);
    }

    function finalizePresale() external onlyOwner {
        isFinalized = true;
        emit Finalize();
    }

    function resumePresale() external onlyOwner {
        isFinalized = false;
        emit Resume();
    }

    function updateTokenAddress(address _tokenAddress) external onlyOwner {
        tokenAddress = _tokenAddress;
        tokenContract = IERC20Metadata(_tokenAddress);
        emit TokenUpdate(_tokenAddress);
    }

    function updateFundCollector(address _fundCollector) external onlyOwner {
        fundCollector = _fundCollector;
    }

    function updateMaxCap(uint256 _maxCap) external onlyOwner {
        require(
            _maxCap >= maxContribution,
            "MAX CAPACITY CANNOT BE LOWER THAN THEN MAX CONTRIBUTION"
        );
        maxCap = _maxCap;
    }

    function updateMinContribution(uint256 _minContribution)
        external
        onlyOwner
    {
        require(
            _minContribution > 0,
            "MIN CONTRIBUTION CANNOT BE LOWER OR EQUAL TO 0"
        );
        require(
            _minContribution < maxContribution,
            "MIN CONTRIBUTION CANNOT BE HIGHER OR EQUAL THAN MAX CONTRIBUTION"
        );
        minContribution = _minContribution;
    }

    function updateMaxContribution(uint256 _maxContribution)
        external
        onlyOwner
    {
        require(
            _maxContribution <= maxCap,
            "MAX CONTRIBUTION CANNOT BE HIGHER THAN THEN MAX CAPACITY"
        );
        require(
            _maxContribution > minContribution,
            "MAX CONTRIBUTION CANNOT BE LOWER OR EQUAL THAN MIN CONTRIBUTION"
        );
        maxContribution = _maxContribution;
    }

    function add256(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "addition overflow");
        return c;
    }
}
