import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <span>Music Verse</span>
        </div>
        <div className="hamburger-icon" onClick={toggleMenu}>
  <FontAwesomeIcon icon={faBars} size="2x" className="icon" /> {/* Adjusted size */}
</div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/search" onClick={toggleMenu}>Search</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
