import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.js';
import MainSection from './Components/MainSection/MainSection.js';
import Footer from './Components/Footer/Footer.js';
import ImageUploader from './Components/Services/ImageUploader.js';
import Login from './Components/Login&Register/Login.js';
import Register from './Components/Login&Register/Register.js';

function App() {
  return (
    <Router>
      <div className="root">
        <Header />
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/upload" element={<ImageUploader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
