import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResearcherPreferences = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    'Cancer Research',
    'Rare Disease Study',
    'Gene Therapy',
    'Alzheimer’s Research',
    'Autism Research',
    'Personalized Medicine'
  ];

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleContinue = () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one research area.");
      return;
    }

    // Save preferences in localStorage (or state manager like Redux)
    localStorage.setItem("researchTags", JSON.stringify(selectedOptions));
    navigate("/suggestions");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #eaf5ff, #f5fcff)',
      animation: 'fadeIn 1s ease',
    }}>
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
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          🧬 GenEthix
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
        </div>
      </div>

      {/* Preference Section */}
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: '#12372A', fontSize: '30px', marginBottom: '10px' }}>
          Tell us your research interests
        </h2>
        <p style={{ color: '#555', fontSize: '16px', marginBottom: '40px' }}>
          Choose one or more areas so we can give you tailored suggestions.
        </p>

        {/* Options */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => toggleOption(opt)}
              style={{
                padding: '14px 26px',
                borderRadius: '30px',
                border: selectedOptions.includes(opt) ? '2px solid #00D3A9' : '2px solid #ccc',
                backgroundColor: selectedOptions.includes(opt) ? '#00D3A9' : '#fff',
                color: selectedOptions.includes(opt) ? '#fff' : '#12372A',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '15px',
                boxShadow: selectedOptions.includes(opt)
                  ? '0 0 20px rgba(0, 211, 169, 0.4)'
                  : '0 0 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
              }}
            >
              {opt}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleContinue}
            style={{
              padding: '12px 32px',
              borderRadius: '14px',
              background: 'linear-gradient(to right, #00D3A9, #00C2FF)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0, 211, 169, 0.3)',
              transition: 'transform 0.2s ease',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearcherPreferences;
