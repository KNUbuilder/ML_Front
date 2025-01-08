import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-h1">
        <h1>About Our Team</h1>
      </div>

      <div className="about-container">
        <p>Welcome to our project!</p>
        <p>
            블라블라
        </p>
      </div>

      <h2>KNUbuilder</h2>

      <div className="team-section">
        <div className="team-member">
          <h3>김영수</h3>
          <p>~</p>
        </div>

        <div className="team-member">
          <h3>김우현</h3>
          <p>~</p>
        </div>

        <div className="team-member">
          <h3>오봉학</h3>
          <p>~</p>
        </div>
      </div>
    </div>
  );
};

export default About;
