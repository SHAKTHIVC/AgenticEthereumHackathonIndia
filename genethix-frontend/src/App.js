// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ResearcherPreferences from './pages/ResearcherPreferences';
import SuggestionsPage from './pages/SuggestionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/preferences" element={<ResearcherPreferences />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
