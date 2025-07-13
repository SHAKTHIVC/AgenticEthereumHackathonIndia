import React, { useState } from 'react';

const ConsentForm = ({ onSubmitConsent }) => {
  const [purpose, setPurpose] = useState('');
  const [duration, setDuration] = useState('');
  const [researcher, setResearcher] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!purpose || !duration || !researcher) return alert("Please fill all fields");
    onSubmitConsent({ purpose, duration, researcher });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 40 }}>
      <h3>Set Consent Rules</h3>
      <input
        type="text"
        placeholder="Purpose of data access"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        style={{ margin: 5, width: 250 }}
      />
      <br />
      <input
        type="text"
        placeholder="Access duration (e.g. 7 days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ margin: 5, width: 250 }}
      />
      <br />
      <input
        type="text"
        placeholder="Researcher Wallet Address"
        value={researcher}
        onChange={(e) => setResearcher(e.target.value)}
        style={{ margin: 5, width: 250 }}
      />
      <br />
      <button type="submit">Submit Consent</button>
    </form>
  );
};

export default ConsentForm;
