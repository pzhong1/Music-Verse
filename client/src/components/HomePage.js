import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/HomePage.css';
import albumCover from '../../src/assets/images/BattleLA.jpg';
import DarkModeContext from '../DarkModeContext';
import ProfilePic from './ProfilePic';
import Likes from './Likes';
import AuthService from '../utils/auth';

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchUsername() {
      const userProfile = AuthService.getProfile();
      console.log('User Profile from AuthService:', userProfile);

      if (userProfile && userProfile.data && userProfile.data.username) {
        console.log('Fetched username:', userProfile.data.username);
        setUsername(userProfile.data.username);
      } else {
        setUsername('');
      }
    }

    fetchUsername();
  }, []);

  const handleClick = () => {
    navigate('/search');
  };

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <Navbar />
      <div className={`landing-page ${isDarkMode ? 'dark-mode' : ''}`}>
        <header>
          <h1>Welcome to Music Verse</h1>
          {username && <h2>{username}</h2>}
          <p>Connect with music lovers around the world!</p>
          <button onClick={handleClick}>Get Started</button>
        </header>
      </div>
    </>
  );
}

export default HomePage;
