import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    if (!networkActive)
      injectedConnector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized && !networkError) activateNetwork(injectedConnector);
      });
  }, [activateNetwork, networkError, networkActive]);

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
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Mint />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
