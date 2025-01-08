import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.js';
import MainSection from './Components/MainSection/MainSection.js';
import Footer from './Components/Footer/Footer.js';
import ImageUploader from './Components/Services/ImageUploader.js';
import Login from './Components/Login&Register/Login.js';
import Register from './Components/Login&Register/Register.js';
import About from './Components/About/About.js';
import MyPage from './Components/MyPage/MyPage.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
  };

  return (
    <Router>
      <div className="root">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<ImageUploader />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
