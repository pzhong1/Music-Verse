import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import '../styles/Likes.css';

function Likes() {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div 
      className={`like-container ${liked ? 'liked' : ''}`} 
      onClick={handleLike}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {(liked || hovered) ? (
        <FontAwesomeIcon icon={solidHeart} />
      ) : (
        <FontAwesomeIcon icon={regularHeart} />
      )}
    </div>
  );
}

export default Likes;
