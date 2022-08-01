import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { toast } from 'react-toastify';
import Web3 from 'web3';

import { abi as DNFAbi } from 'abis/DNF_ICO.json';
import { abi as TokenAbi } from 'abis/IERC20Metadata.json';

import { contractAddress, networkId } from 'config';
import { injectedConnector } from 'App';

const Home = () => {
  const {
    chainId,
    account,
    activate: activateNetwork,
    deactivate: deactivateNetwork,
    active: networkActive,
    library,
  } = useWeb3React<Web3Provider>();

  const [mainContract, setMainContract] = React.useState<Contract>();
  const [tokenContract, setTokenContract] = React.useState<Contract>();
  const [tokenDecimals, setTokenDecimals] = React.useState<number>(6);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>(200);
  const [totalContribution, setTotalContribution] = React.useState<string>();
  const [contribution, setContribution] = React.useState<string>();

  const handleConnect = () => {
    if (window.ethereum) activateNetwork(injectedConnector).then(() => {});
    else toast.warn('Please install Metamask extension.');
  };

  const loadContribution = React.useCallback(
    (
      _contract: Contract,
      _deciaml: number,
      _account: string | null | undefined
    ) => {
      /* Set Total Contribution */
      _contract.totalContribution().then((_totalContribution) => {
        setTotalContribution(
          Web3.utils
            .toBN(_totalContribution.toString())
            .div(Web3.utils.toBN(10).pow(Web3.utils.toBN(_deciaml)))
            .toString()
        );
      });
      /* Set User Contribution */
      _contract.contributedAmount(_account).then((_contribution) => {
        setContribution(
          Web3.utils
            .toBN(_contribution.toString())
            .div(Web3.utils.toBN(10).pow(Web3.utils.toBN(_deciaml)))
            .toString()
        );
      });
    },
    []
  );

  React.useEffect(() => {
    if (networkActive && chainId === networkId) {
      const _mainContract = new Contract(
        contractAddress,
        DNFAbi,
        library?.getSigner()
      );
      /* Set Main Contract */
      setMainContract(_mainContract);
      _mainContract.tokenAddress().then((tokenAddress) => {
        /* Set Token Contract */
        const _tokenContract = new Contract(
          tokenAddress,
          TokenAbi,
          library?.getSigner()
        );
        setTokenContract(_tokenContract);
        /* Set Token Decimal */
        _tokenContract.decimals().then((_tokenDecimals) => {
          setTokenDecimals(_tokenDecimals);
          /* Set Total and User Contribution */
          loadContribution(_mainContract, _tokenDecimals, account);
        });
      });
    }
  }, [networkActive, chainId, account, library, loadContribution]);

  React.useEffect(() => {
    if (networkActive && mainContract && tokenDecimals && account && library) {
      console.log('Test0');
      library.on(mainContract.filters.Contribute(null), () => {
        console.log('Test1');
        loadContribution(mainContract, tokenDecimals, account);
      });
      return () => {
        console.log('Test2');
        library.removeAllListeners(mainContract.filters.Contribute(null));
      };
    }
  }, [
    mainContract,
    tokenDecimals,
    account,
    library,
    networkActive,
    loadContribution,
  ]);

  const handleDisconnect = () => {
    deactivateNetwork();
  };

  const handleContribute = async () => {
    setIsLoading(true);
    try {
      const isFinalized = await mainContract?.isFinalized();
      if (isFinalized) toast.error(`Contribution is finalized.`);
      else {
        const amountArg = Web3.utils
          .toBN(amount)
          .mul(Web3.utils.toBN(10).pow(Web3.utils.toBN(tokenDecimals)));
        const balance = await tokenContract?.balanceOf(account);
        const allowance = await tokenContract?.allowance(
          account,
          contractAddress
        );
        if (amountArg.cmp(Web3.utils.toBN(balance.toString())) > 0) {
          toast.error(`You don't have sufficient amount of tokens`);
        } else {
          if (amountArg.cmp(Web3.utils.toBN(allowance.toString())) > 0) {
            const result = await Swal.fire({
              title: 'You have to Approve',
              text: 'You have to approve this conract to access your money.',
              icon: 'info',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Approve',
              allowEnterKey: false,
              allowOutsideClick: false,
            });
            if (!result.isConfirmed) throw new Error('Approve Canceled');
            const tx = await tokenContract?.approve(
              contractAddress,
              Web3.utils
                .toBN(2)
                .pow(Web3.utils.toBN(256))
                .sub(Web3.utils.toBN(1))
                .toString()
            );
            await tx.wait(1);
          }
          const tx = await mainContract?.contribute(amountArg.toString());
          await tx.wait(1);
          toast.success(`You conributed successfully`);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <nav className="navbar text-end navbar-expand-md navbar-dark justify-content-end">
        <div className="container-fluid">
          <a
            className="navbar-brand fc-white fw-bold fs-3"
            href="https://projectdna.live/"
          >
            <img
              src="images/dna_logo_navbar.svg"
              alt="DNA Logo"
              style={{ width: 100 }}
              className="d-inline-block align-text-top"
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <a className="nav-link" href="#roadmap">
                  Roadmap
                </a>
              </li>
              <li className="nav-item px-2">
                <a
                  className="nav-link"
                  href="https://project-dna.gitbook.io/decentralizd-nft-a-v1.3"
                >
                  Whitepaper
                </a>
              </li>
              <li className="nav-item px-2">
                {networkActive ? (
                  <button className="nav-link" onClick={handleDisconnect}>
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="nav-link"
                    style={{ boxShadow: 'none' }}
                    onClick={handleConnect}
                  >
                    Connect Wallet
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex-container" style={{ height: 100, width: '100%' }}>
        <div className="huge-text">
          <h1>Beginning of a journey...</h1>
        </div>
      </div>
      <div className="row">
        <div className="dna-logo col-sm-6">
          <img className="logo1" src="images/dna_logo.svg" alt="" />
        </div>
        <div className="col-sm-6 card1" style={{ width: 600 }}>
          <div className="token-box1">
            <h2>
              Total $DAI Tokens <br />
              Contribution
            </h2>
            <h2 className="huge-text">{totalContribution ?? '???'} $DAI</h2>
            <h2>Your Contribution is</h2>
            <h2 className="huge-text">{contribution ?? '???'} $DAI</h2>
            <form className="" action="/" method="post">
              <div className="input-group mb3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (value > 0) setAmount(value);
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </form>
          </div>
          <button
            className="btn btn-primary btn-lg btn-block"
            style={{ minWidth: 200, minHeight: 60 }}
            onClick={handleContribute}
            disabled={
              !networkActive || isLoading || !tokenContract || !mainContract
            }
          >
            {isLoading ? (
              <span
                className="spinner-border"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Contribute'
            )}
          </button>

          <div className="box-item-rules">
            <p>
              Make sure you are on Ethereum BlockChain and your Wallet is
              connected
            </p>
            <h3>Presale Price for $DAI : $0.04 USD</h3>
            <h3>Launch Price for $DAI : $0.05 USD</h3>
            <p>1. Only send DAI on Ethereum BlockChain</p>
            <p>2. Min: 200 DAI and Max: 2000 DAI</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
