import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header/Header.js';
import MainSection from './Components/MainSection/MainSection.js';
import Footer from './Components/Footer/Footer.js';
import ImageUploader from './Components/Services/ImageUploader.js';
import Login from './Components/Login&Register/Login.js';
import Register from './Components/Login&Register/Register.js';
import About from './Components/About/About.js';
import MyPage from './Components/MyPage/MyPage.js';
import OAuthCallback from './Components/OAuthCallback/OAuthCallback.js';
import { useCookies } from 'react-cookie';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [userName, setUserName] = useState(localStorage.getItem('userName') || ''); // 저장된 사용자 이름
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 사용

  useEffect(() => {
    if (cookies.jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies.jwt]);

  const handleLoginSuccess = (userName) => {
    setIsLoggedIn(true);
    setUserName(userName);
    localStorage.setItem('userName', userName); // 로컬스토리지에 저장
  };

  const handleLogout = () => {
    removeCookie('jwt'); // JWT 쿠키 삭제
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('userName'); // 로컬스토리지에서 사용자 이름 제거
    navigate('/'); // 홈으로 이동
  };

  return (
    <div className="root">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<ImageUploader />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/mypage"
          element={
            isLoggedIn ? (
              <MyPage userName={userName} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
