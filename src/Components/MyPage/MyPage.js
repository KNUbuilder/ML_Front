import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = ({ userName }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [history, setHistory] = useState([]);
  const [editProfile, setEditProfile] = useState(false); // 프로필 수정 모드 상태
  const [newName, setNewName] = useState(''); // 새 이름 상태
  const [newNickname, setNewNickname] = useState(''); // 새 닉네임 상태
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data); // 상태 업데이트
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
        setHistory(data);
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
        body: JSON.stringify({ name: newName, username: newNickname }),
      });
      const data = await response.text();
      alert(data);
      setEditProfile(false); // 수정 모드 종료
      setNewName('');
      setNewNickname('');
    } catch (error) {
      console.error(error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
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

  return (
    <div className="mypage-container">
      <h1>안녕하세요, {userName || '사용자'}님!</h1>
      <section className="profile-section">
        <h2>프로필 정보</h2>
        <p>이름: {userName || '이름 정보를 불러오는 중...'}</p>
        <p>이메일: {profile.email || '이메일 정보를 불러오는 중...'}</p>
        <button onClick={() => setEditProfile(true)}>프로필 수정</button>

        {/* 프로필 수정 폼 */}
        {editProfile && (
          <div className="edit-profile-form">
            <h3>프로필 수정</h3>
            <input
              type="text"
              placeholder="새 이름 입력"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              placeholder="새 닉네임 입력"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <button onClick={handleProfileUpdate}>저장</button>
            <button onClick={() => setEditProfile(false)}>취소</button>
          </div>
        )}
      </section>

      <section className="password-section">
        <h2>비밀번호 변경</h2>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
