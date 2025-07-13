import React, { useState } from 'react';
import axios from 'axios';

const UploadDNA = ({ walletAddress, onUpload }) => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb...UUsM7o', // your JWT
        },
      });

      const hash = res.data.IpfsHash;
      setIpfsHash(hash);
      onUpload(hash);
    } catch (err) {
  console.error('Full Error Log:', err);
  const errorMessage =
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    'Upload failed due to unknown error';
  alert(`Upload failed: ${errorMessage}`);
}finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ color: '#2E3A59' }}>Upload DNA File (.txt)</h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#f9f9f9',
            fontSize: '14px',
          }}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            backgroundColor: '#2E3A59',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '10px',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {ipfsHash && (
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#444' }}>
          📦 Uploaded to IPFS:&nbsp;
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#0077cc', textDecoration: 'underline' }}
          >
            {ipfsHash}
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadDNA;
