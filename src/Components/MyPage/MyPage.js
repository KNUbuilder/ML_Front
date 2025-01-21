import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = ({ userName }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [history, setHistory] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        if (data && data.email) {
          setProfile(data);
        } else {
          console.error('Invalid profile data:', data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/history', {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch history');
        const data = await response.json();
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error('History data is not an array:', data);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchProfile();
    fetchHistory();
  }, [cookies.jwt]);

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.jwt}`,
        },
        body: JSON.stringify({ username: userName, newEmail: profile.email }),
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error(error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.jwt}`,
        },
        body: JSON.stringify({ username: userName, newPassword: password }),
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error(error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    removeCookie('jwt'); // JWT 토큰을 삭제
    navigate('/'); // 홈으로 이동
  };

  return (
    <div className="mypage-container">
      <h1>안녕하세요, {userName || '사용자'}님!</h1>
      <section className="profile-section">
        <h2>프로필 정보</h2>
        <p>이름: {userName || "ooo사용자님"}</p>
        <p>이메일: {profile.email || '이메일 정보를 불러오는 중...'}</p>
        <button onClick={handleProfileUpdate}>프로필 수정</button>
      </section>
      <section className="password-section">
        <h2>비밀번호 변경</h2>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>비밀번호 변경</button>
      </section>
      <section className="history-section">
        <h2>OCR 이용 내역</h2>
        {Array.isArray(history) && history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>이용 내역이 없습니다.</p>
        )}
      </section>

    </div>
  );
};

export default MyPage;
