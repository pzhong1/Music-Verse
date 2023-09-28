// client/src/components/Rating.js
import React, { useState } from 'react';
import '../styles/Rating.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ onRatingChange }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(5).keys()].map((index) => {
        const starValue = index + 1;
        const isHalfHovered = hover >= starValue - 0.5 && hover < starValue;
        const isFullHoveredOrRated = hover >= starValue || rating >= starValue;
        const isHalfRated = rating >= starValue - 0.5 && rating < starValue;
        
        return (
          <span
            key={index}
            className="star"
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              setRating(hover);
              if (onRatingChange) {
                onRatingChange(hover);
              }
            }}
          >
            <FontAwesomeIcon 
              icon={isHalfHovered ? faStarHalfAlt : isFullHoveredOrRated ? fasStar : farStar}
              className={isHalfRated || isFullHoveredOrRated ? 'yellow' : ''}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
