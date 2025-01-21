import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getOAuthUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      try {
        const response = await fetch('http://localhost:8080/api/auth/oauth2-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          const userInfo = await response.json();
          console.log('OAuth User Info:', userInfo);
          // 로그인 성공 처리 후 리디렉션
          navigate('/');
        } else {
          console.error('Failed to fetch OAuth user info');
        }
      } catch (error) {
        console.error('Error during OAuth callback:', error);
      }
    };

    getOAuthUser();
  }, [navigate]);

  return <div>OAuth를 통해 로그인중...</div>;
};

export default OAuthCallback;
