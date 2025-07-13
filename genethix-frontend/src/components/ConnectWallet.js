import React, { useEffect, useState } from 'react';

const ConnectWallet = ({ setWalletAddress }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];
        setCurrentAccount(account);
        setWalletAddress(account);
        setIsConnected(true);
      } catch (error) {
        console.error('Connection failed:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };

  useEffect(() => {
    const checkIfConnected = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    };

    checkIfConnected();

    window.ethereum?.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setCurrentAccount('');
        setWalletAddress('');
        setIsConnected(false);
      }
    });
  }, [setWalletAddress]);

  return (
    <div style={{ marginTop: 30 }}>
      {isConnected ? (
        <div>
          <p><strong>Connected Wallet:</strong></p>
          <p style={{ color: 'green' }}>{currentAccount}</p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#2e3a59',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
