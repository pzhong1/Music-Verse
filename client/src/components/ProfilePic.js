// src/components/ProfilePic.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProfilePic.css';
import defaultProfilePic from '../assets/images/IMG_3645.jpeg'; // Adjust the path accordingly

function ProfilePic({ imgUrl, altDescription }) {
  return (
    <div className="profile-pic-container">
      <img src={imgUrl} alt={altDescription} className="profile-pic" />
    </div>
  );
}

ProfilePic.propTypes = {
  imgUrl: PropTypes.string,
  altDescription: PropTypes.string,
};

ProfilePic.defaultProps = {
  imgUrl: defaultProfilePic, // Using the imported default profile picture
  altDescription: 'User Profile Picture',
};

export default ProfilePic;
