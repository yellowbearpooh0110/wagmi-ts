import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Mint from './pages/Mint';
import { networkId, networkIdHex } from 'config';

export const injectedConnector = new InjectedConnector({});

const App = () => {
  const {
    chainId,
    active: networkActive,
    activate: activateNetwork,
    error: networkError,
  } = useWeb3React<Web3Provider>();

  React.useEffect(() => {
    if (networkActive && chainId !== networkId) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkIdHex }],
      });
    }
  }, [chainId, networkActive]);

  React.useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && !networkError) activateNetwork(injectedConnector);
    });
  }, [activateNetwork, networkError]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Mint />
    </>
  );
};

export default App;
