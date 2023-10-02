import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import DarkModeContext from '../DarkModeContext';
import $ from 'jquery'; // Ensure jQuery is installed
import AuthService from '../utils/auth'; // Import your authentication service
import '../styles/Navbar.css';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    var topNavHeight = $('.navbar').height();

    $('#bottomNavbar').addClass('hide-nav');

    $(window).scroll(function () {
      if ($(this).scrollTop() > topNavHeight) {
        $('#bottomNavbar').removeClass('hide-nav');
      } else {
        $('#bottomNavbar').addClass('hide-nav');
      }
    });

    $('.btn-link').click(function () {
      var arrowButton = $(this).closest('.text-content').find('.arrow-collapse');
      if ($(this).attr('aria-expanded') === 'false') {
        arrowButton.show();
      } else {
        arrowButton.hide();
      }
    });

    $('.arrow-collapse').click(function () {
      var cardID = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(cardID).offset().top,
      }, 500);
    });

    // Check authentication using the AuthService
    const authenticated = AuthService.loggedIn();
    setIsAuthenticated(authenticated);

    // Cleanup function
    return () => {
      $(window).off('scroll');
      $('.btn-link').off('click');
      $('.arrow-collapse').off('click');
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-container">
      <a className="navbar-brand" href="/">Music Verse</a>
      <div className={`switch ${isDarkMode ? 'active' : ''}`} onClick={toggleDarkMode}>
        <span className="slider round"></span>
      </div>
      <div className="right-container">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} size="2x" className="icon" />
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/search" onClick={toggleMenu}>Search</Link></li>
            {isAuthenticated ? (
              <li><Link to="/logout" onClick={() => AuthService.logout()}>Logout</Link></li>
            ) : (
              <li><Link to="/signin" onClick={toggleMenu}>Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
