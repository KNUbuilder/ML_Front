import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

//img
import GoogleLogo from '../../Image/Oauth/google.png';

//Oauth Google
const CLIENT_ID = "748325365179-pc6vune5ukah277puedl7fj3du60cr2e.apps.googleusercontent.com"


const Login = ({ onLoginSuccess }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // error 상태 추가
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.username) {
          onLoginSuccess(data.username); // 이름 전달
          navigate('/mypage'); // MyPage로 이동
        } else {
          setError('로그인 성공했지만 사용자 이름을 가져올 수 없습니다.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || '로그인 실패. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };
  

  const handleGoogleOAuth = () => {
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=748325365179-pc6vune5ukah277puedl7fj3du60cr2e.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/callback&scope=email%20profile`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>로그인</h2>
        {error && <p className="error">{error}</p>} {/* error 메시지가 있을 경우 출력 */}
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
        <button type="submit" className="login-button">로그인</button>
        <p>
          이미 계정이 없으신가요?{' '}
          <Link to="/signup" className="login-link">회원가입</Link>
        </p>
        <div className="oauth-section">
          <img
            src={GoogleLogo}
            alt="Google OAuth"
            className="oauth-logo"
            onClick={handleGoogleOAuth}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
