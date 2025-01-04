import React from 'react';
import { Link } from 'react-router-dom';
import './MainSection.css';

const MainSection = () => {
  return (
    <main className="main-section">
      <h1 id="title1">Welcome to</h1>
      <h1 id="title2">OCR Services</h1>
      <p id="description">Take Picture or Input The Image</p>
      <Link to="/upload">
        <button id="cta-button" className="cta-button">Get Started</button>
      </Link>
    </main>
  );
};

export default MainSection;
