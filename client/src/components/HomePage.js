// client/src/components/HomePage.js

// Third-Party Imports
import React from 'react';

// Component Imports
import Navbar from './Navbar';

// Style Imports
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="landing-page">
      <header>
        {/* Navbar Component for Navigation */}
        <Navbar />
        <h1>Welcome to Music Social Media</h1>
        <p>Connect with music lovers around the world!</p>
        <button>Get Started</button>
      </header>
      {/* Additional sections or components can be added here */}
    </div>
  );
}

export default HomePage;

