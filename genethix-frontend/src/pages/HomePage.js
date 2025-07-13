import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      background: '#F6F8FC',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* NAVBAR */}
      <div style={{
        backgroundColor: '#12372A',
        color: '#fff',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          🧬 GenEthix
        </div>
               
      </div>

      {/* MAIN SECTION */}
      <div style={{
        flex: 1,
        position: 'relative',
        width: '100%',
      }}>
        <video
          src="/dna.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            filter: 'brightness(0.75)'
          }}
        />

        {/* Tagline */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontSize: '22px',
          fontWeight: '500',
          textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          zIndex: 2
        }}>
          Empowering ethical DNA sharing for the future of science.
        </div>

        {/* Buttons */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '30px',
          zIndex: 2,
          backdropFilter: 'blur(8px)',
          padding: '20px 30px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
        }}>
          <button onClick={() => navigate('/upload')} style={buttonStyle}>
            🧬 I’m a DNA Owner
          </button>
          <button onClick={() => navigate('/preferences')} style={buttonStyleSecondary}>
            🔍 I’m a Researcher
          </button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#00D3A9",
  color: 'white',
  fontSize: '18px',
  padding: '14px 36px',
  borderRadius: '14px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s ease',
};
const buttonStyleSecondary = {
  ...buttonStyle,
};

export default HomePage;
