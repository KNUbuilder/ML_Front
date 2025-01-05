import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';

const Login = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // 로그인 검증 로직 추가 (예: 서버 요청)
      if (email === 'test@example.com' && password === 'password123') {
        alert('Login successful!');
        setError('');
      } else {
        setError('Invalid email or password.');
      }
    };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button  className="join-button"><Link to='Join'>Join</Link></button>
      </form>
      <div className="oauth-section">
        <p>Using Social Login</p>
        <button
          className="oauth-button google"
          onClick={() => handleOAuthLogin('Google')}
        >
          Google
        </button>
        <button
          className="oauth-button facebook"
          onClick={() => handleOAuthLogin('Facebook')}
        >
          Facebook
        </button>
        <button
          className="oauth-button naver"
          onClick={()  => handleOAuthLogin('Naver') }
        >
          Naver
        </button>
      </div>
    </div>
  );
};

export default Login;
