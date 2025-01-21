import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import GoogleLogo from '../../Image/Oauth/google.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');  // username 상태 추가
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),  // 요청에 username 추가
      });

      if (response.ok) {
        alert('계정이 성공적으로 생성되었습니다!');
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('에러:', error);
      setError('회원가입에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>회원가입</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">사용자 이름:</label> {/* 사용자 이름 입력 필드 추가 */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자 이름을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>
        <button type="submit" className="register-button">회원가입</button>
        <p>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="login-link">로그인</Link>
        </p>
        <div className="oauth-section">
          <img
            src={GoogleLogo}
            alt="Google OAuth"
            className="oauth-logo"
            onClick={() => alert('OAuth 곧 제공 예정!')}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
