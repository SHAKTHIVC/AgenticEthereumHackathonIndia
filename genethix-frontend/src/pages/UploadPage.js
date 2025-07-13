// UploadPage.js - Final Version with Blockchain, IPFS, AI Tagging
import React, { useState } from 'react';
import './UploadPage.css';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';
import classifyDNA from '../utils/classifyDNA';
import DNAConsentABI from '../contracts/DNAConsentABI.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
 // Your smart contract address


const UploadPage = () => {
  const [wallet, setWallet] = useState('');
  const [file, setFile] = useState(null);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0.01);
  const [uploading, setUploading] = useState(false);

  const purposeOptions = [
    "Cancer Research", "Rare Disease Study", "Drug Development",
    "Neuro Disorder Research", "Diabetes & Metabolic Studies",
    "Ancestry Mapping", "Genetic Marker Discovery", "Gene Therapy Targeting",
    "Pharmacogenomics", "Alzheimer’s Research", "Autism Research",
    "Population Health Study", "Personalized Medicine",
    "Academic Research Only", "Open Research (No Restriction)"
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWallet(accounts[0]);
    } else {
      alert('Please install MetaMask');
    }
  };

  const togglePurpose = (purpose) => {
    setSelectedPurposes(prev =>
      prev.includes(purpose)
        ? prev.filter(p => p !== purpose)
        : [...prev, purpose]
    );
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const hashFile = async (file) => {
    const content = await file.text();
    const hash = CryptoJS.SHA256(content).toString();
    return '0x' + hash;
  };

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: process.env.REACT_APP_PINATA_JWT
      },
    });

    const data = await res.json();
    return data.IpfsHash;
  };

  const handleSubmit = async () => {
    if (!file) return alert('Upload a DNA file!');
    if (!wallet) return alert('Connect wallet first!');
    setUploading(true);

    try {
      const ipfsHash = await uploadToIPFS(file);
      const aiTags = await classifyDNA(file);
      const contentHash = await hashFile(file);

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(DNAConsentABI.abi, CONTRACT_ADDRESS);

      const allTags = aiTags.concat(selectedPurposes);
      const priceInWei = web3.utils.toWei(price.toString(), 'ether');

      await contract.methods.uploadDNA(
        ipfsHash,
        allTags,
        priceInWei,
        duration,
        contentHash
      ).send({ from: wallet });

      alert("✅ DNA Consent successfully stored on blockchain!");
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      {/* NAVBAR */}
      <div style={{ backgroundColor: '#12372A', color: '#fff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>🧬 GenEthix</div>
        
      </div>

      {/* MAIN CARD */}
      <div className="card-container">
        <h2>🔐 Upload DNA & Set Consent</h2>

          <button 
    onClick={connectWallet}
    style={{
      marginTop: '15px',
      padding: '10px 18px',
      backgroundColor: '#00D3A9',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    {wallet ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : '🔗 Connect Wallet'}
  </button>

        <div className="input-group">
          <label>📂 Upload DNA File (.txt)</label>
          <input type="file" accept=".txt" onChange={handleFileChange} />
        </div>

        <div className="input-group">
          <label>🧬 Research Purposes</label>
          <div className="purpose-options">
            {purposeOptions.map((option, index) => (
              <div
                key={index}
                className={`purpose-tag ${selectedPurposes.includes(option) ? 'selected' : ''}`}
                onClick={() => togglePurpose(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="inline-group">
          <div className="input-wrapper">
            <label>⏳ Access Duration</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <span className="unit">days</span>
          </div>
          <div className="input-wrapper">
            <label>💰 ETH per Access</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <span className="unit">ETH</span>
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={uploading}>
          {uploading ? 'Uploading...' : '✅ Submit Consent'}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
