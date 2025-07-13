import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummyRecords = [
  {
    id: 1,
    ipfsHash: 'Qm123abc456def...',
    price: '0.02',
    duration: '30',
    tags: ['🧬 Genetic Disorders', '💊 Personalized Medicine'],
    owner: '0xABC123...DEF',
  },
  {
    id: 2,
    ipfsHash: 'Qm789ghi012jkl...',
    price: '0.05',
    duration: '60',
    tags: ['🧠 Rare Disease Research', '🛠️ Gene Therapy'],
    owner: '0x123456...7890',
  },
  {
    id: 3,
    ipfsHash: 'QmSampleIPFSHashHere...',
    price: '0.03',
    duration: '45',
    tags: ['🧪 Genome Sequencing', '🧻 Oncology'],
    owner: '0xDEADBEEF...1234',
  },
];

const SuggestionsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5fcff' }}>
      {/* Navbar */}
      <div style={{
        backgroundColor: '#12372A',
        color: '#fff',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>🧬 GenEthix</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="/preferences" style={{ color: '#fff', textDecoration: 'none' }}>Preferences</a>
        </div>
      </div>

      {/* Suggestions Section */}
      <div style={{ padding: '40px' }}>
        <h2 style={{ color: '#12372A', fontSize: '26px' }}>🔍 Matching DNA Records</h2>

        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {dummyRecords.map((record) => (
            <div
              key={record.id}
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                borderLeft: '6px solid #00D3A9',
              }}
            >
              <p><strong>Owner:</strong> {record.owner}</p>
              <p><strong>Tags:</strong> {record.tags.join(', ')}</p>
              <p><strong>IPFS:</strong> <a href={`https://gateway.pinata.cloud/ipfs/${record.ipfsHash}`} target="_blank" rel="noreferrer">{record.ipfsHash}</a></p>
              <p><strong>Access Duration:</strong> {record.duration} days</p>
              <p><strong>Price:</strong> {record.price} ETH</p>
              <button
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  background: 'linear-gradient(to right, #00D3A9, #00C2FF)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onClick={() => alert('🔒 Request sent to owner!')}
              >
                Request Access
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;
