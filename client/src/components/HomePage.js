import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import '../styles/HomePage.css';
import albumCover from '../../src/assets/images/BattleLA.jpg';
import DarkModeContext from '../DarkModeContext';
import ProfilePic from './ProfilePic';
import Likes from './Likes'; // Import the Likes component

function HomePage() {
  const navigate = useNavigate();
  
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
          <p>Connect with music lovers around the world!</p>
          <button onClick={handleClick}>Get Started</button>
        </header>
        <div className="cards-container">
          <div className="card">
            <img src={albumCover} alt="Album Cover" />
            <div className="card-content">
              <div className="card-title">Song Name by Artist Name</div>
              <div className="user-comment">
                <span className="username">Dudebro: </span> This is a placeholder comment!
              </div>
              <div className="profile-and-likes">
                <ProfilePic/>
                 <Likes/>
              </div>
            </div>
          </div>
  
          <div className="card">
            <img src={albumCover} alt="Album Cover" />
            <div className="card-content">
              <div className="card-title">Testify by Rage Against the Machine</div>
              <div className="user-comment">
                <span className="username">RockManz: </span> This is another placeholder comment!
              </div>
              <div className="profile-and-likes">
                <ProfilePic/> Username
                <Likes/> Likes: 2, Comments: 42
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );  
}

export default HomePage;
